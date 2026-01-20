import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validação básica
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    // Enviar email via Resend
    await resend.emails.send({
      from: "Team Staircase <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "eduardotajra@edu.unifor.br",
      replyTo: email,
      subject: `[Contato] ${subject} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f172a; color: #cbd5e1;">
          <h2 style="color: #06b6d4; margin-bottom: 20px;">Nova mensagem de contato</h2>
          <div style="background-color: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155;">
            <p style="margin: 10px 0;"><strong style="color: #06b6d4;">Nome:</strong> <span style="color: #cbd5e1;">${name}</span></p>
            <p style="margin: 10px 0;"><strong style="color: #06b6d4;">Email:</strong> <span style="color: #cbd5e1;">${email}</span></p>
            <p style="margin: 10px 0;"><strong style="color: #06b6d4;">Assunto:</strong> <span style="color: #cbd5e1;">${subject}</span></p>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #334155;">
              <p style="margin: 10px 0; color: #06b6d4;"><strong>Mensagem:</strong></p>
              <p style="color: #cbd5e1; white-space: pre-wrap; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          <p style="margin-top: 20px; color: #64748b; font-size: 12px;">Esta mensagem foi enviada através do formulário de contato do site Team Staircase.</p>
        </div>
      `,
    });

    // Retornar sucesso
    return NextResponse.json(
      { 
        success: true,
        message: "Mensagem enviada com sucesso! Entraremos em contato em breve." 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json(
      { error: "Erro ao enviar mensagem. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
