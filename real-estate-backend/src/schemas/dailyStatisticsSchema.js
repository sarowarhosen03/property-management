import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const dailyStatisticsSchema = new Schema({
    date: { type: Date, required: true, unique: true },
    totalViews: { type: Number, default: 0 },
    totalShares: { type: Number, default: 0 },
    totalLikes: { type: Number, default: 0 },
})
