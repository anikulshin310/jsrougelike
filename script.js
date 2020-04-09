// let pixelSize = document.querySelector('input[name="pixelSize"]:checked').value;

function startGame() {


    let modalWrapper = document.getElementById("modalWrapper");
    modalWrapper.style.display = "none";
    let field = document.getElementById("field");
    field.style.display = "flex";

    drawCells();
    createWalls()
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
//реализации случайного движения


//canvas
var canvas = document.getElementById('field');
var ctx = canvas.getContext('2d');
var img = new Image();
img.src = "backgroundTiles.png";
img.onload = function () {
    for (let i = 0; i < 10; i++) {

        let startPointX = 66 * i;
        ctx.drawImage(img, 384, 64, 32, 32, startPointX, 0, 66, 66);
        ctx.drawImage(img, 384, 64, 32, 32, startPointX, 66, 66, 66);
        ctx.drawImage(img, 384, 64, 32, 32, startPointX, 132, 66, 66);
        ctx.drawImage(img, 384, 64, 32, 32, startPointX, 198, 66, 66);
        ctx.drawImage(img, 384, 64, 32, 32, startPointX, 264, 66, 66);
        ctx.drawImage(img, 384, 64, 32, 32, startPointX, 330, 66, 66);
        ctx.drawImage(img, 384, 64, 32, 32, startPointX, 396, 66, 66);
        ctx.drawImage(img, 384, 64, 32, 32, startPointX, 462, 66, 66);
        ctx.drawImage(img, 384, 64, 32, 32, startPointX, 528, 66, 66);
        ctx.drawImage(img, 384, 64, 32, 32, startPointX, 594, 66, 66);
        ctx.drawImage(img, 384, 64, 32, 32, startPointX, 660, 66, 66);
        ctx.drawImage(img, 384, 64, 32, 32, startPointX, 726, 66, 66);
    }
};

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

//функция отрисовки моба

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

let mobs = [];//массив объектов мобов
let occupiedCells = [];
let freeCells = [];
cell();
function cell() {
    for (let i = 0; i < 10; i++) {
        freeCells.push([0 + i, 0]);
        freeCells.push([0 + i, 1]);
        freeCells.push([0 + i, 2]);
        freeCells.push([0 + i, 3]);
        freeCells.push([0 + i, 4]);
        freeCells.push([0 + i, 5]);
        freeCells.push([0 + i, 6]);
        freeCells.push([0 + i, 7]);
        freeCells.push([0 + i, 8]);
        freeCells.push([0 + i, 9]);
    }

};
function createWalls() {
    walls = []
    for (let i = 0; i < 8; i++) {
        checkCells()
        let wall = document.createElement('div');
        wall.id = 'wall';
        wall.style.position = 'absolute';
        wall.style.width = 66 + "px";
        wall.style.height = 66 + "px";
        wall.style.background = 'grey';
        wall.style.display = 'flex';


        wall.style.zIndex = 99;
        wall.style.marginLeft = posX * 66 + "px";
        wall.style.marginTop = posY * 66 + "px";
        wrapper.appendChild(wall);
        walls.push([posX, posY]);
    }

}

function checkCells() {
    let rand = freeCells[Math.floor(Math.random() * freeCells.length)];
    let randIndex = freeCells.indexOf(rand);
    occupiedCells.push(freeCells.splice(randIndex, 1));
    posX = rand[0];
    posY = rand[1];


}

function createMobs() {
    let playerObjIndex = freeCells.indexOf(playerObj.pos);

    occupiedCells.push(freeCells.splice(0, 1));

    for (let i = 0; i < 10; i++) {
        checkCells()
        let currentHP = randomInteger(4, 9) + 10;
        let totalHP = currentHP;
        let name = 'mob' + posX + posY;


        mob = {
            name: name,
            pos: [posX, posY],
            currentHP: currentHP,
            totalHP: totalHP,
            status: "alive",
            movement(x, y) {
                let thisMob = document.getElementById(this.name);

                this.pos = [x, y];
                let thisMobPos = occupiedCells.indexOf(this.pos);
                occupiedCells[thisMobPos] = [x, y];
                thisMob.style.marginLeft = this.pos[0] * 66 + "px";
                thisMob.style.marginTop = this.pos[1] * 66 + "px";
                this.name = "mob" + this.pos[0] + this.pos[1];
                thisMob.id = this.name;
            },
            
        };
        // changePostion();
        mobs.push(mob);

        n = document.createElement('canvas');
        n.id = mob.name;
        n.style.position = 'absolute';
        n.style.width = 66 + "px";
        n.style.height = 66 + "px";
        
        n.style.display = 'flex';
        n.style.zIndex = 99;
        n.style.marginLeft = mob.pos[0] * 66 + "px";
        n.style.marginTop = mob.pos[1] * 66 + "px";
        wrapper.appendChild(n);
        n.innerHTML = mob.totalHP + "/" + mob.currentHP;

        draw_c( n.id)


    }



}
function draw_c(id) {
    
    let с_canvas = document.getElementById(id);
    let с_context = с_canvas.getContext("2d");
    
    с_context.drawImage(img, 224, 288, 32, 32, 0, 0, 66 * 4, 66 * 2);
    

    

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

    myLayer = document.createElement('canvas');
    myLayer.id = 'char';
    myLayer.style.position = 'absolute';
    myLayer.style.width = 66 + "px";
    myLayer.style.height = 66 + "px";
    myLayer.style.display = 'block';
    myLayer.style.zIndex = 99;
    wrapper.appendChild(myLayer);

    //отрисовывыем тайл игрока
    function draw_b() {
        var b_canvas = document.getElementById("char");
        var b_context = b_canvas.getContext("2d");
        b_canvas.innerHTML = playerObj.currentHP + '/' + playerObj.totalHP;
        b_context.drawImage(img, 31, 0, 32, 32, 0, 0, 66 * 4, 66 * 2);
    }
    draw_b()
}

//двигаем игрока
//записываем координаты в объект игрока и див с координатами

function playerPositionSave() {
    let player = document.getElementById("char");
    let cs = window.getComputedStyle(player);
    playerObj.pos[0] = parseInt(cs.marginLeft) / 66;
    playerObj.pos[1] = parseInt(cs.marginTop) / 66;
    let showPositon = document.getElementById("coords1");
    player.innerHTML = playerObj.currentHP + "/" + playerObj.totalHP;
    showPositon.innerHTML = "X:" + playerObj.pos[0] + "Y:" + playerObj.pos[1];

}
coords = [];

function checkAvailable(array, x, y) {
    array.forEach(([x, y]) => {
        coords[x] = coords[x] || Object.create(null);
        coords[x][y] = true;

    });
    return (x in coords) && (y in coords[x])
}
//проверяем есть ли такой моб в массиве объектов, и жив ли он
function check(x, y) {
    let mobId = "mob" + x + y;
    let thisMob = mobs.find(getMob(mobId));
    let contains = mobs.includes(thisMob) && thisMob.status === "alive";
    return contains;
}

//аттакуем
function attack(mobId) {
    let thisMobObj = mobs.find(getMob(mobId));
    let mobDiv = document.getElementById(mobId);
    thisMobObj.currentHP = thisMobObj.currentHP - playerObj.attack;
    mobDiv.innerHTML = thisMobObj.currentHP + "/" + thisMobObj.totalHP;
    if (thisMobObj.currentHP <= 0) {
        thisMobObj.status = 'died';
        mobDiv.style.display = 'none';
    }
    
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
    let checkMobLeft = check(playerObj.pos[0] - 1, playerObj.pos[1]) || checkAvailable(walls, playerObj.pos[0] - 1, playerObj.pos[1]);
    let checkMobRight = check(playerObj.pos[0] + 1, playerObj.pos[1]) || checkAvailable(walls, playerObj.pos[0] + 1, playerObj.pos[1]);
    let checkMobUp = check(playerObj.pos[0], playerObj.pos[1] - 1) || checkAvailable(walls, playerObj.pos[0], playerObj.pos[1] - 1);
    let checkMobDown = check(playerObj.pos[0], playerObj.pos[1] + 1) || checkAvailable(walls, playerObj.pos[0], playerObj.pos[1] + 1);
    switch (e.keyCode) {

        case 37: // если нажата клавиша влево
            if (left > 0 && checkMobLeft == false) {

                char.style.marginLeft = left - 66 + "px";

            }
            else if (checkMobLeft == true) {
                let mobId = String("mob" + Number(playerObj.pos[0] - 1) + Number(playerObj.pos[1]));

                attack(mobId);

            }

            break;

        case 38: // если нажата клавиша вверх
            if (top > 0 && checkMobUp == false)
                char.style.marginTop = top - 66 + "px";
            else if (checkMobUp == true) {
                let mobId = String("mob" + Number(playerObj.pos[0]) + Number(playerObj.pos[1] - 1));

                attack(mobId);
            }

            break;
        case 39: // если нажата клавиша вправо
            if (left < 594 && checkMobRight == false)
                char.style.marginLeft = left + 66 + "px";
            else if (checkMobRight == true) {
                let mobId = String("mob" + Number(playerObj.pos[0] + 1) + Number(playerObj.pos[1]));
                attack(mobId);
            }
            break;
        case 40: // если нажата клавиша вниз
            if (top < 594 && checkMobDown == false)
                char.style.marginTop = top + 66 + "px";
            else if (checkMobDown == true) {
                let mobId = String("mob" + Number(playerObj.pos[0]) + Number(playerObj.pos[1] + 1));

                attack(mobId);
            }
            break;
    }
    playerPositionSave();



}

addEventListener("keydown", checkingMobs);


//передвижения по клику мыши
document.getElementById('wrapper').onclick = function (e) {
    let x = e.offsetX == undefined ? e.layerX : e.offsetX;
    let y = e.offsetY == undefined ? e.layerY : e.offsetY;
    let xCoords = Math.ceil(x / 66 - 1);
    let yCoords = Math.ceil(y / 66 - 1);
    let player = document.getElementById("char");
    let cs = window.getComputedStyle(player);
    let left = parseInt(cs.marginLeft);
    let top = parseInt(cs.marginTop);

    window.onclick = function (e) {

        let mobId = e ? e.target : window.event.srcElement;
        return mobId;


    }


    if (xCoords === 0 && yCoords === 0) {
        window.onclick = function (e) {

            mobId = e ? e.target : window.event.srcElement;
            if (mobId.id === String("mob" + Number(playerObj.pos[0] - 1) + Number(playerObj.pos[1]))) {
                attack(mobId.id);
            }
            if (mobId.id === String("mob" + Number(playerObj.pos[0] + 1) + Number(playerObj.pos[1]))) {
                attack(mobId.id);
            }

            if (mobId.id === String("mob" + Number(playerObj.pos[0]) + Number(playerObj.pos[1] + 1))) {
                attack(mobId.id);
            }
            if (mobId.id === String("mob" + Number(playerObj.pos[0]) + Number(playerObj.pos[1] - 1))) {
                attack(mobId.id);
            }
            if (mobId.id === String("mob" + Number(playerObj.pos[0] - 1) + Number(playerObj.pos[1] - 1))) {
                attack(mobId.id);
            }
            if (mobId.id === String("mob" + Number(playerObj.pos[0] + 1) + Number(playerObj.pos[1] + 1))) {
                attack(mobId.id);
            }
            if (mobId.id === String("mob" + Number(playerObj.pos[0] + 1) + Number(playerObj.pos[1] - 1))) {
                attack(mobId.id);
            }
            if (mobId.id === String("mob" + Number(playerObj.pos[0] - 1) + Number(playerObj.pos[1] + 1))) {
                attack(mobId.id);
            }


        }



    }

    if (xCoords > playerObj.pos[0] && xCoords < playerObj.pos[0] + 2 && xCoords !== 0) {

        playerObj.pos[0] = playerObj.pos[0] + 1;

        char.style.marginLeft = left + 66 + "px";
        console.log(mobId)
        attack(mobId);

    }
    if (xCoords < playerObj.pos[0] && xCoords > playerObj.pos[0] - 2 && xCoords !== 0) {

        playerObj.pos[0] = playerObj.pos[0] - 1;

        char.style.marginLeft = left - 66 + "px";
        attack(mobId);

    }
    if (yCoords > playerObj.pos[1] && yCoords < playerObj.pos[1] + 2 && yCoords !== 0) {

        playerObj.pos[1] = playerObj.pos[1] + 1;

        char.style.marginTop = top + 66 + "px";
        attack(mobId);

    }
    if (yCoords < playerObj.pos[1] && yCoords > playerObj.pos[1] - 2 && yCoords !== 0) {

        playerObj.pos[1] = playerObj.pos[1] - 1;

        char.style.marginTop = top - 66 + "px";
        attack(mobId);

    }
    playerPositionSave()
    console.log(xCoords + 'x' + yCoords)
};


//контекстное меню
document.addEventListener("contextmenu", function (e) {
    console.log(e);
});