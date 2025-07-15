const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendMail = async ({ name, email, phoneNumber, message,title, knownBy ,requestedServices}) => {
  return transporter.sendMail({
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `📨 New Contact: ${title}`,
    html: `<div style="background-color: #1c252e; color: #ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; border-radius: 12px; max-width: 600px; margin: auto; box-shadow: 0 0 20px rgba(0, 214, 255, 0.1);">
  <header style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #1e2a38;">
    <h1 style="color: #00acaf; margin: 0;">New Contact Message</h1>
    <p style="color: #b0b0b0; margin: 5px 0 0;">From DeverCrowd Website</p>
  </header>

  <section style="margin-top: 25px;">
    <h2 style="color: #00acaf;">${title}</h2>
    
    <p><strong style="color: #00acaf;">Name:</strong> ${name}</p>
    <p><strong style="color: #00acaf;">Email:</strong> ${email}</p>
    <p><strong style="color: #00acaf;">Phone Number:</strong> ${phoneNumber}</p>
    <p><strong style="color: #00acaf;">Known By:</strong> ${knownBy}</p>
    <p><strong style="color: #00acaf;">Requested Services:</strong> ${requestedServices}</p>
  </section>

  <section style="margin-top: 30px;">
    <h3 style="color: #00acaf;">Message:</h3>
    <div style="background-color: #1e2a38; padding: 15px; border-radius: 8px; line-height: 1.6;">
      ${message}
    </div>
  </section>

  <footer style="margin-top: 40px; border-top: 1px solid #1e2a38; padding-top: 15px; text-align: center; font-size: 0.85em; color: #b0b0b0;">
    © ${new Date().getFullYear()} DeverCrowd. All rights reserved.
  </footer>
</div>

    `
  });
};


const sendAutoReply = async ({ name, email }) => {
  return transporter.sendMail({
    from: `"DeverCrowd" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Thanks for contacting DeverCrowd!',
    html: `
      <div style="font-family: sans-serif; padding: 20px; background-color: #1c252e; color: white; border-radius: 10px;">
        <h2 style="color: #00acaf;">Hi ${name} 👋</h2>
        <p>Thanks for reaching out to <strong>DeverCrowd</strong>. We’ve received your message and will get back to you as soon as possible.</p>
        <p style="margin-top: 20px;">Meanwhile, feel free to check out our <a href="https://devercrowd.com/services" target="_blank" style="color: #00d6ff;">services</a>.</p>
        <br/>
        <p style="color: #ccc;">Best regards,<br/>The DeverCrowd Team</p>
      </div>
    `
  });
};

module.exports = { sendMail, transporter,sendAutoReply};
