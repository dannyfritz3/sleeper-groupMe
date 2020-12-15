//var events = require('events');
//var eventEmitter = new events.EventEmitter();
const GroupMeAdapter = require('../adapters/GroupMeAdapter.js');

var groupMeAdapter;

class GroupMeService {
    constructor() {
        groupMeAdapter = new GroupMeAdapter();
    };

    handleCallback(req, res) {
        var jsonMessage = JSON.parse(JSON.stringify(req.body));
        console.log("GroupMe message received: " + jsonMessage);
        console.log("GroupMe Text: " + jsonMessage.text)
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