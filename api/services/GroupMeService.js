//var events = require('events');
//var eventEmitter = new events.EventEmitter();
const GroupMeAdapter = require('../adapters/GroupMeAdapter.js');

var groupMeAdapter;

class GroupMeService {
    constructor() {
        groupMeAdapter = new GroupMeAdapter();
    };

    handleCallback(req, res) {
        if(this.invoked(req)){
            this.postMessage("testing");
        } else {
            res.sendStatus(200);
        };
    }
    
    invoked (req) {
        try {        
            //var request = JSON.parse(req.chunks[0]);
            console.log("MESSAGE RECEIVED FROM GROUPME: " + req.body);
            var botRegex = /(?i)@sleeperbot/;
            return req.text && botRegex.test(request.text);
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