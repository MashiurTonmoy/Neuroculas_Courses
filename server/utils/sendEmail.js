const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  console.log('\n============================================================');
  console.log(`[EMAIL SEND REQUEST] To: ${options.to}`);
  console.log(`[SUBJECT]: ${options.subject}`);
  console.log('============================================================\n');

  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const smtpUser = process.env.SMTP_USER || 'neuroculas@gmail.com';
  const smtpPass = process.env.SMTP_PASS || 'hvjubenhrcvoxarv';
  const smtpSecure = process.env.SMTP_SECURE !== 'false'; // true for 465 SSL

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const message = {
      from: `"${process.env.FROM_NAME || 'Neuroculas Courses'}" <${process.env.FROM_EMAIL || smtpUser}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    const info = await transporter.sendMail(message);
    console.log('✅ Real Email sent successfully via Gmail SMTP (SSL 465)! ID:', info.messageId);
    return info;
  } catch (err) {
    console.error('❌ Failed to send SMTP email:', err.message);
    throw err;
  }
};

module.exports = sendEmail;
