import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const resetPasswordSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

resetPasswordSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 300 })
