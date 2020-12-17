var _matchupService, _groupMeAdapter;

module.exports = class LambdaService {
    constructor(matchupService, groupMeAdapter) {
        _matchupService = matchupService;
        _groupMeAdapter = groupMeAdapter;
    };

    broadcastTopScorerEvent = () => {
        _groupMeAdapter.postMessage("cron job works");
    }

    broadcastMatchupLeadersEvent = async () => {
        let message = await _matchupService.getMatchupsMessage();
        _groupMeAdapter.postMessage(message);
    }
}