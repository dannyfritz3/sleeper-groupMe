const axios = require('axios');
const sleeperApiBaseUrl = "https://api.sleeper.app/v1";
const leagueNumber = "575392779379286016";

module.exports = class SleeperAdapter {
    constructor() {};

    async getLeagueData() {
        const url = `${sleeperApiBaseUrl}/league/${leagueNumber}`
        var response = await axios.get(url);
        return response.data;
    };
};