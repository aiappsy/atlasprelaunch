import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';
import { generateFounderWelcomeHtml, WelcomeEmailPayload } from '../lib/emailService.ts';

dotenv.config();

export interface SendEmailResult {
  success: boolean;
  message: string;
  messageId?: string;
  error?: string;
}

export async function sendWelcomeEmailServer(payload: WelcomeEmailPayload): Promise<SendEmailResult> {
  const senderEmail = process.env.SENDER_EMAIL || process.env.GMAIL_USER || 'paljuritzen@gmail.com';
  const appPassword = process.env.GMAIL_APP_PASSWORD;

  if (!appPassword || appPassword.includes('PLACEHOLDER') || appPassword.length < 10) {
    console.warn(`[Gmail SMTP Warning] GMAIL_APP_PASSWORD not configured. Skipping live SMTP dispatch for: ${payload.recipientEmail}`);
    return {
      success: false,
      message: 'Gmail App Password not configured in .env',
      error: 'MISSING_CREDENTIALS',
    };
  }

  const cleanPassword = appPassword.replace(/\s+/g, '');

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: senderEmail,
        pass: cleanPassword,
      },
    });

    const pdfPath = path.resolve(process.cwd(), 'public/docs/OTA_Duopoly_Research_Brief.pdf');
    const attachments = [];
    if (fs.existsSync(pdfPath)) {
      attachments.push({
        filename: 'OTA_Duopoly_Research_Brief.pdf',
        path: pdfPath,
      });
    }

    const htmlContent = generateFounderWelcomeHtml(payload);

    const info = await transporter.sendMail({
      from: `"Pål Juritzen - Atlas Travel Club" <${senderEmail}>`,
      to: payload.recipientEmail,
      subject: `Official Founder Certificate & Early Access Pass [${payload.inviteCode}]`,
      html: htmlContent,
      attachments,
    });

    console.log(`[Gmail SMTP Success] Welcome email dispatched to ${payload.recipientEmail} (Message ID: ${info.messageId})`);
    return {
      success: true,
      message: 'Welcome email successfully dispatched via Gmail SMTP',
      messageId: info.messageId,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`[Gmail SMTP Failure] Failed to send email to ${payload.recipientEmail}:`, errorMsg);
    return {
      success: false,
      message: 'Failed to send email via SMTP',
      error: errorMsg,
    };
  }
}
