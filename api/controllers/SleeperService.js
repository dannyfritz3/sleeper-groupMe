var _sleeperAdapter;

module.exports = class SleeperService {
    constructor(sleeperAdapter) {
        _sleeperAdapter = sleeperAdapter;
    };

    //not sure this will be needed anymore now that there is a usermappings config
    getRosterByUserId = async (userId) => {
        var leagueRosters = await _sleeperAdapter.getLeageRosters();
        return leagueRosters.find(roster => roster.owner_id === userId);
    };

    getWeekNumber = async () => {
        var leagueData = await _sleeperAdapter.getLeagueData();
        return leagueData.settings.leg;
    };

    getCurrentMatchups = async () => {
        var currentWeekNumber = await this.getWeekNumber();
        return this.getMatchupsByWeekNumber(currentWeekNumber);
    };

    getMatchupsByWeekNumber = async (weekNumber) => {
        return await _sleeperAdapter.getLeagueMatchupsByWeekNumber(weekNumber);
    };
}