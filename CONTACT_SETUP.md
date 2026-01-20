# 📧 Configuração do Formulário de Contato

## Status Atual

✅ **API Route criada**: `/app/api/contact/route.ts`
✅ **Formulário conectado**: O formulário agora envia dados para a API
⚠️ **Envio de email**: Atualmente apenas loga no console (modo desenvolvimento)

## Para onde vai a mensagem?

**Atualmente**: As mensagens são apenas logadas no console do servidor (terminal onde você roda `npm run dev`).

**Para produção**: Você precisa configurar um serviço de email real.

---

## 🚀 Opção 1: Resend (Recomendado - Mais Fácil)

### Passo 1: Criar conta no Resend
1. Acesse: https://resend.com
2. Crie uma conta gratuita (3.000 emails/mês grátis)
3. Vá em "API Keys" e crie uma nova chave

### Passo 2: Instalar o pacote
```bash
npm install resend
```

### Passo 3: Configurar variável de ambiente
Crie ou edite o arquivo `.env.local` na raiz do projeto:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=seu-email@exemplo.com
```

### Passo 4: Atualizar a API Route
Substitua o conteúdo de `app/api/contact/route.ts` por:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validação
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    // Enviar email via Resend
    await resend.emails.send({
      from: "Team Staircase <onboarding@resend.dev>", // Use seu domínio verificado
      to: process.env.CONTACT_EMAIL || "seu-email@exemplo.com",
      replyTo: email,
      subject: `[Contato] ${subject} - ${name}`,
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

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
```

---

## 📬 Opção 2: SendGrid

### Passo 1: Criar conta
1. Acesse: https://sendgrid.com
2. Crie conta gratuita (100 emails/dia grátis)
3. Crie uma API Key

### Passo 2: Instalar
```bash
npm install @sendgrid/mail
```

### Passo 3: Configurar `.env.local`
```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
CONTACT_EMAIL=seu-email@exemplo.com
```

### Passo 4: Atualizar API Route
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// No handler POST:
await sgMail.send({
  to: process.env.CONTACT_EMAIL,
  from: 'noreply@teamstaircase.com',
  replyTo: email,
  subject: `[Contato] ${subject} - ${name}`,
  html: `...` // mesmo HTML do exemplo Resend
});
```

---

## 🔧 Opção 3: Nodemailer (SMTP)

Para usar seu próprio servidor SMTP (Gmail, Outlook, etc.):

```bash
npm install nodemailer
```

Configure no `.env.local`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-app
CONTACT_EMAIL=seu-email@exemplo.com
```

---

## ✅ Testando

1. Preencha o formulário em `/contact`
2. Envie a mensagem
3. **Modo desenvolvimento**: Veja o log no terminal
4. **Com Resend/SendGrid configurado**: Receba o email na caixa de entrada configurada

---

## 🎯 Recomendação

**Use Resend** - É o mais simples, moderno e tem um plano gratuito generoso.
