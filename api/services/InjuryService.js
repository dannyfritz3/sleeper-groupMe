const Parser = require('rss-parser');
let parser = new Parser();

var _groupMeAdapter;

class InjuryService {
    constructor (groupMeAdapter) {
        _groupMeAdapter = groupMeAdapter;
    }

    postInjuryReport = async () => {
        let injuryReport = await this.getInjuryReportFromRotowireFeed();
        let message = this.buildInjuryReportMessage(injuryReport);
        _groupMeAdapter.postMessage(message);
    }

    getInjuryReportFromRotowireFeed = async () => {
        let rssFeed = await parser.parseURL('https://www.rotowire.com/rss/news.php?sport=NFL');
        return rssFeed.items;
    }

    buildInjuryReportMessage = (injuryReport) => {
        let message = "INJURY REPORT:\n\n";

        injuryReport.forEach(reportTitle => {
            message += `${reportTitle.title}\n\n`
        });

        return message;
    }

}

module.exports = InjuryService;