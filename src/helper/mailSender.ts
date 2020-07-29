import nodemailer from 'nodemailer';

const sendGridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
    sendGridTransport({
        auth: {
            api_key: process.env.SEND_GRID_API_KEY
        }
    })
);

export const sendMail = (email: any, subject: any, message: any) => {
    return transporter.sendMail({
        to: email,
        from: process.env.LIBRARY_EMAIL_ADDRESS,
        subject: subject,
        html: message
    });
};
