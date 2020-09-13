/**
 * scrape-football
 * Scraping JSON from football-data.org
 *
 * @author Ben Hawley
 * @license MIT
 */

"use strict";

/**
 * index.js
 * Inquirer script to set up a scrape
 */

// External Modules
const inquirer = require("inquirer");

// Internal Libraries
const {scrape} = require("./lib/scrape");
const {LEAGUES} = require("./lib/leagues");

(async function run() {
    // Get the user to check the leagues to scrape
    const {leagueNames} = await inquirer.prompt({
        type: "checkbox",
        message: "Select the leagues you wish to scrape.",
        choices: LEAGUES.map(league => league.name),
        name: "leagueNames"
    });

    // Convert the league names back to league objects
    const leagues = leagueNames.map(leagueName => LEAGUES.find(league => league.name === leagueName));

    // Get the years between 2014 and now
    const startYear = 2014;
    const endYear = new Date().getFullYear();
    const availableYears = [];
    for (let year = startYear; year < endYear + 1; year++) {
        availableYears.push(year);
    }

    // Select the seasons to scrape
    const {seasons} = await inquirer.prompt({
        type: "checkbox",
        message: "Select the seasons you wish to scrape. (i.e. 2014 is 14/15 season)",
        choices: availableYears,
        name: "seasons"
    });


    // Final confirmation
    const {ready} = await inquirer.prompt({
        type: "confirm",
        message: `Scraping leagues: ${leagueNames.join(", ")} for seasons ${seasons.join(", ")}. Ready to scrape?`,
        default: false,
        name: "ready"
    })

    if (ready === false) {
        console.log(`Cancelling scrape.`);
        return;
    }

    await scrape({leagues: leagues.map(league => league.code), seasons});
    console.log("Completed scrape");
}());