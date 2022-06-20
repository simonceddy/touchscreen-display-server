/**
 * Convenience method for success: true/false responses.
 *
 * Used mainly by the wrapper functions below, otherwise it's just not that
 * convenient.
 * @param {string} message Message to respond with
 * @param {boolean} success Is the request successful
 * @param {object} props Additional properties to add to response
 * @returns {object} The response body
 */
function getSuccessResponse(message, success = true, props = {}) {
  return {
    message,
    success,
    ...props
  };
}

/**
 * Convenience method for creating a response with success: false
 * @param {string} message Message to respond with
 * @param {object} props Additional properties to add to response
 * @returns {object} The response body
 */
function failResponse(message = '', props = {}) {
  return getSuccessResponse(message, false, props);
}

/**
 * Convenience method for creating a response with success: true
 * @param {string} message Message to respond with
 * @param {object} props Additional properties to add to response
 * @returns {object} The response body
 */
function successResponse(message = '', props = {}) {
  return getSuccessResponse(message, true, props);
}

module.exports = {
  getSuccessResponse,
  failResponse,
  successResponse
};
