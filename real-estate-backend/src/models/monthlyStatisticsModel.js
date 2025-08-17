import mongoose from 'mongoose'
import { monthlyStatisticsSchema } from '../schemas/monthlyStatisticsSchema.js'

/**
 * Updates the monthly statistics with the provided daily statistics.
 *
 * @param {Object} dailyStat - The daily statistics object containing the date, total views, total shares, and total likes.
 * @param {Date} dailyStat.date - The date of the daily statistics.
 * @param {Number} dailyStat.totalViews - The total number of views for the daily statistics.
 * @param {Number} dailyStat.totalShares - The total number of shares for the daily statistics.
 * @param {Number} dailyStat.totalLikes - The total number of likes for the daily statistics.
 * @returns {Promise<Object>} - A promise that resolves to the updated monthly statistics document.
 */
monthlyStatisticsSchema.statics = {
    updateMonthlyTotals: async function (dailyStat) {
        const { date, totalViews, totalShares, totalLikes } = dailyStat
        const month = date.getMonth()
        const year = date.getFullYear()

        return await this.findOneAndUpdate(
            { year, month },
            {
                $inc: {
                    totalViews: totalViews,
                    totalShares: totalShares,
                    totalLikes: totalLikes,
                },
                $addToSet: { days: dailyStat._id },
            },
            { new: true, upsert: true },
        )
    },
}

const MonthlyStatistics = mongoose.model(
    'MonthlyStatistics',
    monthlyStatisticsSchema,
)

export default MonthlyStatistics
