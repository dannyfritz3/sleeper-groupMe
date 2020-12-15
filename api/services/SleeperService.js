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
}