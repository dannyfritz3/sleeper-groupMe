const axios = require('axios');
const groupMeApiBaseUrl = "https://api.groupme.com/v3/bots/post";
const botId = "3e0d38ea2f9b5faf166587dcd9";
const testBotId = "7645b38769f3684a49319a64ee";

module.exports = class GroupMeAdapter {
    constructor() {};

    postMessage = async (message) => {
        console.log("Posting Message: " + message);
        const url = `${groupMeApiBaseUrl}`
        var response = await axios.post(url, {"text": message, "bot_id": testBotId});
        return response;
    };
};