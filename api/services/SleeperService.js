const SleeperAdapter = require('../adapters/SleeperAdapter.js');

var sleeperAdapter;

module.exports = class SleeperService {
    constructor() {
        sleeperAdapter = new SleeperAdapter();
    };
}