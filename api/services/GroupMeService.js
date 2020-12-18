//var events = require('events');
//var eventEmitter = new events.EventEmitter();
const natural = require('natural');

var _matchupsService, _injuryService, _groupMeAdapter;

class GroupMeService {
    constructor(matchupsService, injuryService, groupMeAdapter) {
        _matchupsService = matchupsService;
        _injuryService = injuryService;
        _groupMeAdapter = groupMeAdapter;
    };

    //TODO change all of this stuff to publish/subscribe architecture
    //TODO add model for jsonMessage coming in from GroupMe
    handleCallback = async (req, res) => {
        var jsonMessage = JSON.parse(JSON.stringify(req.body));
        var isValidSender = jsonMessage.name != "Sleeper Bot";

        if(isValidSender && this.botInvoked(jsonMessage.text)) {
            this.parseMessage(jsonMessage);
        }
    }
    
    botInvoked = (messageText) => {
        var botRegex = /@sleeperbot/i;
        return botRegex.test(messageText);
    }

    parseMessage = (jsonMessage) => {
        const tokenizer = new natural.WordTokenizer();
        let tokenArray = tokenizer.tokenize(jsonMessage.text);
        let argument = tokenArray[1];
        let argumentsArray = ["help", "standings", "injuries", "matchups", "waivers"]
        if(argumentsArray.includes(argument)) {
            this.argumentsHandler(argument);
        } else {
            _groupMeAdapter.postMessage("i'm sorry, i don't know what that means");
        }
    }

    argumentsHandler = async (argument) => {
        let arg = argument.toLowerCase();
        switch(arg) {
            case "help":
                await _groupMeAdapter.postMessage("how to use sleeperbot :)\n\n\"@sleeperbot {arggument}\"\n\nwhere argument can be:\n\n\"help\"\n\"injuries\"\n\"matchups\"");
                break;
            case "standings":
                await _groupMeAdapter.postMessage("sorry, can't do standings yet...");
                break;
            case "injuries":
                await _injuryService.postInjuryReport();
                break;
            case "matchups":
                await _matchupsService.postMatchupsUpdate();
                break;
            case "waivers":

                break;
            default:
                //
        }
    }
};

module.exports = GroupMeService;