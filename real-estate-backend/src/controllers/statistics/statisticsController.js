/**
 * @description This controller handles the statistics related operations.
 * @param {Object} StatisticsService - An instance of the StatisticsService class.
 * @returns {Object} - An object containing methods for handling statistics operations.
 * @example
 * const statisticsController = statisticsControllerFactory(StatisticsService);
 */
export const statisticsController = (StatisticsService) => ({
    /**
     * @description Fetches daily statistics based on the provided date.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the statistics are fetched successfully.
     * @example
     * statisticsController.getDailyStatistics(req, res, next);
     */
    getDailyStatistics: async (req, res, next) => {
        const { date } = req.query
        try {
            const stats = await StatisticsService.getDailyStatistics(
                new Date(date),
            )
            res.status(200).json({
                code: 200,
                success: true,
                message: 'Statistics has been successfully updated!',
                data: {
                    ...stats,
                },
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * @description Fetches monthly statistics based on the provided year and month.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the statistics are fetched successfully.
     * @example
     * statisticsController.getMonthlyStatistics(req, res, next);
     */
    getMonthlyStatistics: async (req, res, next) => {
        const { year, month } = req.query
        try {
            const stats = await StatisticsService.getMonthlyStatistics(
                parseInt(year),
                parseInt(month),
            )

            res.status(200).json({
                code: 200,
                success: true,
                message: 'Statistics has been successfully updated!',
                data: {
                    ...stats,
                },
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * @description Fetches yearly statistics based on the provided year.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the statistics are fetched successfully.
     * @example
     * statisticsController.getYearlyStatistics(req, res, next);
     */
    getYearlyStatistics: async (req, res, next) => {
        const { year } = req.query
        try {
            const stats = await StatisticsService.getYearlyStatistics(
                parseInt(year),
            )
            res.status(200).json({
                code: 200,
                success: true,
                message: 'Statistics has been successfully updated!',
                data: {
                    ...stats,
                },
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * @description Adds daily statistics to the database.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the statistics are added successfully.
     * @example
     * statisticsController.addDailyStatistics(req, res, next);
     */
    addDailyStatistics: async (req, res, next) => {
        const { date, actionType } = req.body
        try {
            const updatedStats = await StatisticsService.addDailyStatistics(
                date,
                actionType,
            )

            res.status(201).json({
                code: 200,
                success: true,
                message: 'Statistics has been successfully updated!',
                data: {
                    ...updatedStats,
                },
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * @description Fetches property statistics.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the property statistics are fetched successfully.
     * @example
     * statisticsController.getPropertyStatistics(req, res, next);
     */
    getPropertyStatistics: async (_, res, next) => {
        try {
            const properties = await StatisticsService.getActiveProperties()

            res.status(201).json({
                code: 200,
                success: true,
                message: 'Property statistics has been successfully fetch!',
                result: properties.length,
            })
        } catch (error) {
            next(error)
        }
    },
})
