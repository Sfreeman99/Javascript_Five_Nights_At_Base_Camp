const $ = require('jquery');
//Model
function init() {
    return {
        Time: 1,
        Power: 100,
        lookingAt: 'classroom Camera',
        monsterLocation: 'hallway',
        interactables: {
            safetyDoorTwo: 'closed', // 'open' // 'shaking',
            safetyDoorOne: 'closed' // 'open' // 'shaking'
        }
    };
}
//Viewable Cameras
function Cameras() {
    return ['classroom', 'office', 'hallway', 'bathroom'];
}
function SceneChange() {
    return {
        Room: {
            hallway: '../../assets/fnabc/Hallway.jpeg',
            bathroom: '../../assets/fnabc/Bathroom.jpeg',
            office: '../../assets/fnabc/Office.jpeg',
            classroom: '' // havent taken
        },
        MonsterInRoom: {
            hallway: '../../assets/fnabc/Hallway_with_monster.jpeg',
            bathroom: '../../assets/fnabc/Bathroom_with_Monster.jpeg',
            office:
                '../../assets/fnabc/D6846834-B60A-4E1C-99C6-1721759BF537.jpeg',
            classroom: '' //hasnt been taken
        }
    };
}

function lookingAt(State, viewLocation) {
    State.lookingAt = viewLocation;
}
function interact(State, interactable, newState) {
    State.interactables[interactable] = newState;
}
function monsterMove(State, newLocation) {
    State.monsterLocation = newLocation;
}

exports.init = init;
exports.lookingAt = lookingAt;
exports.monsterMove = monsterMove;
exports.interact = interact;
exports.Cameras = Cameras;
exports.SceneChange = SceneChange;
