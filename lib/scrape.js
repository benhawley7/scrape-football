/**
 * scrape-football
 * Scraping JSON from football-data.org
 *
 * @author Ben Hawley
 * @license MIT
 */

"use strict";

/**
 * scrape.js
 * Scrapes the API for Match Data
 */

// Extenral Modules
const settings = require("app-settings");
const fs = require("fs");
const {promisify} = require("util");
const writeFile = promisify(fs.writeFile);

// Internal Libraries
const {FootballData} = require("./football-data");
const tools = require("./tools");

/**
 * scrape()
 * Scrape football matches from suppied leagues and seasons
 *
 * @param {Object} options
 * @param {Array<String>} [options.leagues=["PL"]] codes of leagues to scrape
 * @param {Array<Number>} [options.seasons=[lastYear]] starting years of seasons to scrape
 */
async function scrape(options = {}) {

    // Set defaults for the leagues and seasons values
    if (Array.isArray(options.leagues) === false || options.leagues.length === 0) {
        options.leagues = ["PL"];
    }

    if (Array.isArray(options.seasons) === false || options.seasons.length === 0) {
        options.seasons = [new Date().getFullYear() - 1];
    }

    const {leagues, seasons} = options;

    // Have any unsupported league codes been supplied?
    const unsupportedLeagues = leagues.filter(league => tools.supportsLeague(league) === false);
    if (unsupportedLeagues.length > 0) {
        throw new Error(`Some supplied leagues are not supported: ${unsupportedLeagues.join(", ")}`);
    }

    // Are the season dates valid? We only support after 2014.
    if (seasons.every(season => season > 2014) === false) {
        throw new Error(`Only seasons after 2014 are supported`);
    }

    // Instantiate new footballdata.org client with our API Key
    const client = new FootballData(settings.auth);

    // With defaults set, iterate through each of the Football Leagues for each season
    // to get the match days
    for (const season of seasons) {
        for (const league of leagues) {
            // Match days are hardcoded - this can be an issue - what if a league changes their number of teams?
            // Or had fewer teams in the past? This naive approach could trip us up!
            const matchdays = tools.matchdaysFromLeagueCode(league);

            // Cups don't have matchdays - so we handle them differently.
            if (Boolean(matchdays) === false) {
                continue;
            }
            for (let matchday = 1; matchday <= matchdays; matchday += 1) {
                console.log(`Scraping ${league} - Season ${season} - Match Day: ${matchday}`)

                const result = await client.getMatches({
                    season,
                    matchday,
                    league
                });

                for (const match of result.matches) {
                    await writeFile(
                        `./data/${league}-${season}-${matchday}-${match.id}.json`,
                        JSON.stringify(Object.assign(match, {competition: result.competition}), null, 4)
                    )
                }
            }
        }
    }
}

module.exports.scrape = scrape;