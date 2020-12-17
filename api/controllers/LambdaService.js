var _matchupService, _groupMeService;

module.exports = class LambdaService {
    constructor(matchupService, groupMeService) {
        _matchupService = matchupService;
        _groupMeService = groupMeService;
    };

    broadcastTopScorerEvent = () => {
        _groupMeService.postMessage("cron job works");
    }

    broadcastMatchupLeadersEvent = async () => {
        let message = await _matchupService.getMatchupsMessage();
        _groupMeService.postMessage(message);
    }
}