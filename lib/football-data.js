/**
 * scrape-football
 * Scraping JSON from football-data.org
 *
 * @author Ben Hawley
 * @license MIT
 */

"use strict";

/**
 * football-data.js
 * Class to make requests to API
 */

// External Modules
const fetch = require("node-fetch");
const querystring = require("querystring");

// Internal Libraries
const tools = require("./tools");

/**
 * FootballData API Class
 */
class FootballData {

    /**
     * constructor()
     * Create an instance of the FootballData client
     *
     * @param {String} key
     */
    constructor(key) {
        this.endpoint = "https://api.football-data.org/v2";

        // Check and store our API key
        if (Boolean(key) === false) {
            throw new Error(`Invalid API Key Supplied: ${key}`)
        }
        this.key = key;

        // We use this variables to prevent us reaching the rate limit
        this.requestsRemaining = 0;
        this.nextResetDate = new Date();
    }


    /**
     * request()
     * Use node-fetch to query API
     *
     * @param {String} uri
     * @param {Object} [options]
     * @param {String} [options.method]
     * @returns {Promise}
     */
    async request(uri, options = { method: "GET" }) {
        console.log(`Requesting: ${uri}`)

        // Check if we have any rate limit left, and if not, delay until we do.
        const now = new Date();
        if (this.requestsRemaining === 0 && now < this.nextResetDate) {
            // Calculate the difference in milliseconds
            // Add 3 seconds to be sure
            const nowMs = now.getTime();
            const resetMs = this.nextResetDate.getTime();
            const difference = resetMs - nowMs + 3000;

            console.log(`Delaying request to: ${uri} for ${Math.trunc(difference / 1000)} seconds to avoid hitting rate limit`);
            await tools.delay(difference);
        }

        const response = await fetch(uri, {
            method: options.method,
            headers: {
                "X-Auth-Token": `${this.key}`,
            },
        });

        // How is the rate limit looking after this request?
        const requestsRemaining = response.headers.get("x-requests-available-minute");
        const secondsUntilReset = response.headers.get("x-requestcounter-reset");
        console.log(`${requestsRemaining} requests remaining - limit resets in ${secondsUntilReset} seconds.`)

        // Store internally when the rate limit will reset
        const resetDate = new Date();
        resetDate.setSeconds(resetDate.getSeconds() + parseInt(secondsUntilReset, 10));
        this.nextResetDate = resetDate;
        this.requestsRemaining = parseInt(requestsRemaining, 10);

        // Throw for bad responses
        if (response.ok === false) {
            throw new Error(`Response is not ok: ${response.status}`)
        }

        const data = await response.json();
        return data;
    }

    /**
     * getMatches()
     * Get matches for a given league
     *
     * @param {Object} params
     * @param {String} params.league
     * @param {Number} [params.season]
     * @param {Number} [params.matchday]
     * @returns {Promise}
     */
    getMatches(params = {}) {
        if (Boolean(params.league) === false) {
            throw new Error(`League is required to getMatches`);
        }

        let uri = `${this.endpoint}/competitions/${params.league}/matches?${querystring.encode(params)}`;
        return this.request(uri);
    }
}

module.exports.FootballData = FootballData;