const AWS = require("aws-sdk");

AWS.config.update({region: 'us-east-2'});
let docClient = new AWS.DynamoDB.DocumentClient();

module.exports = class DynamoDbAdapter {
    constructor() {}

    updateTable = async (tableName, items) => {

    }
}