import mongoose from 'mongoose'

const { Schema } = mongoose

export const inboxSchema = new Schema(
    {
        agentId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        propertyId: {
            type: String,
            ref: 'Property',
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: false,
        },
        phone: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
)
