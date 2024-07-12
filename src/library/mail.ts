import { mailer } from "./nodemailer";

type EmailContent = {
  to: string,
  subject: string,
  html: string,
  priority: "high" | "normal" | "low"
}
export const SendEmail = async ({ to, subject, html, priority }: EmailContent): Promise<void> =>{
  mailer.sendMail({
    to: to,
    from: "Ablaze Accounts <noreply@mirairo.dev>",
    subject: subject,
    html: html,
    priority: priority
  });
};
