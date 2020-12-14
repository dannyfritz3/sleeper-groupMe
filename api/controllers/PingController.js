class PingController {
    constructor(){};
    ping(res) {
        res.sendStatus(200);
    };
};

module.exports = PingController