let _sleeperService, _groupMeAdapter, _config;

class MatchupService {
    constructor (sleeperService, groupMeAdapter, config) { 
        _sleeperService = sleeperService;
        _groupMeAdapter = groupMeAdapter;
        _config = config;
    }

    postMatchupsUpdate = async () => {
        let matchups = await this.getMatchups();
        let message = this.buildMatchupMessage(matchups);
        _groupMeAdapter.postMessage(message);
    }

    getMatchups = async () => {
        var matchupsData = await _sleeperService.getCurrentMatchups();
        
        if(matchupsData) {
            var formattedMatchupArray = [];

            for(var i = 1; i <= 5; i++) {
                var matchup = matchupsData.filter(matchup => matchup.matchup_id == i);
                
                if(matchup) {    
                    var formattedMatchup = {
                        "home": {
                            "team_name": await this.getTeamNameByRosterId(matchup[0].roster_id),
                            "points": matchup[0].points
                        },
                        "away": {
                            "team_name": await this.getTeamNameByRosterId(matchup[1].roster_id),
                            "points": matchup[1].points
                        }
                    };
                    
                    formattedMatchupArray.push(formattedMatchup);
                }
            }
    
            return formattedMatchupArray;
        }
    }

    getTeamNameByRosterId = async (rosterId) => {
        let user = _config.usermappings.find(user => user.roster_id == rosterId);
        let ownerId = user.owner_id;
        let teamName = await _sleeperService.getTeamNameByOwnerId(ownerId);
        return teamName;
    }

    buildMatchupMessage = (matchups) => {
        let message = "MATCHUP UPDATE:\n\n";

        matchups.forEach(matchup => {
            message += `${matchup.home.team_name}: ${matchup.home.points}\n${matchup.away.team_name}: ${matchup.away.points}\n\n`;
        });

        return message;
    }
}

module.exports = MatchupService;