const SleeperService = require('../adapters/SleeperService.js');
const GroupMeService = require('../services/GroupMeService.js');

var sleeperService, groupMeService;

module.exports = class LambdaService {
    constructor() {
        sleeperService = new SleeperService();
        groupMeService = new GroupMeService();
    };

    broadcastTopScorerEvent = () => {
        
    }

    broadcastMatchupLeadersEvent = () => {

    }
}