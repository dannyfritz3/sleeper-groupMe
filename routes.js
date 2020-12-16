const PingService = require('./api/controllers/PingService.js');
const LambdaService = require('./api/controllers/LambdaService.js');
const SleeperService = require('./api/controllers/SleeperService.js');
const GroupMeService = require('./api/controllers/GroupMeService.js');
const GroupMeAdapter = require('./api/adapters/GroupMeAdapter.js');
const SleeperAdapter = require('./api/adapters/SleeperAdapter.js');
const config = require('./config.json');

module.exports = (server) => {
    var _sleeperAdapter = new SleeperAdapter();
    var _groupMeAdapter = new GroupMeAdapter();
    var _pingService = new PingService();
    var _sleeperService = new SleeperService(_sleeperAdapter);
    var _groupMeService = new GroupMeService(_sleeperService, _groupMeAdapter);
    var _lambdaService = new LambdaService(_sleeperService, _groupMeService, config);

    server.get(`/`, async (req, res) => {
        try
        {
            //_pingService.ping(res);
            res.send(await _lambdaService.broadcastMatchupLeadersEvent());
        } catch(error)
        {
            console.log(error);
        }
    });

    server.post(`/groupme/callbackstream`, async (req, res) => {
        try
        {
            _groupMeService.callbackStream(req, res);
        } catch(error)
        {
            console.log(error);
        }
    });

    server.get('/broadcast/topScorer', async (req, res) => {
        try
        {
            _lambdaService.broadcastTopScorerEvent(req, res);
        } catch(error)
        {
            console.log(error);
        }
    });

    server.get('/broadcast/matchupLeaders', async (req, res) => {
        try
        {
            _lambdaService.broadcastMatchupLeadersEvent();
        } catch(error)
        {
            console.log(error);
        }
    });
};