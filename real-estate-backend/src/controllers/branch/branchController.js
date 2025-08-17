/**
 * Branch Controller.
 * @param {Object} branchService - The branch service object.
 * @returns {Object} The branch controller object.
 */
export const branchController = (branchService) => ({
    /**
     * Retrieves all branches.
     * @async
     * @function getAll
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    getAll: async (req, res, next) => {
        const query = req.query || {}
        try {
            const branches = await branchService.getAll(query)

            res.status(200).json({
                code: 200,
                success: true,
                message: 'Branch list has been successfully fetched!',
                result: branches.length,
                data: branches,
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Retrieves a branch by its ID.
     * @async
     * @function getById
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    getById: async (req, res, next) => {
        const { branchId } = req.params

        try {
            const branch = await branchService.getById(branchId)

            res.status(200).json({
                code: 200,
                success: true,
                message: 'Branch has been successfully fetched!',
                data: branch,
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Creates a new branch.
     * @async
     * @function create
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    create: async (req, res, next) => {
        try {
            const { body } = req
            const branch = await branchService.create({
                ...body,
            })

            res.status(201).json({
                code: 201,
                success: true,
                message: 'New branch has been added successfully!',
                data: {
                    ...branch,
                },
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Updates a branch by its ID.
     * @async
     * @function updateById
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    updateById: async (req, res, next) => {
        const { params, body: branch } = req
        const { branchId } = params

        try {
            const updatedBranch = await branchService.updateById({
                branchId,
                branch: {
                    ...branch,
                },
            })

            res.status(200).json({
                code: 200,
                success: true,
                message: 'Branch has been updated successfully!',
                data: {
                    ...updatedBranch,
                },
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Deletes a branch by its ID.
     * @async
     * @function deleteById
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    deleteById: async (req, res, next) => {
        const {
            user,
            params: { branchId },
        } = req
        try {
            await branchService.deleteById({ branchId, user })

            res.status(204).json({
                code: 204,
                success: true,
                message: 'Branch has been deleted successfully!',
            })
        } catch (error) {
            next(error)
        }
    },
})

export default branchController
