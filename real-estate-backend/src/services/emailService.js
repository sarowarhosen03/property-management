import nodemailer from 'nodemailer'
import {
    ADMIN_EMAIL,
    ADMIN_NAME,
    SMTP_HOST,
    SMTP_HOST_PASSWORD,
    SMTP_HOST_PORT,
    SMTP_HOST_USER,
} from '../config/index.js'

import { AppError } from '../utils/AppError.js'

const emailService = {
    async send({ email, subject, body, attachments = [] }) {
        try {
            const transporter = nodemailer.createTransport({
                host: SMTP_HOST,
                port: SMTP_HOST_PORT,
                // secure: false,
                auth: {
                    user: SMTP_HOST_USER,
                    pass: SMTP_HOST_PASSWORD,
                },
            })

            const mailOptions = {
                from: `"${ADMIN_NAME}" <${ADMIN_EMAIL}>`,
                to: email,
                subject: subject,
                html: body,
            }

            if (attachments.length > 0) {
                mailOptions.attachments = attachments
            }

            await transporter.sendMail(mailOptions)
        } catch (error) {
            if (error.code === 'ETIMEDOUT' || error.code === 'ESOCKET') {
                console.error(`SMTP connection error: ${error.message}`)
            } else {
                console.error('Nodemailer error:', error)
            }
            throw new AppError({
                code: 500,
                success: false,
                message: `Failed to send email: ${error.response}`,
            })
        }
    },
}

export default emailService
