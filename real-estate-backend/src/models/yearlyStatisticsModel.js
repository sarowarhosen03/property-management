import mongoose from 'mongoose'
import { yearlyStatisticsSchema } from '../schemas/yearlyStatisticsSchema.js'

/**
 * Updates the yearly statistics with the provided daily statistics.
 *
 * @param {Object} dailyStat - The daily statistics object containing date, totalViews, totalShares, and totalLikes.
 * @param {Date} dailyStat.date - The date of the daily statistics.
 * @param {Number} dailyStat.totalViews - The total number of views for the daily statistics.
 * @param {Number} dailyStat.totalShares - The total number of shares for the daily statistics.
 * @param {Number} dailyStat.totalLikes - The total number of likes for the daily statistics.
 * @param {String} dailyStat.monthly - The month of the daily statistics.
 * @returns {Promise<Object>} - The updated yearly statistics document.
 */
yearlyStatisticsSchema.statics = {
    updateYearlyTotals: async function (dailyStat) {
        const { date, totalViews, totalShares, totalLikes } = dailyStat
        const year = date.getFullYear()

        return await this.findOneAndUpdate(
            { year },
            {
                $inc: {
                    totalViews: totalViews,
                    totalShares: totalShares,
                    totalLikes: totalLikes,
                },
                $addToSet: { months: dailyStat.monthly },
            },
            { new: true, upsert: true },
        )
    },
}

const YearlyStatistics = mongoose.model(
    'YearlyStatistics',
    yearlyStatisticsSchema,
)

export default YearlyStatistics
