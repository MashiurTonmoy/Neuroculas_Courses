const nodemailer = require('nodemailer');

/**
 * Sends email using Nodemailer (Gmail SMTP or standard SMTP)
 * @param {Object} options - { to, subject, text, html }
 */
const sendEmail = async (options) => {
  console.log('\n============================================================');
  console.log(`[EMAIL SEND REQUEST] Target Recipient: ${options.to}`);
  console.log(`[SUBJECT]: ${options.subject}`);
  console.log('============================================================\n');

  try {
    const user = process.env.GMAIL_USER || 'tonmoymashiur@gmail.com';
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!pass) {
      console.log('ℹ️ [Local Dev Mode] GMAIL_APP_PASSWORD not set in server/.env.');
      console.log(`📧 Intended Recipient: <${options.to}>`);
      console.log(`🔗 Email Text Content:\n${options.text}\n`);
      return { success: true, mode: 'local_logged' };
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"Neuroculas Courses" <${user}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Custom HTML Password Reset Email sent to <${options.to}>! ID:`, info.messageId);
    return info;
  } catch (err) {
    console.error('❌ Failed to send email via SMTP:', err.message);
    throw err;
  }
};

module.exports = sendEmail;
