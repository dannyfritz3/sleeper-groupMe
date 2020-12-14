const GroupMeService = require('../services/GroupMeService.js');

var groupMeService;

module.exports = class GroupMeController {
    constructor(){
        groupMeService = new GroupMeService();
    };

    callbackStream(req, res) {
        groupMeService.handleCallback(req, res);
    }
};