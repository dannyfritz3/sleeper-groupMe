const PingService = require('./api/controllers/PingService.js');
const LambdaService = require('./api/controllers/LambdaService.js');
const SleeperService = require('./api/controllers/SleeperService.js');
const GroupMeService = require('./api/controllers/GroupMeService.js');
const GroupMeAdapter = require('./api/adapters/GroupMeAdapter.js');
const SleeperAdapter = require('./api/adapters/SleeperAdapter.js');
const InjuryService = require('./api/services/InjuryService.js');
const config = require('./config.json');

module.exports = (server) => {
    var _sleeperAdapter = new SleeperAdapter();
    var _groupMeAdapter = new GroupMeAdapter();
    var _pingService = new PingService();
    var _sleeperService = new SleeperService(_sleeperAdapter);
    var _groupMeService = new GroupMeService(_sleeperService, _groupMeAdapter);
    var _lambdaService = new LambdaService(_sleeperService, _groupMeService, config);
    var _injuryService = new InjuryService(_groupMeService);

    server.get(`/`, async (req, res) => {
        _pingService.ping(res);
    });

    server.post(`/groupme/callbackstream`, async (req, res) => {
        try
        {
            _groupMeService.handleCallback(req, res);
        } catch(error)
        {
            console.log(error);
        }
    });

    server.get('/broadcast/topScorer', async (req, res) => {
        try
        {
            var result = await _lambdaService.broadcastTopScorerEvent(req, res);
            res.send(result);
        } catch(error)
        {
            console.log(error);
        }
    });

    server.get('/broadcast/matchupLeaders', async (req, res) => {
        try
        {
            var result = await _lambdaService.broadcastMatchupLeadersEvent();
            res.send(result);
        } catch(error)
        {
            console.log(error);
        }
    });

    server.get('/broadcast/injuryreport', async (req, res) => {
        try
        {
            var result = await _injuryService.postInjurtReport();
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    });
};