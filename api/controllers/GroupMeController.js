const GroupMeService = require('../services/GroupMeService');

var groupMeService;

class GroupMeController {
    constructor(){
        groupMeService = new GroupMeService();
    };

    callbackStream(req) {
        var jsonMessage = JSON.stringify(req.body);
        groupMeService.handleCallback(jsonMessage);
    }
};

module.exports = GroupMeController;