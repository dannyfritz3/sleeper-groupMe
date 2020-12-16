const LambdaService = require('../services/LambdaService.js');
const SleeperService = require('../services/SleeperService.js');
const GroupMeService = require('../services/GroupMeService.js');
const GroupMeAdapter = require('../adapters/GroupMeAdapter.js');
const SleeperAdapter = require('../adapters/SleeperAdapter.js');

var lambdaService, sleeperService, groupMeService, sleeperAdapter, groupMeAdapter;;

class LambdaController {
    constructor() {
        sleeperAdapter = new SleeperAdapter();
        groupMeAdapter = new GroupMeAdapter();
        sleeperService = new SleeperService(sleeperAdapter);
        groupMeService = new GroupMeService(sleeperService, groupMeAdapter);
        lambdaService = new LambdaService(sleeperService, groupMeService);
    };
    broadcastTopScorerEvent = () => {
        lambdaService.broadcastTopScorerEvent();
    }

    broadcastMatchupLeadersEvent = () => {
        lambdaService.broadcastMatchupLeadersEvent();
    }
};

module.exports = LambdaController