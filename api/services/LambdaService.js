const SleeperService = require('../services/SleeperService.js');
const GroupMeService = require('../services/GroupMeService.js');

var sleeperService, groupMeService;

module.exports = class LambdaService {
    constructor() {
        sleeperService = new SleeperService();
        groupMeService = new GroupMeService();
    };

    broadcastTopScorerEvent = () => {
        groupMeService.postMessage("cron job works");
    }

    broadcastMatchupLeadersEvent = () => {
        var matchups = sleeperService.getCurrentMatchups();
        
        var matchupArray = [];

        matchups.array.forEach(matchup => {
            //pick apart matchup JSON and map it to the matchupObject

            var matchupObject = {
                "home": {
                    "name": null,
                    "points": null
                },
                "away": {
                    "name": null,
                    "points": null
                }
            };

            matchupArray.push(matchupObject);
        });
    }
}