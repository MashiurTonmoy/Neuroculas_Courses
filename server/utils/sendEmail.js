const nodemailer = require('nodemailer');
const { Resend } = require('resend');

const sendEmail = async (options) => {
  console.log('\n============================================================');
  console.log(`[EMAIL SEND REQUEST] To: ${options.to}`);
  console.log(`[SUBJECT]: ${options.subject}`);
  console.log('============================================================\n');

  // 1. Brevo HTTPS API (Port 443 — Never blocked on Render, sends to ANY email!)
  if (process.env.BREVO_API_KEY) {
    try {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({
          sender: {
            name: process.env.FROM_NAME || 'Neuroculas Courses',
            email: process.env.FROM_EMAIL || 'neuroculas@gmail.com',
          },
          to: [{ email: options.to }],
          subject: options.subject,
          textContent: options.text,
          htmlContent: options.html,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('❌ Brevo Email Error:', data);
        throw new Error(data.message || 'Failed to send email via Brevo');
      }

      console.log('✅ Email sent successfully via Brevo HTTP API! ID:', data.messageId);
      return data;
    } catch (err) {
      console.error('❌ Failed to send email via Brevo:', err.message);
      throw err;
    }
  }

  // 2. SendGrid HTTPS API (Port 443)
  if (process.env.SENDGRID_API_KEY) {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: options.to }] }],
          from: {
            email: process.env.FROM_EMAIL || 'neuroculas@gmail.com',
            name: process.env.FROM_NAME || 'Neuroculas Courses',
          },
          subject: options.subject,
          content: [
            { type: 'text/plain', value: options.text || '' },
            { type: 'text/html', value: options.html || '' },
          ],
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('❌ SendGrid Email Error:', errText);
        throw new Error(`SendGrid API error (${response.status}): ${errText}`);
      }

      console.log('✅ Email sent successfully via SendGrid HTTP API!');
      return { success: true };
    } catch (err) {
      console.error('❌ Failed to send email via SendGrid:', err.message);
      throw err;
    }
  }

  // 3. Mailjet HTTPS API (Port 443)
  if (process.env.MAILJET_API_KEY && process.env.MAILJET_API_SECRET) {
    try {
      const apiKey = process.env.MAILJET_API_KEY.trim();
      const apiSecret = process.env.MAILJET_API_SECRET.trim();
      const authHeader = 'Basic ' + Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
      
      const response = await fetch('https://api.mailjet.com/v3.1/send', {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Messages: [
            {
              From: {
                Email: (process.env.FROM_EMAIL || 'neuroculas@gmail.com').trim(),
                Name: process.env.FROM_NAME || 'Neuroculas Courses',
              },
              To: [{ Email: options.to.trim() }],
              Subject: options.subject,
              TextPart: options.text || '',
              HTMLPart: options.html || '',
            },
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.ErrorMessage || data.message || JSON.stringify(data);
        console.error('❌ Mailjet HTTP Error:', errorMsg);
        throw new Error(`Mailjet Error (${response.status}): ${errorMsg}`);
      }

      // Mailjet returns HTTP 200 even for item-level errors inside Messages array
      const msgStatus = data.Messages?.[0]?.Status;
      if (msgStatus !== 'success') {
        const errors = data.Messages?.[0]?.Errors;
        const errDetail = errors ? errors.map(e => e.ErrorMessage).join('; ') : 'Mailjet failed to process message';
        console.error('❌ Mailjet Message Error:', errDetail, JSON.stringify(data));
        throw new Error(`Mailjet Delivery Error: ${errDetail}`);
      }

      console.log('✅ Email sent successfully via Mailjet HTTP API!');
      return data;
    } catch (err) {
      console.error('❌ Failed to send email via Mailjet:', err.message);
      throw err;
    }
  }

  // 4. Resend HTTPS API (Port 443)
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { data, error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Neuroculas Courses <onboarding@resend.dev>',
        to: [options.to],
        subject: options.subject,
        text: options.text,
        html: options.html,
      });

      if (error) {
        console.error('❌ Resend Email Failed:', error);
        throw new Error(error.message || 'Failed to send email via Resend');
      }

      console.log('✅ Email sent successfully via Resend! ID:', data?.id);
      return data;
    } catch (err) {
      console.error('❌ Failed to send email via Resend:', err.message);
      throw err;
    }
  }

  // 5. Fallback: Gmail SMTP (for local dev)
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const smtpUser = process.env.SMTP_USER || 'neuroculas@gmail.com';
  const smtpPass = process.env.SMTP_PASS || 'hvjubenhrcvoxarv';
  const smtpSecure = process.env.SMTP_SECURE !== 'false';

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
