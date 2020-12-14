const groupMeService = {
    "invoked": (req) => invoked(req),
}

function invoked(req) {
    var request = JSON.parse(req.chunks[0]);
    var botRegex = /(?i)sleeperbot/;

    return req.text && botRegex.test(request.text);
};

module.exports = groupMeService;