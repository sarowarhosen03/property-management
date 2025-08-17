import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const yearlyStatisticsSchema = new Schema({
    year: { type: Number, required: true, unique: true },
    totalViews: { type: Number, default: 0 },
    totalShares: { type: Number, default: 0 },
    totalLikes: { type: Number, default: 0 },
    months: [{ type: Schema.Types.ObjectId, ref: 'MonthlyStatistics' }],
})
