const SleeperAdapter = require('../adapters/SleeperAdapter.js');

var sleeperAdapter;

module.exports = class SleeperService {
    constructor() {
        sleeperAdapter = new SleeperAdapter();
    };

    getRosterByUserId = async (userId) => {
        var leagueRosters = await sleeperAdapter.getLeageRosters();
        return leagueRosters.find(roster => roster.owner_id === userId);
    };

    getWeekNumber = async () => {
        var leagueData = await sleeperAdapter.getLeagueData();
        return leagueData.settings.leg;
    };

    getCurrentMatchups = async () => {
        var currentWeekNumber = this.getWeekNumber();
        return this.getMatchupsByWeekNumber(currentWeekNumber);
    };

    getMatchupsByWeekNumber = async (weekNumber) => {
        return await sleeperAdapter.getLeagueMatchupsByWeekNumber(weekNumber);
    };
}