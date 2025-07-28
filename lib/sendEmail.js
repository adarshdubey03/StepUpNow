import nodemailer from "nodemailer";

export default async function sendEmail({ to, subject, html }) {
  try {
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,     
        pass: process.env.EMAIL_PASS,     
      },
    });

    
    const info = await transporter.sendMail({
      from: `"StepUpNow" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(" Email sent: %s", info.messageId);
    return { success: true };
  } catch (err) {
    console.error(" Failed to send email:", err);
    return { success: false, error: err };
  }
}
