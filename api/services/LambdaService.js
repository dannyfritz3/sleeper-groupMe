var _sleeperService, _groupMeService;

module.exports = class LambdaService {
    constructor(sleeperService, groupMeService) {
        _sleeperService = sleeperService;
        _groupMeService = groupMeService;
    };

    broadcastTopScorerEvent = () => {
        _groupMeService.postMessage("cron job works");
    }

    broadcastMatchupLeadersEvent = () => {
        var matchups = _sleeperService.getCurrentMatchups();
        
        var matchupArray = [];

        matchups.array.forEach((matchup, index) => {
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