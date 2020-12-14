//var events = require('events');
//var eventEmitter = new events.EventEmitter();

module.exports = class GroupMeService {
    constructor() {};

    handleCallback(req, res) {
        if(this.invoked(req)){
            this.parseMessage(req.text)
            res.sendStatus(202)
        } else {
            res.sendStatus(200);
        };
    }
    
    invoked (req) {
        try {        
            var request = JSON.parse(req.chunks[0]);
            var botRegex = /(?i)sleeperbot/;
            return req.text && botRegex.test(request.text);
        } catch(error) {
            return false;
        };
    }

    parseMessage (message) {
        console.log(message);
    }
};