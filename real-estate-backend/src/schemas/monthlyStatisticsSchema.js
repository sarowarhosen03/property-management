import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const monthlyStatisticsSchema = new Schema({
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    totalViews: { type: Number, default: 0 },
    totalShares: { type: Number, default: 0 },
    totalLikes: { type: Number, default: 0 },
    days: [{ type: Schema.Types.ObjectId, ref: 'DailyStatistics' }],
})

monthlyStatisticsSchema.index({ year: 1, month: 1 }, { unique: true })
