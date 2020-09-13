/**
 * scrape-football
 * Scraping JSON from football-data.org
 *
 * @author Ben Hawley
 * @license MIT
 */

"use strict";

/**
 * leagues.js
 * An array of supported leagues to scrape
 */

module.exports.LEAGUES = [
    {
        code: "BL1",
        country: "Germany",
        name: "1. Bundesliga",
        matchdays: 34
    },
    {
        code: "BL2",
        country: "Germany",
        name: "2. Bundesliga",
        matchdays: 34
    },
    {
        code: "BL3",
        country: "Germany",
        name: "3. Bundesliga",
        matchdays: 38
    },
    {
        code: "DFB",
        country: "Germany",
        name: "Dfb-Cup",
        matchdays: null
    },
    {
        code: "PL",
        country: "England",
        name: "Premier League",
        matchdays: 38
    },
    {
        code: "ELC",
        country: "England",
        name: "Championship",
        matchdays: 46
    },
    {
        code: "EL1",
        country: "England",
        name: "League One",
        matchdays: 46
    },
    {
        code: "FAC",
        country: "England",
        name: "FA Cup",
        matchdays: null
    },
    {
        code: "SA",
        country: "Italy",
        name: "Serie A",
        matchdays: 38
    },
    {
        code: "SB",
        country: "Italy",
        name: "Serie B",
        matchdays: 38
    },
    {
        code: "PD",
        country: "Spain",
        name: "Primera Division",
        matchdays: 38
    },
    {
        code: "SD",
        country: "Spain",
        name: "Segunda Division",
        matchdays: 42
    },
    {
        code: "CDR",
        country: "Spain",
        name: "Copa del Rey",
        matchdays: null
    },
    {
        code: "FL1",
        country: "France",
        name: "Ligue 1",
        matchdays: 38
    },
    {
        code: "FL2",
        country: "France",
        name: "Ligue 2",
        matchdays: 38
    },
    {
        code: "DED",
        country: "Netherlands",
        name: "Eredivisie",
        matchdays: 34
    },
    {
        code: "PPL",
        country: "Portugal",
        name: "Primeira Liga",
        matchdays: 34
    },
    {
        code: "GSL",
        country: "Greece",
        name: "Super League",
        matchdays: 30
    },
    {
        code: "CL",
        country: "Europe",
        name: "Champions League",
        matchdays: null
    },
    {
        code: "EL",
        country: "Europe",
        name: "UEFA Cup",
        matchdays: null
    },
    {
        code: "EC",
        country: "Europe",
        name: "European Cup of Nations",
        matchdays: null
    },
    {
        code: "WC",
        country: "World",
        name: "World Cup",
        matchdays: null
    }
];
