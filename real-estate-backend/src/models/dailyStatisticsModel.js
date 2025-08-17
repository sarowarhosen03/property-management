import mongoose from 'mongoose'
import { dailyStatisticsSchema } from '../schemas/dailyStatisticsSchema.js'

/**
 * @type {DailyStatisticsSchema.statics}
 * @param {Date} date - The date for which the statistics will be incremented.
 * @param {Object} stats - An object containing the statistics to be incremented.
 * @property {Number} [stats.totalViews=0] - The total number of views to be incremented.
 * @property {Number} [stats.totalShares=0] - The total number of shares to be incremented.
 * @property {Number} [stats.totalLikes=0] - The total number of likes to be incremented.
 * @returns {Promise<Document | null>} - A promise that resolves to the updated DailyStatistics document or null if not found.
 */
dailyStatisticsSchema.statics.incrementStatistics = async function (
    date,
    stats,
) {
    const { totalViews = 0, totalShares = 0, totalLikes = 0 } = stats
    return await this.findOneAndUpdate(
        { date },
        {
            $inc: {
                totalViews: totalViews,
                totalShares: totalShares,
                totalLikes: totalLikes,
            },
        },
        { new: true, upsert: true },
    )
}

const DailyStatistics = mongoose.model('DailyStatistics', dailyStatisticsSchema)

export default DailyStatistics
