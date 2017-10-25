const $ = require('jquery');
//Model
function init() {
    return {
        lookingAt: 'SecurityRoom',
        monsterLocation: 'Lounge',
        interactables: {
            fan: 'on', // 'off' // 'powering down',
            studyDoor: 'closed', // 'open' // 'shaking',
            loungeDoor: 'closed', // 'open' // 'shaking',
            safetyDoor: 'closed' // 'open' // 'shaking'
        }
    };
}
//Viewable Cameras
Cameras = [
    'Vent Camera',
    'studyRoom Camera',
    'loungeRoom Camera',
    'safetyDoor Camera'
];

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
