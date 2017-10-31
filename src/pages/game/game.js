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
            'office'
        ]);
        core.monsterMove(Model, locations);
    } else if (Model.monsterLocation === 'bathroom') {
        var locations = ChooseMonsterLocation(['hallway']);
        core.monsterMove(Model, locations);
    } else if (Model.monsterLocation === 'office') {
        var locations = ChooseMonsterLocation(['hallway']);
        core.monsterMove(Model, locations);
    } else if (Model.monsterLocation === 'safetyDoor') {
        if (Model.monsterLocation) {
        }
        // if after 5 seconds or so the safetyDoor isn't closed then jumpscare
        // else go to either the office or hallway area
    }
}
//Game Over function takes in the Model and returns the state after everything is finished
function gameOver(Model) {
    if (Model.Time === 6) {
        $('#app').html('<h1> You Win </h1>');
    } else {
        if (Model.Power <= 0 && Model.Time < 6) {
            // You lose
        } else if (monsterWinConditions(Model) === true) {
            //You lose
        }
    }
}
function monsterWinConditions(Model) {
    if (
        Model.monsterLocation === 'safteyDoorOne' &&
        Model.interactables.safetyDoorOne === 'open'
    ) {
        return true;
    } else if (
        Model.monsterLocation === 'safteyDoorTwo' &&
        Model.interactables.safetyDoorTwo === 'open'
    ) {
        return true;
    } else {
        return false;
    }
}
//Take Pictures of the doors tomorrow... Made this function at the house
// SnackRoomDoor Closed = 6
// Safety Doors Closed = 3
function Doors(Model) {
    var safetyDoorOne = Model.interactables.safetyDoorOne;
    var safetyDoorTwo = Model.interactables.safetyDoorTwo;
    if (safetyDoorOne === 'open' && safetyDoorTwo === 'open') {
        Model.Power -= 1;
    } else if (safetyDoorOne === 'open' && safetyDoorTwo === 'closed') {
    }
}
function screenView(picture) {
    return "<img class='center-block' src='" + picture + "'/>";
}
function makeButtons() {
    var allCameras = core.Cameras();
    return allCameras.map(function(camera) {
        return (
            "<div class='row'><button class='btn btn-danger' id='" +
            camera +
            "'>" +
            camera +
            '</button></div>'
        );
    });
}
function gameStart(Model) {}
function ChooseMonsterLocation(location) {
    var index = Math.floor(Math.random() * location.length);
    return location[index];
}
function currentTime(Model) {
    Model.Time += 1;
}
function main() {
    var button_audio = new Audio('../../assets/Sound_Effects/Button_Click.ogx');
    var static_audio = new Audio('../../assets/Sound_Effects/tv-static-01.mp3');
    var game = core.init();
    $('#jumbotron-time').html(
        "<div class='col-lg-6'><h2> Time: " + game.Time + ' a.m. </h2></div>'
    );
    $('#jumbotron-power').html(
        "<div class='col-lg-6'><h2> Power: " + game.Power + '</h2>'
    );
    $('#screen').html(screenView(core.SceneChange()['Room']['classroom']));
    $('#buttons').html(makeButtons());
    $('#bathroom').click(function() {
        button_audio.play();
        core.lookingAt(game, 'bathroom');
        gameOver(game);
        view(game);
    });
    $('#office').click(function() {
        button_audio.play();
        core.lookingAt(game, 'office');
        gameOver(game);
        view(game);
    });
    $('#classroom').click(function() {
        button_audio.play();
        core.lookingAt(game, 'classroom');
        gameOver(game);
        view(game);
    });
    $('#hallway').click(function() {
        button_audio.play();
        core.lookingAt(game, 'hallway');
        gameOver(game);
        view(game);
    });
    // This is the current Time
    setInterval(function() {
        currentTime(game);
        $('#jumbotron-time').html('<h2> Time: ' + game.Time + ' a.m. </h2>');
        gameOver(game);
    }, 60000);
    setInterval(function() {
        //This was made to subtract the power ever second
        // game.Power -= 1;
        $('#jumbotron-power').html('<h2> Power: ' + game.Power + '</h2>');
    }, 3000);
    setInterval(function() {
        monsterMove(game);
        static_audio.play();
        $('#screen').html(screenView('../../assets/Tv_Effects/Static_Tv.gif'));
        setTimeout(function() {
            view(game);
            gameOver(game);
        }, 1000);
        // console.log(game.monsterLocation);
    }, 5000);
    view(game);
}
$(main);
