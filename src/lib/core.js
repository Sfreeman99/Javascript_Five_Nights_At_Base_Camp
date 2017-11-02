const $ = require('jquery');
//Model
function init() {
    return {
        Time: 1,
        Power: 100,
        lookingAt: null, // null is used to show the outside view
        monsterLocation: 'hallway',
        interactables: {
            safetyDoorTwo: 'open', // 'open' // 'shaking',
            safetyDoorOne: 'open' // 'open' // 'shaking'
        }
    };
}
//Viewable Cameras
function Cameras() {
    return [
        'classroom',
        'office',
        'hallway',
        'bathroom',
        'safetyDoorOne',
        'safetyDoorTwo'
    ];
}
function Doors() {
    return ['SD1', 'SD2'];
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
        },
        safetyDoorOne: {
            open: '../../assets/fnabc/Home.jpeg',
            closed: '../../assets/fnabc/safetyroompics/Closed_SD1.jpeg',
            monsterInDoor:
                '../../assets/fnabc/safetyroompics/Monster_at_SD1.jpeg'
        },
        safetyDoorTwo: {
            open: '../../assets/fnabc/safetyroompics/Open_SD2.jpeg',
            closed: '../../assets/fnabc/safetyroompics/Closed_SD2.jpeg',
            monsterInDoor:
                '../../assets/fnabc/safetyroompics/Monster_at_SD2.jpeg'
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
exports.Doors = Doors;
