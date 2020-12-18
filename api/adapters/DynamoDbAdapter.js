const AWS = require("aws-sdk");

AWS.config.update({region: 'us-east-2'});
let docClient = new AWS.DynamoDB.DocumentClient();

module.exports = class DynamoDbAdapter {
    constructor() {}

    updateTable = (params) => {
        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("PutItem succeeded.");
            }
        });
    }

    getItemFromTable = (params) => {
        docClient.get(params, function(err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("GetItem succeeded.");
                return data;
            }
        });
    }
}
