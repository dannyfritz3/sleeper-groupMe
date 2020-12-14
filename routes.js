const PingController = require('./api/controllers/PingController.js');
const GroupMeController = require('./api/controllers/GroupMeController.js');

var pingController = new PingController();
var groupMeController = new GroupMeController();

module.exports = (server) => {

    server.get(`/`, (req, res) => {
        pingController.ping(res);
    });

    server.post(`/groupme/callbackstream`, async (req, res) => {
        console.log("GROUPME: " + JSON.parse(this.req.chunks[0]));
        groupMeController.callbackStream(req, res);
    });
};