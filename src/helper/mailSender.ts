import sgMail from '@sendgrid/mail';



export const sendMail = (email: string, subject: string, message: string) => {
    sgMail.setApiKey(
        process.env.SEND_GRID_API_KEY as string
    );
    return sgMail.send({
        to: email,
        from: process.env.LIBRARY_EMAIL_ADDRESS as string,
        subject: subject,
        text: message,
        html: message
    });
};
