const PingController = require('./api/controllers/PingController.js');
const GroupMeController = require('./api/controllers/GroupMeController.js');

var pingController = new PingController();
var groupMeController = new GroupMeController();

module.exports = (server) => {

    server.get(`/`, (req, res) => {
        pingController.ping(res);
    });

    server.post(`/groupme/callbackstream`, async (req, res) => {
        console.log("GROUPME: " + req.body);
        groupMeController.callbackStream(req, res);
    });
};