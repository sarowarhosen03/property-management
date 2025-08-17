/**
 * Converts a price filter range to the base currency (USD).
 * @param {number} minPrice - Minimum price in the user's currency.
 * @param {number} maxPrice - Maximum price in the user's currency.
 * @param {string} currency - The user's selected currency (e.g., "RUB").
 * @param {Object} conversionRates - Object containing conversion rates.
 * @returns {Object} - The price range in the base currency.
 */
export function convertToBaseCurrency(
    minPrice,
    maxPrice,
    currency,
    conversionRates,
) {
    const rate = conversionRates[currency] || 1
    return {
        minPriceUSD: minPrice ? minPrice / rate : undefined,
        maxPriceUSD: maxPrice ? maxPrice / rate : undefined,
    }
}
