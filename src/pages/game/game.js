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
        core.interact(Model, 'safetyDoor', 'shaking');
        // if after 5 seconds or so the safetyDoor isn't closed then jumpscare
        // else go to either the office or hallway area
    }
}

//Take Pictures of the doors tomorrow... Made this function at the house
function Doors(Model) {
    if (Model.interactables.safetyDoorOne === 'closed') {
        //Power - 3
    } else if (Model.interactables.safetyDoorTwo === 'closed') {
        //Power - 3
    } else if (Model.interactables.snackRoomDoor === 'closed') {
        // Power - 3
    } else if (
        Model.interactables.safetyDoorOne === 'closed' &&
        Model.interactables.safetyDoorTwo === 'closed'
    ) {
        // Power - 6
    } else if (
        Model.interactables.safetyDoorOne === 'closed' &&
        Model.interactables.safetyDoorTwo === 'closed' &&
        Model.interactables.snackRoomDoor === 'closed'
    ) {
        // Power - 15
    }
}
function screenView(picture) {
    return (
        "<img class='center-block' src='" +
        picture +
        "' width='730px' height='364px' align='middle'/>"
    );
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

function main() {
    var button_audio = new Audio('../../assets/Sound_Effects/Button_Click.ogx');
    var static_audio = new Audio('../../assets/Sound_Effects/tv-static-01.mp3');
    var game = core.init();
    $('#buttons').html(makeButtons());
    $('#bathroom').click(function() {
        button_audio.play();
        core.lookingAt(game, 'bathroom');
        view(game);
    });
    $('#office').click(function() {
        button_audio.play();
        core.lookingAt(game, 'office');
        view(game);
    });
    $('#classroom').click(function() {
        button_audio.play();
        core.lookingAt(game, 'classroom');
        view(game);
    });
    $('#hallway').click(function() {
        button_audio.play();
        core.lookingAt(game, 'hallway');
        view(game);
    });
    $('#screen').html(screenView(core.SceneChange()['Room']['classroom']));
    setInterval(function() {
        game.Power -= 1;
        $('.jumbotron').html('<h1> Power: ' + game.Power + '</h1>');
    }, 3000);
    setInterval(function() {
        monsterMove(game);
        static_audio.play();
        $('#screen').html(screenView('../../assets/Tv_Effects/Static_Tv.gif'));
        setTimeout(function() {
            view(game);
        }, 1000);
        // console.log(game.monsterLocation);
    }, 5000);
    view(game);
}
$(main);
