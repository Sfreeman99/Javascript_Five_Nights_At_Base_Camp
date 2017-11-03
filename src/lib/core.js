const $ = require('jquery');
//Model
function init(mmt) {
    return {
        monsterMoveTime: mmt,
        restarted: false,
        GameOver: false,
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
            hallway: '../../assets/fnabc/Hallway.jpg',
            bathroom: '../../assets/fnabc/bathroom.jpg',
            office: '../../assets/fnabc/office.jpg',
            classroom: '' // havent taken
        },
        MonsterInRoom: {
            hallway: [
                '../../assets/fnabc/Hallway_with_monster_ in_door.jpg',
                '../../assets/fnabc/Hallway_with_monster_on_stairs.jpg'
            ],
            bathroom: '../../assets/fnabc/Bathroom_with_monster.jpg',
            office: '../../assets/fnabc/Office_with_monster.jpg',
            classroom: [
                '../../assets/fnabc/Classroom_with_monster.jpg',
                '../../assets/fnabc/Classroom_with_monster_behind_student.jpg'
            ] //hasnt been taken
        },
        safetyDoorOne: {
            open: '../../assets/fnabc/SD1_open.jpg',
            closed: '../../assets/fnabc/SD1_closed.jpg',
            monsterInDoor: '../../assets/fnabc/SD1_with_monster.jpg'
        },
        safetyDoorTwo: {
            open: '../../assets/fnabc/SD2_open.jpg',
            closed: '../../assets/fnabc/SD2_closed.jpg',
            monsterInDoor: '../../assets/fnabc/SD2_with_monster.jpg'
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
