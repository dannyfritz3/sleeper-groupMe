let _sleeperAdapter, _dynamoDbAdapter;

module.exports = class AwsService {
    constructor(sleeperAdapter, dynamoDbAdapter) {
        _sleeperAdapter = sleeperAdapter;
        _dynamoDbAdapter = dynamoDbAdapter;
    }

    updatePlayersTable = async () => {
        let playerData = await _sleeperAdapter.getPlayersData();
        for(let playerId in playerData) {
            let player = playerData[playerId];
            var params = {
                TableName: "Players",
                Item: {
                    "player_id": player.player_id,
                    "position":  player.position,
                    "number": player.number,
                    "team": player.team,
                    "full_name": player.full_name,
                    "birth_date": player.birth_date,
                    "active": player.active,
                    "status":  player.status,
                    "injury_status": player.injury_status,
                    "injury_start_date": player.injury_start_date,
                    "injury_notes": player.injury_notes,
                    "injury_body_part": player.injury_body_part,
                    "espn_id": player.espn_id,
                    "rotowire_id": player.rotowire_id,
                    "rotoworld_id": player.rotoworld_id
                }
            };
            _dynamoDbAdapter.updateTable(params);
        }
    }

    getPlayerById = (playerId) => {
        let params = {
            TableName: "Players",
            Key: {
                "player_id": playerId
            }
        };
        return _dynamoDbAdapter.getItemFromTable(params);
    }
}