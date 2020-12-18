const axios = require('axios');
const sleeperApiBaseUrl = "https://api.sleeper.app/v1";
const leagueNumber = "575392779379286016";

module.exports = class SleeperAdapter {
    constructor() {};

    getLeagueData = async () => {
        var url = `${sleeperApiBaseUrl}/league/${leagueNumber}`;
        return this.getUrl(url);
    }

    getLeagueUsers = async () => {
        var url = `${sleeperApiBaseUrl}/league/${leagueNumber}/users`;
        return this.getUrl(url);
    }

    getLeageRosters = async () => {
        var url = `${sleeperApiBaseUrl}/league/${leagueNumber}/rosters`;
        return this.getUrl(url);
    }

    getLeagueMatchupsByWeekNumber = async (weekNumber) => {
        var url = `${sleeperApiBaseUrl}/league/${leagueNumber}/matchups/${weekNumber}`;
        return this.getUrl(url);
    }

    getPlayersData = async () => {
        let url = `${sleeperApiBaseUrl}/players/nfl`;
        return this.getUrl(url);
    }

    getUrl = async(url) => {
        var response = await axios.get(url);
        return response.data;
    }
};