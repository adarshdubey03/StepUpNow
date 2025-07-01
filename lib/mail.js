import transporter from "./nodemailer";

export async function sendBookingConfirmationEmail({ to, name, mentorName, amount }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "StepUpNow: Booking Confirmation",
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2>Hi ${name},</h2>
        <p>Thank you for booking a session on <strong>StepUpNow</strong>.</p>
        <p>Your session with <strong>${mentorName}</strong> is confirmed.</p>
        <p><strong>Amount Paid:</strong> ₹${amount / 100}</p>
        <br>
        <p>We’ll connect you soon with the time and date for the session. Meanwhile, feel free to reach out if you have any questions.</p>
        <p>Cheers,<br>Team StepUpNow 🚀</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Booking confirmation email sent to", to);
  } catch (err) {
    console.error("❌ Failed to send email:", err);
  }
}
