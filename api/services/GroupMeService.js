//var events = require('events');
//var eventEmitter = new events.EventEmitter();
const GroupMeAdapter = require('../adapters/GroupMeAdapter.js');

var groupMeAdapter;

class GroupMeService {
    constructor() {
        groupMeAdapter = new GroupMeAdapter();
    };

    handleCallback(jsonMessage) {
        if(this.invoked(jsonMessage.text)){
            this.postMessage("testing works ;)");
        } else {
            res.sendStatus(200);
        };
    }
    
    invoked (messageText) {
        try {        
            var botRegex = /(?i)@sleeperbot/;
            return messageText && botRegex.test(messageText);
        } catch(error) {
            return false;
        };
    }

    parseMessage (message) {
        console.log(message);
    }

    postMessage (message) {
        groupMeAdapter.postMessage(message);
    }
};

module.exports = GroupMeService;