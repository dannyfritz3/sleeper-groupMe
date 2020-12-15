const LambdaService = require('../services/LambdaService.js');

var lambdaService;

class LambdaController {
    constructor() {
        lambdaService = new LambdaService();
    };
    broadcastTopScorerEvent = () => {
        lambdaService.broadcastTopScorerEvent();
    }

    broadcastMatchupLeadersEvent = () => {
        lambdaService.broadcastMatchupLeadersEvent();
    }
};

module.exports = LambdaController