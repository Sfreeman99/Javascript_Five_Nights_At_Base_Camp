const core = require('./core');

describe('Player', function() {
    test('to be looking in a room', function() {
        var state = core.init();
        core.lookingAt(state, 'room');
        expect(state.lookingAt).toEqual('room');
    });
    test('to be looking in the lounge', function() {
        var state = core.init();
        core.lookingAt(state, 'loungeRoom Camera');
        expect(state.lookingAt).toEqual('loungeRoom Camera');
    });
    test('to be looking in the study', function() {
        var state = core.init();
        core.lookingAt(state, 'studyRoom Camera');
        expect(state.lookingAt).toEqual('studyRoom Camera');
    });
    test('to be looking in the vent', function() {
        var state = core.init();
        core.lookingAt(state, 'Vent Camera');
        expect(state.lookingAt).toEqual('Vent Camera');
    });
});
describe('Monster', function() {
    test('moves to study', function() {
        var state = core.init();
        core.monsterMove(state, 'study');
        expect(state.monsterLocation).toEqual('study');
    });
    test('moves to Vent', function() {
        var state = core.init();
        core.monsterMove(state, 'vent');
        expect(state.monsterLocation).toEqual('vent');
    });
    test('moves to study then vent', function() {
        var state = core.init();
        core.monsterMove(state, 'study');
        expect(state.monsterLocation).toEqual('study');
        core.monsterMove(state, 'vent');
        expect(state.monsterLocation).toEqual('vent');
    });
});
describe('Interactable', function() {
    test('fan can be turned off', function() {
        var state = core.init();
        core.interact(state, 'fan', 'off');
        expect(state.interactables['fan']).toEqual('off');
    });
    test('lounge door can be opened', function() {
        var state = core.init();
        core.interact(state, 'loungeDoor', 'open');
        expect(state.interactables['loungeDoor']).toEqual('open');
    });

    test('study door can be opened', function() {
        var state = core.init();
        core.interact(state, 'studyDoor', 'open');
        expect(state.interactables['studyDoor']).toEqual('open');
    });
    test('safety door can be opened', function() {
        var state = core.init();
        core.interact(state, 'safetyDoor', 'open');
        expect(state.interactables['safetyDoor']).toEqual('open');
    });
});
