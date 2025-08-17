import mongoose from 'mongoose'

const { Schema } = mongoose

export const contactSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
        },
        attachments: [{ type: String }],
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
)
