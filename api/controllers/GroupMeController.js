const GroupMeService = require('../services/groupMeService');

var groupMeService;

class GroupMeController {
    constructor(){
        groupMeService = new GroupMeService();
    };

    callbackStream(req, res) {
        groupMeService.handleCallback(req, res);
    }
};

module.exports = GroupMeController;