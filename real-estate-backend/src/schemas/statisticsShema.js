import mongoose from 'mongoose'
const { Schema } = mongoose

export const statisticsSchema = new Schema(
    {
        year: { type: Number },
        month: { type: Number },
        day: { type: Number },
        totalViews: { type: Number, default: 0 },
        totalShares: { type: Number, default: 0 },
        totalLikes: { type: Number, default: 0 },
    },
    { timestamps: true },
)
