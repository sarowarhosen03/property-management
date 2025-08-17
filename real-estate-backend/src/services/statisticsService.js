/**
 * @description This service provides methods to interact with statistics data.
 * @param {DailyStatistics} DailyStatistics - Mongoose model for daily statistics.
 * @param {MonthlyStatistics} MonthlyStatistics - Mongoose model for monthly statistics.
 * @param {YearlyStatistics} YearlyStatistics - Mongoose model for yearly statistics.
 * @param {Property} Property - Mongoose model for properties.
 * @returns {Object} An object containing methods for interacting with statistics data.
 */
const statisticsService = (
    DailyStatistics,
    MonthlyStatistics,
    YearlyStatistics,
    Property,
) => ({
    /**
     * @description Retrieves daily statistics for a given date.
     * @param {string} date - The date in the format 'YYYY-MM-DD'.
     * @returns {Object} The daily statistics document or null if not found.
     */
    getDailyStatistics: async (date) => {
        return await DailyStatistics.findOne({ date }).lean()
    },

    /**
     * @description Retrieves monthly statistics for a given year and month.
     * @param {number} year - The year.
     * @param {number} month - The month (1-12).
     * @returns {Object} The monthly statistics document or null if not found.
     */
    getMonthlyStatistics: async (year, month) => {
        return await MonthlyStatistics.findOne({ year, month })
            .populate('days')
            .lean()
    },

    /**
     * @description Retrieves yearly statistics for a given year.
     * @param {number} year - The year.
     * @returns {Object} The yearly statistics document or null if not found.
     */
    getYearlyStatistics: async (year) => {
        if (!year) {
            return await YearlyStatistics.find().lean()
        }
        return await YearlyStatistics.findOne({ year })
            .populate('months')
            .lean()
    },

    /**
     * @description Adds daily statistics for a given date and action type.
     * @param {string} date - The date in the format 'YYYY-MM-DD'.
     * @param {string} actionType - The type of action (e.g., 'view', 'like', 'share').
     * @returns {Object} An object containing the updated daily, monthly, and yearly statistics documents.
     */
    addDailyStatistics: async (date, actionType) => {
        const updateField = {}

        switch (actionType) {
            case 'view':
                updateField.totalViews = 1
                break
            case 'like':
                updateField.totalLikes = 1
                break
            case 'share':
                updateField.totalShares = 1
                break
            default:
                throw new Error('Invalid action type')
        }

        const dailyResult = await DailyStatistics.findOneAndUpdate(
            { date },
            { $inc: updateField },
            { new: true, upsert: true },
        )

        const [year, month] = date.split('-').map(Number)

        let monthlyResult = await MonthlyStatistics.findOneAndUpdate(
            { year, month },
            { $inc: updateField },
            { new: true, upsert: true },
        )

        if (!monthlyResult.days.includes(dailyResult._id)) {
            monthlyResult = await MonthlyStatistics.findByIdAndUpdate(
                monthlyResult._id,
                { $addToSet: { days: dailyResult._id } },
                { new: true },
            )
        }

        let yearlyResult = await YearlyStatistics.findOneAndUpdate(
            { year },
            { $inc: updateField },
            { new: true, upsert: true },
        )

        if (!yearlyResult.months.includes(monthlyResult._id)) {
            yearlyResult = await YearlyStatistics.findByIdAndUpdate(
                yearlyResult._id,
                { $addToSet: { months: monthlyResult._id } },
                { new: true },
            )
        }

        return { dailyResult, monthlyResult, yearlyResult }
    },

    /**
     * @description Retrieves the total statistics for a given month and year.
     * @param {number} year - The year.
     * @param {number} month - The month (1-12).
     * @returns {Object} An object containing the total statistics for the given month and year.
     */
    getMonthlyTotals: async (year, month) => {
        const results = await DailyStatistics.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $year: '$date' }, year] },
                            { $eq: [{ $month: '$date' }, month] },
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalViews: { $sum: '$totalViews' },
                    totalShares: { $sum: '$totalShares' },
                    totalLikes: { $sum: '$totalLikes' },
                },
            },
        ]).lean()

        return results[0] || { totalViews: 0, totalShares: 0, totalLikes: 0 }
    },

    /**
     * @description Retrieves the active properties.
     * @returns {Array} An array of active properties.
     */
    getActiveProperties: async () => {
        return await Property.find({
            status: 'published',
        }).lean()
    },
})

export default statisticsService
