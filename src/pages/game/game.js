const $ = require('jquery');
const core = require('../../lib/core');

function view(Model) {
    if (Model.lookingAt === 'classroom') {
        if (Model.monsterLocation === 'classroom') {
            $('#screen').html(
                screenView(core.SceneChange()['MonsterInRoom']['classroom'])
            );
        } else {
            $('#screen').html(
                screenView(core.SceneChange()['Room']['classroom'])
            );
        }
    } else if (Model.lookingAt === 'office') {
        if (Model.monsterLocation === 'office') {
            $('#screen').html(
                screenView(core.SceneChange()['MonsterInRoom']['office'])
            );
        } else {
            $('#screen').html(screenView(core.SceneChange()['Room']['office']));
        }
    } else if (Model.lookingAt === 'hallway') {
        if (Model.monsterLocation === 'hallway') {
            $('#screen').html(
                screenView(core.SceneChange()['MonsterInRoom']['hallway'])
            );
        } else {
            $('#screen').html(
                screenView(core.SceneChange()['Room']['hallway'])
            );
        }
    } else if (Model.lookingAt === 'bathroom') {
        if (Model.monsterLocation === 'bathroom') {
            $('#screen').html(
                screenView(core.SceneChange()['MonsterInRoom']['bathroom'])
            );
        } else {
            $('#screen').html(
                screenView(core.SceneChange()['Room']['bathroom'])
            );
        }
    } else if (Model.lookingAt === 'safetyDoorOne') {
        if (
            Model.monsterLocation === 'safetyDoorOne' &&
            Model.interactables.safetyDoorOne === 'open'
        ) {
            $('#screen').html(
                screenView(core.SceneChange()['safetyDoorOne']['monsterInDoor'])
            );
        } else if (Model.interactables.safetyDoorOne === 'open') {
            $('#screen').html(
                screenView(core.SceneChange()['safetyDoorOne']['open'])
            );
        } else if (
            Model.interactables.safetyDoorOne === 'closed' &&
            Model.monsterLocation === 'safetyDoorOne'
        ) {
            // SoundEffects()['DoorPounding'].play();
            $('#screen').html(
                screenView(core.SceneChange()['safetyDoorOne']['closed'])
            );
        } else if (Model.interactables.safetyDoorOne === 'closed') {
            $('#screen').html(
                screenView(core.SceneChange()['safetyDoorOne']['closed'])
            );
        }
    } else if (Model.lookingAt === 'safetyDoorTwo') {
        if (
            Model.monsterLocation === 'safetyDoorTwo' &&
            Model.interactables.safetyDoorTwo === 'open'
        ) {
            // SoundEffects()['WarningEffect'].play();
            $('#screen').html(
                screenView(core.SceneChange()['safetyDoorTwo']['monsterInDoor'])
            );
        } else if (Model.interactables.safetyDoorTwo === 'open') {
            $('#screen').html(
                screenView(core.SceneChange()['safetyDoorTwo']['open'])
            );
        } else if (
            Model.interactables.safetyDoorTwo === 'closed' &&
            Model.monsterLocation === 'safetyDoorTwo'
        ) {
            // SoundEffects()['DoorPounding'].play();
            $('#screen').html(
                screenView(core.SceneChange()['safetyDoorTwo']['closed'])
            );
        } else if (Model.interactables.safetyDoorTwo === 'closed') {
            $('#screen').html(
                screenView(core.SceneChange()['safetyDoorTwo']['closed'])
            );
        }
    }
}
function monsterMove(Model) {
    if (Model.monsterLocation === 'classroom') {
        var locations = ChooseMonsterLocation(['classroom', 'hallway']);
        core.monsterMove(Model, locations);
    } else if (Model.monsterLocation === 'hallway') {
        var locations = ChooseMonsterLocation([
            'classroom',
            'bathroom',
            'office',
            'safetyDoorOne'
        ]);
        core.monsterMove(Model, locations);
    } else if (Model.monsterLocation === 'bathroom') {
        var locations = ChooseMonsterLocation(['hallway']);
        core.monsterMove(Model, locations);
    } else if (Model.monsterLocation === 'office') {
        var locations = ChooseMonsterLocation(['hallway', 'safetyDoorTwo']);
        core.monsterMove(Model, locations);
    } else if (Model.monsterLocation === 'safetyDoorOne') {
        if (Model.interactables.safetyDoorOne === 'closed') {
            if (Math.random() > 0.5) {
                core.interact(Model, 'safetyDoorOne', 'shaking');
            } else {
                var locations = ChooseMonsterLocation(['hallway']);
                core.monsterMove(Model, locations);
            }
        } else if (Model.interactables.safetyDoorOne === 'shaking') {
            core.interact(Model, 'safetyDoorOne', 'open');
        } else {
            core.monsterMove(Model, 'GOAL');
        }
    } else if (Model.monsterLocation === 'safetyDoorTwo') {
        if (Model.interactables.safetyDoorTwo === 'closed') {
            if (Math.random() > 0.5) {
                core.interact(Model, 'safetyDoorTwo', 'shaking');
            } else {
                var locations = ChooseMonsterLocation(['office', 'hallway']);
                core.monsterMove(Model, locations);
            }
        } else if (Model.interactables.safetyDoorTwo === 'shaking') {
            core.interact(Model, 'safetyDoorTwo', 'open');
        } else {
            core.monsterMove(Model, 'GOAL');
        }
        // if after 5 seconds or so the safetyDoor isn't closed then jumpscare
        // else go to either the office or hallway area
    }
}
//Game Over function takes in the Model and returns the state after everything is finished
function gameOver(Model) {
    if (Model.Time === 6) {
        $('#app').html('<h1> You Win </h1>');
    } else if (monsterWinConditions(Model) === true) {
        $('#app').html('<h1> You Lose </h1>');
    } else if (Model.Power <= 0 && Model.Time < 6) {
        $('#app').html('<h1> You Lose </h1>');
    }
}
function monsterWinConditions(Model) {
    return Model.monsterLocation === 'GOAL';
}
//Take Pictures of the doors tomorrow... Made this function at the house
// SnackRoomDoor Closed = 6
// Safety Doors Closed = 3
function Doors(Model) {
    var safetyDoorOne = Model.interactables.safetyDoorOne;
    var safetyDoorTwo = Model.interactables.safetyDoorTwo;
    if (safetyDoorOne === 'open' && safetyDoorTwo === 'open') {
        Model.Power -= 0.205;
    } else if (safetyDoorOne === 'open' && safetyDoorTwo === 'closed') {
        Model.Power -= 0.205 * 2;
    } else if (safetyDoorOne === 'closed' && safetyDoorTwo === 'open') {
        Model.Power -= 0.205 * 2;
    } else {
        Model.Power -= 0.205 * 4;
    }
}
function screenView(picture) {
    return "<img class='center-block' src='" + picture + "'/>";
}
function makeButtons() {
    var allCameras = core.Cameras();
    return allCameras
        .map(function(camera) {
            return (
                "<div class='row'><button class='btn btn-danger' id='" +
                camera +
                "'>" +
                camera +
                '</button></div>'
            );
        })
        .join('');
}
function KillIntervals(Model) {
    if (
        Model.Time === 6 ||
        monsterWinConditions(Model) === true ||
        Model.Power === 0
    ) {
        return true;
    }
}
function SoundEffects() {
    return {
        CameraClick: new Audio('../../assets/Sound_Effects/Button_Click.ogx'),
        Static: new Audio('../../assets/Sound_Effects/tv-static-01.mp3'),
        WarningEffect: new Audio(
            '../../assets/Sound_Effects/Warning_Sound.ogx'
        ),
        DoorPounding: new Audio('../../assets/Sound_Effects/Door_Pounding.ogx')
    };
}
function makeDoors() {
    var allDoors = core.Doors();
    return allDoors
        .map(function(doors) {
            return (
                "<div class='row'><button class='btn btn-danger' id='" +
                doors +
                "'>" +
                doors +
                '</button></div>'
            );
        })
        .join('');
}
function Warning(Model) {
    if (
        Model.monsterLocation === 'safetyDoorOne' &&
        Model.interactables.safetyDoorOne === 'open'
    ) {
        SoundEffects()['WarningEffect'].play();
    } else if (
        Model.interactables.safetyDoorOne === 'closed' &&
        Model.monsterLocation === 'safetyDoorOne'
    ) {
        SoundEffects()['DoorPounding'].play();
    } else if (
        Model.monsterLocation === 'safetyDoorTwo' &&
        Model.interactables.safetyDoorTwo === 'open'
    ) {
        SoundEffects()['WarningEffect'].play();
    } else if (
        Model.monsterLocation === 'safetyDoorOne' &&
        Model.interactables.safetyDoorOne === 'closed'
    ) {
        SoundEffects()['DoorPounding'].play();
    }
}

function openOrClose(door) {
    if (door === 'closed') {
        return 'open';
    } else {
        return 'closed';
    }
}
function level(game) {
    $('#jumbotron-time').html(
        "<div class='col-lg-6'><h2> Time: " + game.Time + ' a.m. </h2></div>'
    );
    $('#jumbotron-power').html(
        "<div class='col-lg-6'><h2> Power: " + game.Power + '</h2>'
    );

    $('#screen').html(screenView(core.SceneChange()['Room']['classroom']));
    $('#buttons').html(makeButtons());
    $('#doors').html(makeDoors());
    $('#SD1').click(function() {
        core.interact(
            game,
            'safetyDoorOne',
            openOrClose(game.interactables.safetyDoorOne)
        );
        view(game);
        gameOver(game);
    });
    $('#SD2').click(function() {
        core.interact(
            game,
            'safetyDoorTwo',
            openOrClose(game.interactables.safetyDoorTwo)
        );
        view(game);
        gameOver(game);
    });
    $('#bathroom').click(function() {
        SoundEffects()['CameraClick'].play();
        core.lookingAt(game, 'bathroom');
        gameOver(game);
        view(game);
    });
    $('#office').click(function() {
        SoundEffects()['CameraClick'].play();
        core.lookingAt(game, 'office');
        gameOver(game);
        view(game);
    });
    $('#classroom').click(function() {
        SoundEffects()['CameraClick'].play();
        core.lookingAt(game, 'classroom');
        gameOver(game);
        view(game);
    });
    $('#hallway').click(function() {
        SoundEffects()['CameraClick'].play();
        core.lookingAt(game, 'hallway');
        gameOver(game);
        view(game);
    });
    $('#safetyDoorOne').click(function() {
        SoundEffects()['CameraClick'].play();
        core.lookingAt(game, 'safetyDoorOne');
        gameOver(game);
        view(game);
        // Warning(game);
    });
    $('#safetyDoorTwo').click(function() {
        SoundEffects()['CameraClick'].play();
        core.lookingAt(game, 'safetyDoorTwo');
        gameOver(game);
        view(game);
        // Warning(game);
    });
    // This is the current Time
    var gameTime = setInterval(function() {
        currentTime(game);
        $('#jumbotron-time').html('<h2> Time: ' + game.Time + ' a.m. </h2>');
        gameOver(game);
        if (KillIntervals(game) === true) {
            clearInterval(gameTime);
        }
    }, 60000);
    var gamePower = setInterval(function() {
        //This was made to subtract the power ever second
        Doors(game);
        $('#jumbotron-power').html(
            '<h2> Power: ' + Math.ceil(game.Power) + '</h2>'
        );
        if (KillIntervals(game) === true) {
            clearInterval(gamePower);
        }
    }, 1000);
    var MonsterMoveInterval = setInterval(function() {
        monsterMove(game);
        SoundEffects()['Static'].play();
        $('#screen').html(screenView('../../assets/Tv_Effects/Static_Tv.gif'));
        gameOver(game);
        setTimeout(function() {
            view(game);
        }, 1000);
        Warning(game);
        console.log(game.monsterLocation);
        if (KillIntervals(game) === true) {
            clearInterval(MonsterMoveInterval);
        }
    }, 5000);
    view(game);
}
function ChooseMonsterLocation(location) {
    var index = Math.floor(Math.random() * location.length);
    return location[index];
}
function currentTime(Model) {
    Model.Time += 1;
}

var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

//-- usage --//

function main() {
    // var button_audio = new Audio('../../assets/Sound_Effects/Button_Click.ogx');
    // var static_audio = new Audio('../../assets/Sound_Effects/tv-static-01.mp3');
    preload(
        '../../assets/fnabc/Hallway.jpeg',
        '../../assets/fnabc/Bathroom.jpeg',
        '../../assets/fnabc/Office.jpeg',
        '../../assets/fnabc/Hallway_with_monster.jpeg',
        '../../assets/fnabc/Bathroom_with_Monster.jpeg',
        '../../assets/fnabc/D6846834-B60A-4E1C-99C6-1721759BF537.jpeg',
        '../../assets/fnabc/Home.jpeg',
        '../../assets/fnabc/safetyroompics/Closed_SD1.jpeg',
        '../../assets/fnabc/safetyroompics/Monster_at_SD1.jpeg',
        '../../assets/fnabc/safetyroompics/Open_SD2.jpeg',
        '../../assets/fnabc/safetyroompics/Closed_SD2.jpeg',
        '../../assets/fnabc/safetyroompics/Monster_at_SD2.jpeg'
    );
    var game = core.init();
    level(game);
}
$(main);
