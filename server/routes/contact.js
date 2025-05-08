import express from 'express';
const router = express.Router();
import nodemailer from 'nodemailer';

// Validation middleware
const validateContactInput = (req, res, next) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }
  next();
};


router.post('/', validateContactInput, async (req, res) => {
  const { name, email, message } = req.body;

  // Create transporter with secure SMTP settings
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Mail options
  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `Portfolio Contact from ${name}`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong></p>
           <p>${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? `Failed to send message: ${error.message}` 
      : 'Failed to send message. Please try again later.';
    res.status(500).json({ success: false, message: errorMessage });
  }
});
export default router;