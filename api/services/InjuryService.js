const Parser = require('rss-parser');
let parser = new Parser();

var _groupMeService;

class InjuryService {
    constructor (groupMeService) {
        //this will need to be fixed with the new framework. No more dependency injection here.
        _groupMeService = groupMeService;
    }

    postInjuryReport = async () => {
        let injuryReport = await this.getInjuryReportFromRotowireFeed();
        let message = this.buildInjuryReportMessage(injuryReport);
        _groupMeService.postMessage(message);
    }

    getInjuryReportFromRotowireFeed = async () => {
        let rssFeed = await parser.parseURL('https://www.rotowire.com/rss/news.php?sport=NFL');
        return rssFeed.items;
    }

    buildInjuryReportMessage = (injuryReport) => {
        let message = "Injury Report:\n\n";

        injuryReport.forEach(reportTitle => {
            message += `${reportTitle.title}\n`
        });

        return message;
    }

}

module.exports = InjuryService;