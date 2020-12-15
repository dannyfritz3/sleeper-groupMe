const GroupMeService = require('../services/GroupMeService');

var groupMeService;

class GroupMeController {
    constructor(){
        groupMeService = new GroupMeService();
    };

    callbackStream = (req, res) => {
        groupMeService.handleCallback(req, res);
    }
};

module.exports = GroupMeController;