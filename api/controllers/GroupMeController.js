const GroupMeService = require('../services/GroupMeService');
const SleeperService = require('../services/SleeperService.js');
const GroupMeAdapter = require('../adapters/GroupMeAdapter.js');
const SleeperAdapter = require('../adapters/SleeperAdapter.js');

var groupMeService, sleeperService, groupMeAdapter, sleeperAdapter;

class GroupMeController {
    constructor() {
        sleeperAdapter = new SleeperAdapter();
        sleeperService = new SleeperService(sleeperAdapter);
        groupMeAdapter = new GroupMeAdapter();
        groupMeService = new GroupMeService(sleeperService, groupMeAdapter);
    };

    callbackStream = (req, res) => {
        groupMeService.handleCallback(req, res);
    }
};

module.exports = GroupMeController;