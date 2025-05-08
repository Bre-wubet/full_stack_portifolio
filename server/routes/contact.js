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

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email configuration is missing');
      return res.status(500).json({ success: false, message: 'Server configuration error' });
    }

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // use app-specific password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // mail options
    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`, // use authenticated email as sender
        replyTo: email, // set reply-to as the contact form email
        to: process.env.EMAIL_TO,
        subject: `Portfolio Contact Form: ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong> ${message}</p>`,
    };

    try {
        // Verify transporter configuration
        await transporter.verify();
        
        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        const errorMessage = process.env.NODE_ENV === 'development' 
            ? error.message 
            : 'Failed to send email. Please try again later.';
        res.status(500).json({ success: false, message: errorMessage });
    }
});

export default router;