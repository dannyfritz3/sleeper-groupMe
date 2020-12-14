const PingController = require('./api/controllers/PingController.js');
const GroupMeController = require('./api/controllers/GroupMeController.js');

var pingController = new PingController();
var groupMeController = new GroupMeController();

module.exports = (server) => {

    server.get(`/`, (req, res) => {
        pingController.ping(res);
    });

    server.post(`/groupme/callbackstream`, async (req, res) => {
        console.log("GROUPME (req.body.text): " + req.body.text);
        console.log("GROUPME (req.body): " + req.body);
        console.log("GROUPME (JSON.stringify(req.body)): " + JSON.stringify(req.body));

        try{
            var test = JSON.stringify(req.body);
            console.log("GROUPME (JSON.stringify): " + test);
        } catch(error)
        {
            console.log(error);
        }
        groupMeController.callbackStream(req, res);
    });
};