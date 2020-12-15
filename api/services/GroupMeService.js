//var events = require('events');
//var eventEmitter = new events.EventEmitter();
const GroupMeAdapter = require('../adapters/GroupMeAdapter.js');
const SleeperService = require('./SleeperService.js')
const natural = require('natural');

var groupMeAdapter, sleeperService;

class GroupMeService {
    constructor() {
        groupMeAdapter = new GroupMeAdapter();
        sleeperService = new SleeperService();
    };

    //TODO change all of this stuff to publish/subscribe architecture
    //TODO add model for jsonMessage coming in from GroupMe
    handleCallback = async (req, res) => {
        var jsonMessage = JSON.parse(JSON.stringify(req.body));
        var isValidSender = jsonMessage.name != "Sleeper Bot";
        if(isValidSender && this.botInvoked(jsonMessage.text)) {
            this.parseMessage(jsonMessage);
            this.postMessage(jsonMessage.text);
        }
        else {
            //This is for testing
            console.log(await sleeperService.getRosterByUserId("579368014944706560"));
        };
    }
    
    botInvoked = (messageText) => {
        var botRegex = /@sleeperbot/i;
        return botRegex.test(messageText);
    }

    parseMessage = (jsonMessage) => {
        const tokenizer = new natural.WordTokenizer();
        var tokenArray = tokenizer.tokenize(jsonMessage.text);
    }

    postMessage = (message) => {
        groupMeAdapter.postMessage(message);
    }
};

module.exports = GroupMeService;