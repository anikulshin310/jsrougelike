// let pixelSize = document.querySelector('input[name="pixelSize"]:checked').value;

function startGame() {


    let modalWrapper = document.getElementById("modalWrapper");
    modalWrapper.style.display = "none";
    let field = document.getElementById("field");
    field.style.display = "flex";

    drawCells();
    createMobs();
    showLayer();
}

//логика хода 
let playerTurn = true;
function turn() {
    if (playerTurn = true) {
        playerTurn = false;
    }
    else { playerTurn = true }
}
//задаем случайному мобу бэкгруанд! нужно для реализации случайного движения
function mobMovement() {
    let direction = randomInteger(1, 4);//1 - наверх, 2- направо, 3- вниз, 4- налевоF
    mobsId.forEach(mobId => {
        console.log(mobId);
        let mob = document.getElementById(mobId);
        let cs = window.getComputedStyle(mob);
        let left = parseInt(cs.marginLeft);
        let top = parseInt(cs.marginTop);



        if (direction == 1 && left >= 0 && top < 594) {
            mob.style.marginTop = top - 66 + 'px';

        }
        if (direction == 2 && left >= 0 && top < 594) {
            mob.style.marginLeft = left + 66 + 'px';

        }
        if (direction == 3 && left >= 0 && top < 594) {
            mob.style.marginTop = top + 66 + 'px';

        }
        if (direction == 4 && left >= 0 && top < 594) {
            mob.style.marginLeft = left - 66 + 'px';

        }


    });





}




//canvas
var canvas = document.getElementById('field');
var ctx = canvas.getContext('2d');

//рисуем клетки
const drawCells = () => {
    for (let x = 0; x < 720; x += 66) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 660);
    }

    for (let y = 0; y < 720; y += 66) {
        ctx.moveTo(0, y);
        ctx.lineTo(660, y);
    }

    ctx.strokeStyle = "#888";
    ctx.stroke();
}


//массив занятых клеток
let occupiedCells = [];



function showMob(n) {
    n = document.createElement('div');
    n.id = "mob" + n.pos[0] + n.pos[1];
    n.style.position = 'absolute';
    n.style.width = 66 + "px";
    n.style.height = 66 + "px";
    n.style.background = 'red';
    n.style.display = 'block';
    n.style.zIndex = 99;
    n.style.marginLeft = n.pos[0] * 66 + "px";
    n.style.marginTop = n.pos[1] * 66 + "px";
    wrapper.appendChild(n);
};


let mobs = new Array();
let mobsId = [];

function createMobs() {
    for (let i = 0; i < 2; i++) {
        let posX = randomInteger(0, 9);
        let posY = randomInteger(0, 9);
        let currentHP = 10;
        let totalHP = 10;
        let name = 'mob' + posX + posY;

        mob = {
            name: name,
            pos: [posX, posY],
            currentHP: currentHP,
            totalHP: totalHP,
            status: "alive",
        };

        mobs.push(mob);
        n = document.createElement('div');
        n.id = mob.name;
        n.style.position = 'absolute';
        n.style.width = 66 + "px";
        n.style.height = 66 + "px";
        n.style.background = 'red';
        n.style.display = 'flex';
        n.style.zIndex = 99;
        n.style.marginLeft = mob.pos[0] * 66 + "px";
        n.style.marginTop = mob.pos[1] * 66 + "px";
        wrapper.appendChild(n);
        occupiedCells.push(mob.pos);
        mobsId.push(mob.name);

        n.innerHTML = mob.currentHP;

    }


}

//слуйчайное число от 0 до 9 для размещения объектов рандомно
function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.round(rand);
}


//рисуем блок игрока
let playerObj = {
    pos: [0, 0],
    totalHP: 30,
    currentHP: 30,
    attack: 5,
};
function showLayer() {
    // let posX = randomInteger(0,9);
    // let posY = randomInteger(0,9);

    alreadyOccupied = check
    myLayer = document.createElement('div');
    myLayer.id = 'char';
    myLayer.style.position = 'absolute';
    myLayer.style.width = 66 + "px";
    myLayer.style.height = 66 + "px";
    myLayer.style.background = '#00ff00';
    myLayer.style.display = 'block';
    myLayer.style.zIndex = 99;
    wrapper.appendChild(myLayer);
}


//двигаем игрока
//записываем координаты в объект игрока и див с координатами
// playerPositionSave();
function playerPositionSave() {
    let player = document.getElementById("char");
    let cs = window.getComputedStyle(player);
    playerObj.pos[0] = parseInt(cs.marginLeft) / 66;
    playerObj.pos[1] = parseInt(cs.marginTop) / 66;
    let showPositon = document.getElementById("coords1");
    player.innerHTML = playerObj.currentHP;
    showPositon.innerHTML = "X:" + playerObj.pos[0] + "Y:" + playerObj.pos[1] + 'Занятые клетки: ' + occupiedCells;

}
coords = [];
//проверка столкновений
function check([x, y]) {
    occupiedCells.forEach(([x, y]) => {
        coords[x] = coords[x] || Object.create(null);
        coords[x][y] = true;
        let thisMob = mobs.find(getMob("mob" + x + y));
        if (x + 1 == playerObj.pos[0] && y == playerObj.pos[1] || x - 1 == playerObj.pos[0] && y == playerObj.pos[1] || x == playerObj.pos[0] && y + 1 == playerObj.pos[1] || x == playerObj.pos[0] && y - 1 == playerObj.pos[1]) {


        }
    });
    return (x in coords) && (y in coords[x])
}

//аттакуем
function attack(mob, mobId) {
    let thisMob = mobs.find(getMob(mobId));
    thisMob.currentHP = thisMob.currentHP - playerObj.attack;
    mob.innerHTML = thisMob.currentHP;
    if (thisMob.currentHP <= 0) {
        thisMob.status = 'died';
        mob.style.display = 'none';
        let mobPosIndex = occupiedCells.indexOf(thisMob.pos);
        delete occupiedCells[mobPosIndex];
        coords.length = 0; // обнуляем массив, и даем игроку ходить в те клетки, что были заняты уже мертвым мобом

    }
    // console.log(thisMob.status);
    // return thisMob.status;
}


function getMob(name) {
    return mobName => mobName.name === name;
}

//ходим бродим, если есть моб- атакуем
function checkingMobs(e) {
    let player = document.getElementById("char");
    let cs = window.getComputedStyle(player);
    let left = parseInt(cs.marginLeft);
    let top = parseInt(cs.marginTop);
    let checkMobLeft = check([playerObj.pos[0] - 1, playerObj.pos[1]]);
    let checkMobRight = check([playerObj.pos[0] + 1, playerObj.pos[1]]);
    let checkMobUp = check([playerObj.pos[0], playerObj.pos[1] - 1]);
    let checkMobDown = check([playerObj.pos[0], playerObj.pos[1] + 1]);
    switch (e.keyCode) {

        case 37: // если нажата клавиша влево
            if (left > 0 && checkMobLeft == false) {

                char.style.marginLeft = left - 66 + "px";

            }
            else if (checkMobLeft == true) {
                let mobId = String("mob" + Number(playerObj.pos[0] - 1) + Number(playerObj.pos[1]));
                let mob = document.getElementById(mobId);
                attack(mob, mobId);
            }

            break;

        case 38: // если нажата клавиша вверх
            if (top > 0 && checkMobUp == false)
                char.style.marginTop = top - 66 + "px";
            else if (checkMobUp == true) {
                let mobId = String("mob" + Number(playerObj.pos[0]) + Number(playerObj.pos[1] - 1));
                let mob = document.getElementById(mobId);
                attack(mob, mobId);
            }

            break;
        case 39: // если нажата клавиша вправо
            if (left < 594 && checkMobRight == false)
                char.style.marginLeft = left + 66 + "px";
            else if (checkMobRight == true) {
                let mobId = String("mob" + Number(playerObj.pos[0] + 1) + Number(playerObj.pos[1]));
                let mob = document.getElementById(mobId);
                attack(mob, mobId);
            }
            break;
        case 40: // если нажата клавиша вниз
            if (top < 594 && checkMobDown == false)
                char.style.marginTop = top + 66 + "px";
            else if (checkMobDown == true) {
                let mobId = String("mob" + Number(playerObj.pos[0]) + Number(playerObj.pos[1] + 1));
                let mob = document.getElementById(mobId);
                attack(mob, mobId);
            }
            break;
    }
    playerPositionSave();
    turn();
}

addEventListener("keydown", checkingMobs);