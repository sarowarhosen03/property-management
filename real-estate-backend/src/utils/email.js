import {
    ADMIN_EMAIL,
    ADMIN_NAME,
    SMTP_HOST,
    SMTP_HOST_PASSWORD,
    SMTP_HOST_PORT,
    SMTP_HOST_USER,
} from '../config/index.js'

import nodemailer from 'nodemailer'

const Email = {
    async send({ email, subject, body }) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: SMTP_HOST,
            port: SMTP_HOST_PORT,
            secure: false,
            auth: {
                user: SMTP_HOST_USER,
                pass: SMTP_HOST_PASSWORD,
            },
        })

        await transporter.sendMail({
            from: `"${ADMIN_NAME}" <${ADMIN_EMAIL}>`,
            to: email,
            subject: subject,
            html: body,
        })
    },
}

export default Email
