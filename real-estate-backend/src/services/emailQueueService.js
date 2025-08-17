import nodemailer from 'nodemailer'
import PQueue from 'p-queue'
import {
    ADMIN_EMAIL,
    ADMIN_NAME,
    SMTP_HOST,
    SMTP_HOST_PASSWORD,
    SMTP_HOST_PORT,
    SMTP_HOST_USER,
} from '../config/index.js'
import { AppError } from '../utils/AppError.js'

const emailQueue = new PQueue({ concurrency: 5 })

// Email service
const emailService = {
    /**
     * Sends an email immediately using Nodemailer.
     * @param {Object} options - The email options.
     * @param {string} options.email - Recipient's email address.
     * @param {string} options.subject - Email subject.
     * @param {string} options.body - Email body content (HTML format).
     * @param {Array} options.attachments - Optional array of attachments.
     * @returns {Promise<void>} Resolves when email is sent.
     */
    async send({ email, subject, body, attachments = [] }) {
        try {
            const transporter = nodemailer.createTransport({
                host: SMTP_HOST,
                port: SMTP_HOST_PORT,
                auth: {
                    user: SMTP_HOST_USER,
                    pass: SMTP_HOST_PASSWORD,
                },
            })

            const mailOptions = {
                from: `"${ADMIN_NAME}" <${ADMIN_EMAIL}>`,
                to: email,
                subject,
                html: body,
                ...(attachments.length > 0 && { attachments }),
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
                message: `Failed to send email: ${
                    error.response || error.message
                }`,
            })
        }
    },

    /**
     * Adds an email-sending task to the queue for background processing.
     * @param {Object} options - The email options (email, subject, body, attachments).
     * @returns {Promise<void>}
     */
    async enqueueEmail({ email, subject, body, attachments = [] }) {
        await emailQueue.add(() =>
            emailService.send({ email, subject, body, attachments }),
        )
    },
}

export default emailService
