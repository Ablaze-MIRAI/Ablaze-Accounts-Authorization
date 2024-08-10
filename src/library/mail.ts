import { mailer } from "./nodemailer";
import environment form "@/environment"

type EmailContent = {
  to: string,
  subject: string,
  html: string,
  priority: "high" | "normal" | "low"
}
export const SendEmail = async ({ to, subject, html, priority }: EmailContent): Promise<void> =>{
  mailer.sendMail({
    to: to,
    from: `Ablaze Accounts <${environment.SMTP_FROM}>`,
    subject: subject,
    html: html,
    priority: priority
  });
};
