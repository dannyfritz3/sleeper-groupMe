const PingController = require('./api/controllers/PingController.js');
const GroupMeController = require('./api/controllers/GroupMeController.js');
const LambdaController = require('./api/controllers/LambdaController.js');

var pingController = new PingController();
var groupMeController = new GroupMeController();
var lambdaController = new LambdaController();

module.exports = (server) => {

    server.get(`/`, (req, res) => {
        pingController.ping(res);
    });

    server.post(`/groupme/callbackstream`, async (req, res) => {
        groupMeController.callbackStream(req, res);
    });

    server.get('/broadcast/topScorer', async (req, res) => {
        lambdaController.broadcastTopScorerEvent(req, res);
    });

    server.get('/broadcast/matchupLeaders', async (req, res) => {
        lambdaController.broadcastMatchupLeadersEvent(req, res);
    });
};