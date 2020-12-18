const SleeperService = require('./api/services/SleeperService.js');
const GroupMeService = require('./api/services/GroupMeService.js');
const GroupMeAdapter = require('./api/adapters/GroupMeAdapter.js');
const SleeperAdapter = require('./api/adapters/SleeperAdapter.js');
const DynamoDbAdapter = require('./api/adapters/DynamoDbAdapter');
const AwsService = require('./api/services/AwsService.js');
const InjuryService = require('./api/services/InjuryService.js');
const MatchupService = require('./api/services/MatchupService.js');
const config = require('./config.json');

module.exports = (server) => {
    var _sleeperAdapter = new SleeperAdapter();
    var _groupMeAdapter = new GroupMeAdapter();
    let _dynamoDbAdapter = new DynamoDbAdapter();
    let _awsService = new AwsService(_sleeperAdapter, _dynamoDbAdapter);
    var _sleeperService = new SleeperService(_sleeperAdapter);
    var _injuryService = new InjuryService(_groupMeAdapter);
    var _matchupsService = new MatchupService(_sleeperService, _groupMeAdapter, config);
    var _groupMeService = new GroupMeService(_matchupsService, _injuryService, _groupMeAdapter);

    server.get(`/`, async (req, res) => {
        res.send(200);
    });

    server.post(`/groupme/callbackstream`, async (req, res) => {
        try
        {
            _groupMeService.handleCallback(req, res);
            res.send(200);
        } catch(error)
        {
            console.log(error);
            res.send(500);
        }
    });

    server.get('/broadcast/topScorer', async (req, res) => {
        try
        {
            //TODO need to actually create service function for this
            await _groupMeAdapter.postMessage("cron job works");
            res.send(200);
        } catch(error)
        {
            console.log(error);
            res.send(500);
        }
    });

    server.get('/broadcast/matchupLeaders', async (req, res) => {
        try
        {
            await _matchupsService.postMatchupsUpdate();
            res.send(200);
        } catch(error)
        {
            console.log(error);
            res.send(500);
        }
    });

    server.get('/broadcast/injuryreport', async (req, res) => {
        try
        {
            await _injuryService.postInjuryReport();
            res.send(200);
        } catch (error) {
            console.log(error);
            res.send(500);
        }
    });

    server.get('/aws/updateplayerdb', async (req, res) => {
        try
        {
            await _awsService.updatePlayersTable();
            res.send(200);   
        } catch (error) {
            console.log(error);
            res.send(500);
        }
    });
};