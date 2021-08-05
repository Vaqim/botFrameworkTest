const axios = require('axios');
const { stringify } = require('querystring');

const { googleApiKey } = require('../config').config;
const { GOOGLE_GEOCODING_ORIGIN, GOOGLE_PLACE_ORIGIN, GOOGLE_PLACE_DETAILS_ORIGIN } =
  require('../config').constants;

/**
 * Translate zip code to latitude & longitude coordinates by Google Geocoding API
 * @param {string} zipCode
 * @returns {object} - coordinates in latitude & longitude format
 * @returns {boolean} - false if translating failed
 */
async function getCoordinates(zipCode) {
  try {
    const response = await axios.get(
      `${GOOGLE_GEOCODING_ORIGIN}${stringify({
        components: `postal_code:${zipCode}|country:us`,
        key: googleApiKey,
      })}`,
    );

    if (!response.data.results.length) return false;

    const { location } = response.data.results[0].geometry;

    return location;
  } catch (error) {
    // console.error(error);
    throw new Error('Zip code decoding failed');
  }
}

/**
 * Return the nearest cafes by latitude & longitude coordinates
 * @param {object} location - object with lat & lng keys
 * @returns {array} - array of the nearest cafes
 */
async function getNearestPlaces(location) {
  try {
    const response = await axios.get(
      `${GOOGLE_PLACE_ORIGIN}${stringify({
        location: `${location.lat},${location.lng}`,
        key: googleApiKey,
        rankby: 'distance',
        type: 'cafe',
      })}`,
    );

    return response.data.results;
  } catch (error) {
    // console.error(error);
    throw new Error('Searching nearest places failed');
  }
}

/**
 * Return place details by google place id
 * @param {string} placeId - google place id
 * @returns {object} - place details object
 */
async function getPlaceDetails(placeId) {
  try {
    const response = await axios.get(
      `${GOOGLE_PLACE_DETAILS_ORIGIN}${stringify({
        place_id: placeId,
        region: 'us',
        key: googleApiKey,
      })}`,
    );

    return response.data.result;
  } catch (error) {
    // console.error(error);
    throw new Error('Place details request failed');
  }
}

module.exports = {
  getCoordinates,
  getNearestPlaces,
  getPlaceDetails,
};
