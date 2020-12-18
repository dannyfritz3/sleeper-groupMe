const PingService = require('./api/services/PingService.js');
const SleeperService = require('./api/services/SleeperService.js');
const GroupMeService = require('./api/services/GroupMeService.js');
const GroupMeAdapter = require('./api/adapters/GroupMeAdapter.js');
const SleeperAdapter = require('./api/adapters/SleeperAdapter.js');
const InjuryService = require('./api/services/InjuryService.js');
const MatchupService = require('./api/services/MatchupService.js');
const config = require('./config.json');

module.exports = (server) => {
    var _sleeperAdapter = new SleeperAdapter();
    var _groupMeAdapter = new GroupMeAdapter();
    var _pingService = new PingService();
    var _sleeperService = new SleeperService(_sleeperAdapter);
    var _injuryService = new InjuryService(_groupMeAdapter);
    var _matchupsService = new MatchupService(_sleeperService, _groupMeAdapter, config);
    var _groupMeService = new GroupMeService(_matchupsService, _injuryService, _groupMeAdapter);

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
            //TODO need to actually create service function for this
            var result = await _groupMeAdapter.postMessage("cron job works");
            res.send(result);
        } catch(error)
        {
            console.log(error);
        }
    });

    server.get('/broadcast/matchupLeaders', async (req, res) => {
        try
        {
            var result = await _matchupsService.postMatchupsUpdate();
            res.send(result);
        } catch(error)
        {
            console.log(error);
        }
    });

    server.get('/broadcast/injuryreport', async (req, res) => {
        try
        {
            var result = await _injuryService.postInjuryReport();
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    });
};