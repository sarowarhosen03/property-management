import { AppError } from '../../utils/AppError.js'

export const listingController = (listingService) => ({
    /**
     * Retrieves all property.
     * @async
     * @function getAll
     * @param {Object} _req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     * @throws {AppError} - If an error occurs during the operation.
     */
    getAll: async (req, res, next) => {
        const query = req.query
        try {
            const listings = await listingService.getAll(query)

            res.status(200).json({
                code: 200,
                success: true,
                message: 'Listings has been successfully fetched!',
                data: {
                    listings: [...listings],
                },
            })
        } catch (error) {
            const { message, code } = error

            next(
                new AppError({
                    code,
                    success: false,
                    message,
                }),
            )
        }
    },
})

export default listingController
