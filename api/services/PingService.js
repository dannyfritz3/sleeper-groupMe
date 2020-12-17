class PingService {
    constructor(){};
    ping = (res) => {
        res.sendStatus(200);
    };
};

module.exports = PingService;