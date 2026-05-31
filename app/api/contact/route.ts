import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, projectType, budget, timeline, features, type } = body;

    // Validación básica
    if (!name || !email) {
      return NextResponse.json(
        { error: 'El nombre y el correo electrónico son obligatorios.' },
        { status: 400 }
      );
    }

    const newSubmission = {
      id: Math.random().toString(36).substring(2, 9),
      type: type || 'contacto', // 'contacto' o 'quote' (cotización)
      name,
      email,
      message: message || null,
      projectType: projectType || null,
      budget: budget || null,
      timeline: timeline || null,
      features: features || null,
      createdAt: new Date().toISOString(),
    };

    // 1. Guardar localmente en submissions.json
    const filePath = path.join(process.cwd(), 'submissions.json');
    let submissions = [];

    try {
      const fileData = await fs.readFile(filePath, 'utf-8');
      submissions = JSON.parse(fileData);
    } catch (error) {
      // Si el archivo no existe o está vacío, iniciamos con un array vacío
    }

    submissions.push(newSubmission);
    await fs.writeFile(filePath, JSON.stringify(submissions, null, 2), 'utf-8');

    // 2. Opcional: Enviar email si RESEND_API_KEY está configurado
    const resendApiKey = process.env.RESEND_API_KEY;
    let emailSent = false;
    let emailError = null;

    if (resendApiKey) {
      try {
        const isQuote = type === 'quote';
        const subject = isQuote 
          ? `📋 Nueva Cotización de ${name}` 
          : `✉️ Nueva Consulta de ${name}`;

        const emailContent = `
          <div style="font-family: sans-serif; padding: 20px; color: #1f2937; max-width: 600px; border: 1px solid #e5e7eb; rounded-lg: 8px;">
            <h2 style="color: #4f46e5; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px;">
              ${isQuote ? 'Nueva Cotización de Proyecto' : 'Nueva Consulta General'}
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #f9fafb;">
                <td style="padding: 10px; font-weight: bold; width: 180px;">Nombre:</td>
                <td style="padding: 10px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Email:</td>
                <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              ${isQuote ? `
                <tr style="background-color: #f9fafb;">
                  <td style="padding: 10px; font-weight: bold;">Tipo de Proyecto:</td>
                  <td style="padding: 10px;">${projectType || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold;">Presupuesto Estimado:</td>
                  <td style="padding: 10px;">${budget || '-'}</td>
                </tr>
                <tr style="background-color: #f9fafb;">
                  <td style="padding: 10px; font-weight: bold;">Plazo de Entrega:</td>
                  <td style="padding: 10px;">${timeline || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; vertical-align: top;">Funcionalidades/Detalles:</td>
                  <td style="padding: 10px; white-space: pre-line;">${features || '-'}</td>
                </tr>
              ` : `
                <tr style="background-color: #f9fafb; vertical-align: top;">
                  <td style="padding: 10px; font-weight: bold;">Mensaje:</td>
                  <td style="padding: 10px; white-space: pre-line;">${message || '-'}</td>
                </tr>
              `}
            </table>
            <div style="margin-top: 30px; font-size: 11px; color: #6b7280; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 15px;">
              Enviado automáticamente desde JoaTech el ${new Date().toLocaleString('es-AR')}
            </div>
          </div>
        `;

        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'JoaTech Web <onboarding@resend.dev>', // Dominio de prueba gratuito de Resend
            to: 'joaquin.apesteguia.tech@gmail.com',
            subject: subject,
            html: emailContent,
          }),
        });

        if (resendRes.ok) {
          emailSent = true;
        } else {
          const errData = await resendRes.json();
          emailError = errData;
        }
      } catch (err: any) {
        emailError = err?.message || err;
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Solicitud procesada correctamente y guardada localmente.',
      data: newSubmission,
      emailSent,
      emailError,
    });
  } catch (error: any) {
    console.error('Error en API contact:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error interno al procesar la solicitud.' },
      { status: 500 }
    );
  }
}
