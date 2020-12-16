var _sleeperService, _groupMeService, _config;

module.exports = class LambdaService {
    constructor(sleeperService, groupMeService, config) {
        _sleeperService = sleeperService;
        _groupMeService = groupMeService;
        _config = config;
    };

    broadcastTopScorerEvent = () => {
        _groupMeService.postMessage("cron job works");
    }

    broadcastMatchupLeadersEvent = async () => {
        var matchupsData = await _sleeperService.getCurrentMatchups();
        
        var formattedMatchupArray = [];

        for(var i = 1; i <= 5; i++)
        {
            var matchup = matchupsData.filter(matchup => matchup.matchup_id == i);
            
            var test = _config.usermappings.find(user => user.roster_id == matchup[0].roster_id);

            var formattedMatchup = {
                "home": {
                    "name": this.getGroupMeNameByRosterId(matchup[0].roster_id),
                    "points": matchup[0].points
                },
                "away": {
                    "name":this.getGroupMeNameByRosterId(matchup[1].roster_id),
                    "points": matchup[1].points
                }
            };
            
            formattedMatchupArray.push(formattedMatchup);
        }

        return formattedMatchupArray;
    }

    getGroupMeNameByRosterId = (rosterId) => {
        var user = _config.usermappings.find(user => user.roster_id == rosterId);
        return user.groupme_name;
    };
}