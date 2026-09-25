const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  console.log('\n============================================================');
  console.log(`[EMAIL SEND REQUEST] To: ${options.to}`);
  console.log(`[SUBJECT]: ${options.subject}`);
  console.log(`[CONTENT]:\n${options.text || options.html}`);
  console.log('============================================================\n');

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const message = {
        from: `"${process.env.FROM_NAME || 'Neuroculas Courses'}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      };

      const info = await transporter.sendMail(message);
      console.log('✅ Real Email sent successfully! Message ID:', info.messageId);
    } catch (err) {
      console.error('❌ Failed to send real SMTP email:', err.message);
      // We don't throw error to allow dev flow using console log link
    }
  } else {
    console.log('ℹ️ SMTP credentials not provided in .env — Email logged to console above.');
  }
};

module.exports = sendEmail;
