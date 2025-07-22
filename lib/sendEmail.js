import nodemailer from "nodemailer";

export default async function sendEmail({ to, subject, html }) {
  try {
    // create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,     // your gmail address
        pass: process.env.EMAIL_PASS,     // app password (not your regular password!)
      },
    });

    // send mail
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
