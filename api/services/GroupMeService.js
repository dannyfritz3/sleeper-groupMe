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
        postMessage(jsonMessage.text);
    }
    
    invoked (messageText) {
        try {        
            var botRegex = /(?i)@sleeperbot/;
            var test = messageText && botRegex.test(messageText);
            console.log("RegEx Test: " + test);
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