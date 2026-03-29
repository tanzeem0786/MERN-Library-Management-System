import sgMail from '@sendgrid/mail';

export const sendEmail =  async({email, subject, message}) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html: message,
    };
    await sgMail.send(mailOptions)
};


