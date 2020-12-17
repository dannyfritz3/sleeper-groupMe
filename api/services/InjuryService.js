const Parser = require('rss-parser');
let parser = new Parser();

var _groupMeService;

class InjuryService {
    constructor (groupMeService) {
        //this will need to be fixed with the new framework. No more dependency injection here.
        _groupMeService = groupMeService;
    }

    getInjuryReport = async () => {
        let injuryReport = await this.getRotowireFeed();
        //need to write a function that takes the rotowire feed and builds a message to be posted out
        return injuryReport;
    }

    postInjurtReport = async (injuryReport) => {
        let message = buildMessage(injuryReport);
        _groupMeService.postMessage(message);
    };

    getRotowireFeed = async () => {
        let rssFeed = await parser.parseURL('https://www.rotowire.com/rss/news.php?sport=NFL');
        return rssFeed.items;
    }

    buildMessage = () => {

    }

}

module.exports = InjuryService;