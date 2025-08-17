const DBCURRENCY = 'USD'

/**
 * A class that provides advanced filtering, sorting, and pagination capabilities for a given query.
 * @class
 */
export class ApiFeatures {
    /**
     * Creates an instance of ApiFeatures.
     * @param {Object} query - The query to be filtered, sorted, and paginated.
     * @param {Object} queryStr - The query string containing the filtering, sorting, and pagination parameters.
     */
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = this._decodeQueryParams(queryStr)
    }

    /**
     * Applies the filtering criteria specified in the query string to the query.
     * @returns {ApiFeatures} The instance of ApiFeatures.
     */
    filter() {
        const queryObj = { ...this.queryStr }
        let filteredQuery = this._applyDetailsFilters(queryObj)
        filteredQuery = this._applyPriceFilters(filteredQuery)
        filteredQuery = this._applyLocationFilters(filteredQuery)
        filteredQuery = this._applyOtherFilters(filteredQuery)
        filteredQuery = this._applyAreaFilters(filteredQuery)
        filteredQuery = this._applyMultipleTypeFilters(filteredQuery)
        this._removeExcludedFields(filteredQuery)
        this.query = this.query.find(filteredQuery)
        return this
    }

    /**
     * Applies the sorting criteria specified in the query string to the query.
     * @returns {ApiFeatures} The instance of ApiFeatures.
     */
    sort() {
        const { sortByDate, sortByPrice } = this.queryStr
        const sortCriteria = {}

        if (!sortByDate && !sortByPrice) {
            sortCriteria['lastUpdatedTime'] = -1
        }

        if (sortByPrice) {
            sortCriteria['price.amount'] = sortByPrice === 'asc' ? 1 : -1
        }

        if (sortByDate) {
            sortCriteria['lastUpdatedTime'] = sortByDate === 'desc' ? 1 : -1
        }

        this.query = this.query.sort(sortCriteria)

        return this
    }

    /**
     * Limits the fields returned in the response based on the fields specified in the query string.
     * @returns {ApiFeatures} The instance of ApiFeatures.
     */
    limitFields() {
        const fields = this.queryStr.fields
            ? this._extractParams(this.queryStr.fields)
            : ''
        this.query = this.query.select(fields)
        return this
    }

    /**
     * Paginates the results based on the page and limit parameters specified in the query string.
     * @returns {ApiFeatures} The instance of ApiFeatures.
     */
    paginate() {
        const { page = 1, limit = 8 } = this.queryStr
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)

        this.paginationMetadata = async () => {
            const total = await this.query.model.countDocuments(
                this.query.getQuery(),
            )

            const totalPages = Math.ceil(total / limit)
            const currentPage = parseInt(page)

            return {
                total,
                page: currentPage,
                limit,
                nextPage: currentPage < totalPages ? currentPage + 1 : null,
                prevPage: currentPage > 1 ? currentPage - 1 : null,
                totalPages,
            }
        }

        return this
    }

    /**
     * Removes the excluded fields from the query object.
     * @param {Object} queryObj - The query object.
     * @returns {Object} The modified query object.
     * @private
     */
    _removeExcludedFields(queryObj) {
        const excludedFields = [
            'page',
            'limit',
            'sortByPrice',
            'sortByDate',
            'fields',
        ]
        excludedFields.forEach((field) => delete queryObj[field])
        return queryObj
    }

    /**
     * Applies the price filters to the query object.
     * @param {Object} queryObj - The query object.
     * @returns {Object} - The modified query object.
     * @private
     */
    _applyPriceFilters(queryObj) {
        const query = { ...queryObj }
        const priceFilter = {}

        const rateData = JSON.parse(query.rate || '{}')
        const conversionRates = rateData.rates?.conversion_rates || {}
        const userCurrency = rateData.currency || 'USD'

        const minPrice = query.minprice ? parseFloat(query.minprice) : undefined
        const maxPrice = query.maxprice ? parseFloat(query.maxprice) : undefined

        delete query.minprice
        delete query.maxprice
        delete query.rate

        if (userCurrency !== DBCURRENCY) {
            const conversionRateToDb =
                conversionRates[DBCURRENCY] /
                (conversionRates[userCurrency] || 1)

            if (minPrice !== undefined) {
                priceFilter.$gte = Math.floor(minPrice * conversionRateToDb)
            }
            if (maxPrice !== undefined) {
                priceFilter.$lte = Math.floor(maxPrice * conversionRateToDb)
            }
        } else {
            if (minPrice !== undefined) {
                priceFilter.$gte = minPrice
            }
            if (maxPrice !== undefined) {
                priceFilter.$lte = maxPrice
            }
        }

        if (Object.keys(priceFilter).length > 0) {
            query['price.amount'] = priceFilter
        }

        return query
    }

    /**
     * Applies the price filters to the query object.
     * @param {Object} queryObj - The query object.
     * @returns {Object} - The modified query object.
     * @private
     */
    _applyAreaFilters(queryObj) {
        const query = { ...queryObj }
        const landFilter = {}
        const houseFilter = {}

        if (query.mintotalAreas) {
            landFilter.$gte = +query.mintotalAreas
            delete query.mintotalAreas
        }

        if (query.maxtotalAreas) {
            landFilter.$lte = +query.maxtotalAreas
            delete query.maxtotalAreas
        }

        if (query.minarea) {
            houseFilter.$gte = +query.minarea
            delete query.minarea
        }

        if (query.maxarea) {
            houseFilter.$lte = +query.maxarea
            delete query.maxarea
        }

        if (Object.keys(landFilter).length > 0) {
            query['details.totalAreas'] = landFilter
        }

        if (Object.keys(houseFilter).length > 0) {
            query['details.area'] = houseFilter
        }

        return query
    }

    /**
     * Applies location filters to the query object.
     * @param {Object} queryObj - The query object.
     * @private
     */
    _applyLocationFilters(queryObj) {
        const query = { ...queryObj }

        const locationFields = ['city', 'address', 'state', 'country']
        const translatableFields = ['tCity', 'tState', 'address']
        const languages = ['en', 'hy', 'rus']

        if (query.location) {
            const locationRegex = new RegExp(query.location, 'i')
            const translatableOrConditions = []

            // Include conditions for translatable fields
            translatableFields.forEach((field) => {
                languages.forEach((lang) => {
                    translatableOrConditions.push({
                        [`location.${field}.${lang}`]: {
                            $regex: locationRegex,
                        },
                    })
                })
            })

            query.$or = [
                { 'location.city': { $regex: locationRegex } },
                { 'location.state': { $regex: locationRegex } },
                { 'location.country': { $regex: locationRegex } },
                { _id: { $regex: locationRegex } },
                ...translatableOrConditions,
            ]

            delete query.location
        }

        locationFields.forEach((field) => {
            if (query[field]) {
                const regexPatterns = query[field]
                    .split(',')
                    .map((value) => new RegExp(value, 'i'))

                query[`location.${field}`] = {
                    $in: regexPatterns,
                }
                delete query[field]
            }
        })

        translatableFields.forEach((field) => {
            if (query[field]) {
                const regexPatterns = query[field]
                    .split(',')
                    .map((value) => new RegExp(value, 'i'))

                languages.forEach((lang) => {
                    query[`location.${field}.${lang}`] = {
                        $in: regexPatterns,
                    }
                })

                delete query[field]
            }
        })

        return query
    }

    /**
     * Applies filters for the 'details' object.
     * @param {Object} queryObj - The query object.
     * @returns {Object} The modified query object.
     * @private
     */
    _applyDetailsFilters(queryObj) {
        const query = { ...queryObj }
        const numericFields = [
            'bedrooms',
            'bathrooms',
            'area',
            'totalAreas',
            'totalFloors',
            'floorNumber',
        ]

        const listFields = ['utilities', 'additionalUtilities']

        numericFields.forEach((field) => {
            if (query[field]) {
                const queryFieldValues = query[field].split(',').map(Number)
                query[`details.${field}`] = { $in: queryFieldValues }
                delete query[field]
            }
        })

        listFields.forEach((field) => {
            if (query[field]) {
                const regexPatterns = query[field]
                    .split(',')
                    .map((value) => new RegExp(`^${value}$`, 'i'))
                query[`details.${field}`] = {
                    $elemMatch: {
                        $in: regexPatterns,
                    },
                }
                delete query[field]
            }
        })
        return query
    }

    /**
     * Extracts the parameters from the given query string.
     * @param {string} queryString - The query string.
     * @returns {string} The modified query string.
     * @private
     */
    _extractParams(queryString) {
        return queryString.split(',').join(' ')
    }

    /**
     * Applies additional filters for other properties.
     * @param {Object} queryObj - The query object.
     * @returns {Object} The modified query object.
     * @private
     */
    _applyOtherFilters(queryObj) {
        const query = { ...queryObj }
        const otherFields = ['type', 'category', 'isBestOffers']
        otherFields.forEach((field) => {
            if (query[field]) {
                query[field] = query[field].toLowerCase()
            }
        })
        return query
    }

    _applyMultipleTypeFilters(queryObj) {
        const query = { ...queryObj }
        const fields = [
            'projectType',
            'buildingType',
            'significance',
            'renovation',
            'houseType',
        ]

        fields.forEach((field) => {
            if (query[field]) {
                const regexPatterns = query[field]
                    .split(',')
                    .map((value) => new RegExp(value, 'i'))
                query[field] = {
                    $in: regexPatterns,
                }
            }
        })

        return query
    }

    /**
     * Decodes a string or an array of strings.
     * @param {string | string[]} value - The value to decode.
     * @returns {string | string[]} - The decoded value.
     * @private
     */
    _decodeString(value) {
        if (typeof value === 'string') {
            return decodeURIComponent(value)
        } else if (Array.isArray(value)) {
            return value.map((item) => decodeURIComponent(item))
        }
        return value // Return as is if not string or array
    }

    /**
     * Decodes all query parameters in the query string.
     * @param {Object} queryObj - The query object.
     * @returns {Object} - The query object with decoded values.
     * @private
     */
    _decodeQueryParams(queryObj) {
        const decodedQuery = {}
        Object.keys(queryObj).forEach((key) => {
            decodedQuery[key] = this._decodeString(queryObj[key])
        })
        return decodedQuery
    }
}
