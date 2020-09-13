/**
 * scrape-football
 * Scraping JSON from football-data.org
 *
 * @author Ben Hawley
 * @license MIT
 */

"use strict";

/**
 * tools.js
 * Useful utilities to be used throughout project
 */

// Internal Libraries
const {LEAGUES} = require("./leagues.js")

/**
 * supportsLeague()
 * Checks a supplied code is supported by the API
 *
 * @param {String} code
 * @returns {Boolean}
 */
function supportsLeague(code) {
    return LEAGUES.some(league => league.code === code);
}

/**
 * matchdaysFromLeagueCode()
 * Gets the number of match days for a league
 *
 * @param {String} code
 * @returns {Number}
 */
function matchdaysFromLeagueCode(code) {
    const league = LEAGUES.find(league => league.code === code);
    return league.matchdays;
}

/**
 * delay()
 * Return a promise which resolves after a supplied period of time
 *
 * @param {Number} ms milliseconds to wait
 * @returns {Promise}
 */
function delay(ms) {
    return new Promise(res => setTimeout(res, ms))
}

module.exports.delay = delay;
module.exports.supportsLeague = supportsLeague;
module.exports.matchdaysFromLeagueCode = matchdaysFromLeagueCode;