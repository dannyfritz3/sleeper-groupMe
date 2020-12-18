let _sleeperAdapter, _dynamoDbAdapter;

module.exports = class AwsService {
    constructor(sleeperAdapter, dynamoDbAdapter) {
        _sleeperAdapter = sleeperAdapter;
        _dynamoDbAdapter = dynamoDbAdapter;
    }

    updatePlayersTable = async () => {
        let playerData = await _sleeperAdapter.getPlayersData();
        await _dynamoDbAdapter.updateTable('Playerss', playerData);
    }
}