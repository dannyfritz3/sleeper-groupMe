//var events = require('events');
//var eventEmitter = new events.EventEmitter();
const natural = require('natural');

var _sleeperService, _groupMeAdapter;

class GroupMeService {
    constructor(sleeperService, groupMeAdapter) {
        _sleeperService = sleeperService;
        _groupMeAdapter = groupMeAdapter;
    };

    //TODO change all of this stuff to publish/subscribe architecture
    //TODO add model for jsonMessage coming in from GroupMe
    handleCallback = async (req, res) => {
        var jsonMessage = JSON.parse(JSON.stringify(req.body));
        var isValidSender = jsonMessage.name != "Sleeper Bot";

        if(isValidSender && this.botInvoked(jsonMessage.text)) {
            _groupMeAdapter.postMessage("i can't take arguments yet :( coming soon...");
        }
    }
    
    botInvoked = (messageText) => {
        var botRegex = /@sleeperbot/i;
        return botRegex.test(messageText);
    }

    parseMessage = (jsonMessage) => {
        const tokenizer = new natural.WordTokenizer();
        var tokenArray = tokenizer.tokenize(jsonMessage.text);
    }
};

module.exports = GroupMeService;