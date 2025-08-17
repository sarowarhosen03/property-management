const listingService = (Listing) => ({
    /**
     * Retrieves all listings.
     * @async
     * @function
     * @memberof listingService
     * @returns {Promise<Array<Object>>} A promise that resolves to an array of listing objects.
     */
    async getAll(query) {
        console.log(query)
        return await Listing.getAll()
    },
})

export default listingService
