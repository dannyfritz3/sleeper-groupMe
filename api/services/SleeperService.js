var _sleeperAdapter;

module.exports = class SleeperService {
    constructor(sleeperAdapter) {
        _sleeperAdapter = sleeperAdapter;
    };

    getTeamNameByOwnerId = async (ownerId) => {
        let userData = await _sleeperAdapter.getLeagueUsers();
        let userMatch = userData.filter(user => user.user_id == ownerId);
        return userMatch[0].metadata.team_name;
    }

    getWeekNumber = async () => {
        var leagueData = await _sleeperAdapter.getLeagueData();
        return leagueData.settings.leg;
    };

    getCurrentMatchups = async () => {
        var currentWeekNumber = await this.getWeekNumber();
        return this.getMatchupsByWeekNumber(currentWeekNumber);
    }

    getMatchupsByWeekNumber = async (weekNumber) => {
        return await _sleeperAdapter.getLeagueMatchupsByWeekNumber(weekNumber);
    }

    getLeagueStandings = async () => {

    }
}