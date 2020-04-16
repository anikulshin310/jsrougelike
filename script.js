// let pixelSize = document.querySelector('input[name="pixelSize"]:checked').value;
let pixelSizeVw = 'vw';
let visibleView = 4;
let pixelSize = ((screen.width / 100) * visibleView)

function startGame() {
    let modalWrapper = document.getElementById("modalWrapper");
    modalWrapper.style.display = "none";
    let field = document.getElementById("field");
    field.style.display = "flex";
    field.style.width = (visibleView * 10) + pixelSizeVw;
    field.style.height = (visibleView * 10) + pixelSizeVw;
    cell();
    showLayer();
    healthBarChange();
    createWalls();
    createMobs();
    drawBackground();
    drawCells();
    sessionStorage.setItem("player", JSON.stringify(playerObj));
    let rules = document.getElementById("rules");
    rules.style.display = 'flex';

}
//новая игра
function StartNewGame() {
    $('#exampleModal').modal('hide')
    mobs = [];
    occupiedCells = [];
    freeCells = [];
    walls = [];
    coords = [];
    var element = document.getElementById("wrapper");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    };
    let field = document.createElement('canvas');
    field.id = "field";
    wrapper.appendChild(field);
    drawBackground();
    startGame();
}

//отрисовывем хп
function healthBarChange() {
    healthBarPercent = playerObj.currentHP / playerObj.totalHP * 100;
    document.querySelector('#result').style.width = healthBarPercent + '%';
    document.querySelector("#result").innerHTML = playerObj.currentHP + '/' + playerObj.totalHP;

    function healthBarColorChange() {
        if (healthBarPercent == 100) {
            healthBarColor = 'green';
        }
        if (healthBarPercent >= 60 && healthBarPercent < 100) {
            healthBarColor = 'yellow';
        }
        if (healthBarPercent < 30 && healthBarPercent > 0) {
            healthBarColor = 'red';
        }
        return healthBarColor;
    }
    document.querySelector('#result').style.backgroundColor = healthBarColorChange();
}


var img = new Image();
img.src = "img/backgroundTiles.png";
var trees = new Image();
trees.src = "img/trees.png";


//рисуем бэкграунд

function drawBackground() {
    let field = document.getElementById('field');
    field.style.backgroundSize = 40 + 'px';
}
//рисуем клетки
function drawCells() {
    let c_canvas = document.getElementById("field");
    let context = c_canvas.getContext("2d");


    for (let x = 0; x < 400; x += c_canvas.width / 10) {
        context.moveTo(x, 0);
        context.lineTo(x, 400);
    }

    for (let y = 0; y < 400; y += c_canvas.height / 10) {
        context.moveTo(0, y);
        context.lineTo(400, y);
    }

    context.strokeStyle = "rgb(4, 97, 17)";
    context.stroke();

}

//функция отрисовки моба

function showMob(n) {
    n = document.createElement('div');
    n.id = "mob" + n.pos[0] + n.pos[1];
    n.style.position = 'absolute';
    n.style.width = pixelSize + pixelSizeVw;
    n.style.height = pixelSize + pixelSizeVw;
    n.style.background = 'red';
    n.style.display = 'block';
    n.style.zIndex = 99;
    n.style.marginLeft = (n.pos[0] * visibleView) + pixelSizeVw;
    n.style.marginTop = (n.pos[1] * visibleView) + pixelSizeVw;
    wrapper.appendChild(n);
};

let mobs = []; //массив объектов мобов
let occupiedCells = [];
let freeCells = [];

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

    occupiedCells.push(freeCells.splice(0, 1));

};

function createWalls() {
    walls = []


    for (let i = 0; i < 20; i++) {
        checkCells()
        let wall = document.createElement('canvas');
        wall.id = 'wall' + posX + posY;
        wall.style.position = 'absolute';
        wall.style.width = (visibleView) + pixelSizeVw;
        wall.style.height = (visibleView) + pixelSizeVw;

        wall.style.display = 'flex';
        wall.style.zIndex = 99;
        wall.style.marginLeft = posX * (visibleView) + pixelSizeVw;
        wall.style.marginTop = posY * (visibleView) + pixelSizeVw;
        wrapper.appendChild(wall);
        walls.push([posX, posY]);

        function draw_c(id) {
            let tree = randomInteger(1, 4);
            if (tree == 1) {
                treeX = 128;
                treeY = 160;

            }
            if (tree == 2) {
                treeX = 256;
                treeY = 160;

            }
            if (tree == 3) {
                treeX = 0;
                treeY = 160;
            }
            if (tree == 4) {
                treeX = 384;
                treeY = 160;
            }

            let с_canvas = document.getElementById(id);
            let с_context = с_canvas.getContext("2d");
            с_context.drawImage(trees, treeX, treeY, 150, 165, 0, 0, 66 * 5, 66 * 3);

        }
        draw_c(wall.id)


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
    occupiedCells.push(freeCells.splice(0, 1));
    for (let i = 0; i < 5; i++) {
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
                if (x > 9 || x < 0 || y > 9 || y < 0 || checkAvailable(walls, x, y) === true || check(x, y) === true) {
                    return;

                }

                if (x === playerObj.pos[0] && y === playerObj.pos[1] ||
                    this.pos[0] == playerObj.pos[0] + 1 && this.pos[1] == playerObj.pos[1] ||
                    this.pos[0] == playerObj.pos[0] - 1 && this.pos[1] == playerObj.pos[1] ||
                    this.pos[0] == playerObj.pos[0] && this.pos[1] == playerObj.pos[1] + 1 ||
                    this.pos[0] == playerObj.pos[0] && this.pos[1] == playerObj.pos[1] - 1

                ) {
                    if (this.status === "alive") {
                        playerObj.currentHP = playerObj.currentHP - 1;
                        return;
                    }
                    if (this.status === "died") {
                        thisMob.style.display = "none"
                        return;
                    }

                }


                this.pos = [x, y];
                let thisMobPos = occupiedCells.indexOf(this.pos);
                occupiedCells[thisMobPos] = [x, y];
                thisMob.style.marginLeft = (this.pos[0] * visibleView) + pixelSizeVw;
                thisMob.style.marginTop = (this.pos[1] * visibleView) + pixelSizeVw;
                this.name = "mob" + this.pos[0] + this.pos[1];
                thisMob.id = this.name;
            },

        };

        mobs.push(mob);

        n = document.createElement('canvas');
        n.id = mob.name;
        n.style.position = 'absolute';
        n.style.width = (visibleView) + pixelSizeVw;
        n.style.height = (visibleView) + pixelSizeVw;

        n.style.display = 'flex';
        n.style.zIndex = 99;
        n.style.marginLeft = (mob.pos[0] * visibleView) + pixelSizeVw;
        n.style.marginTop = (mob.pos[1] * visibleView) + pixelSizeVw;
        wrapper.appendChild(n);


        draw_c(n.id)
    }
}

function draw_c(id) {

    let с_canvas = document.getElementById(id);
    let с_context = с_canvas.getContext("2d");
    с_context.drawImage(img, 224, 289, 32, 32, 0, 0, 66 * 4, 66 * 2);

}
//ходим мобами случайно
function allMobsMovement() {
    function randomDirection() {
        let direction = randomInteger(1, 2, 3); //+ или минус 0
        switch (direction) {
            case 1:
                pos = 1;
                break;
            case 2:
                pos = -1;
                break;
            case 3:
                pos = 0;
                break;
        }
        return pos

    }
    let directionXorY = randomInteger(1, 2, 3);
    switch (directionXorY) {
        case 1:
            mobs.forEach(element => element.movement(element.pos[0] + randomDirection(), element.pos[1]))

            break;

        case 2:
            mobs.forEach(element => element.movement(element.pos[0], element.pos[1] + randomDirection()))

            break;
        case 3:
            break;
    }
    sessionStorage.setItem("player", JSON.stringify(playerObj));
}


//слуйчайное число от 0 до 9 для размещения объектов рандомно
function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.round(rand);
}


function showLayer() {

    playerObj = {
        pos: [0, 0],
        totalHP: 30,
        currentHP: 30,
        attack: 5,
        killsCounter: 0,

    };


    myLayer = document.createElement('canvas');
    myLayer.id = 'char';
    myLayer.style.position = 'absolute';
    myLayer.style.width = (visibleView) + pixelSizeVw;
    myLayer.style.height = (visibleView) + pixelSizeVw;
    myLayer.style.display = 'block';
    myLayer.style.zIndex = 99;
    wrapper.appendChild(myLayer);


    //отрисовывыем тайл игрока
    function draw_b() {
        var b_canvas = document.getElementById("char");
        var b_context = b_canvas.getContext("2d");
        b_context.drawImage(img, 31, 0, 32, 32, 0, 0, 66 * 4, 66 * 2);
    }
    draw_b()
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

    if (thisMobObj.currentHP <= 0) {
        thisMobObj.status = 'died';
        playerObj.killsCounter = playerObj.killsCounter + 1;

        if (playerObj.killsCounter == mobs.length) {
            winning()
        }
        mobDiv.style.display = 'none';

    }

}

function winning() {
    $('#exampleModal').modal('show')
}


function getMob(name) {
    return mobName => mobName.name === name;
}


//ходим бродим, если есть моб- атакуем
function checkingMobs(e) {

    let char = document.getElementById("char");
    let left = Math.ceil(playerObj.pos[0] * pixelSize);
    let top = Math.ceil(playerObj.pos[1] * pixelSize);
    let checkMobLeft = check(playerObj.pos[0] - 1, playerObj.pos[1]) || checkAvailable(walls, playerObj.pos[0] - 1, playerObj.pos[1]);
    let checkMobRight = check(playerObj.pos[0] + 1, playerObj.pos[1]) || checkAvailable(walls, playerObj.pos[0] + 1, playerObj.pos[1]);
    let checkMobUp = check(playerObj.pos[0], playerObj.pos[1] - 1) || checkAvailable(walls, playerObj.pos[0], playerObj.pos[1] - 1);
    let checkMobDown = check(playerObj.pos[0], playerObj.pos[1] + 1) || checkAvailable(walls, playerObj.pos[0], playerObj.pos[1] + 1);
    switch (e.keyCode) {

        case 37: // если нажата клавиша влево
            if (left > 0 && checkMobLeft == false) {
                playerObj.pos[0] = playerObj.pos[0] - 1;
                char.style.marginLeft = (playerObj.pos[0] * visibleView) + pixelSizeVw;

            } else if (checkMobLeft == true) {
                let mobId = String("mob" + Number(playerObj.pos[0] - 1) + Number(playerObj.pos[1]));

                attack(mobId);

            }

            break;

        case 38: // если нажата клавиша вверх
            if (top > 0 && checkMobUp == false) {
                playerObj.pos[1] = playerObj.pos[1] - 1;
                char.style.marginTop = (playerObj.pos[1] * visibleView) + pixelSizeVw;
            } else if (checkMobUp == true) {
                let mobId = String("mob" + Number(playerObj.pos[0]) + Number(playerObj.pos[1] - 1));

                attack(mobId);
            }

            break;
        case 39: // если нажата клавиша вправо
            if (left < (pixelSize * 9) && checkMobRight == false) {
                playerObj.pos[0] = playerObj.pos[0] + 1;
                char.style.marginLeft = (playerObj.pos[0] * visibleView) + pixelSizeVw;
            } else if (checkMobRight == true) {
                let mobId = String("mob" + Number(playerObj.pos[0] + 1) + Number(playerObj.pos[1]));
                attack(mobId);
            }
            break;
        case 40: // если нажата клавиша вниз
            if (top < (pixelSize * 9) && checkMobDown == false) {
                playerObj.pos[1] = playerObj.pos[1] + 1;
                char.style.marginTop = (playerObj.pos[1] * visibleView) + pixelSizeVw;
            } else if (checkMobDown == true) {
                let mobId = String("mob" + Number(playerObj.pos[0]) + Number(playerObj.pos[1] + 1));

                attack(mobId);
            }
            break;
    }
    allMobsMovement()
    healthBarChange()


}

addEventListener("keydown", checkingMobs);


//симуляция нажатия клавиш

function simulateKey(keyCode, type, modifiers) {
    var evtName = (typeof(type) === "string") ? "key" + type : "keydown";
    var modifier = (typeof(modifiers) === "object") ? modifier : {};

    var event = document.createEvent("HTMLEvents");
    event.initEvent(evtName, true, false);
    event.keyCode = keyCode;

    for (var i in modifiers) {
        event[i] = modifiers[i];
    }

    document.dispatchEvent(event);
}


//передвижения по клику мыши
document.getElementById('wrapper').onclick = function(e) {
    let x = e.offsetX == undefined ? e.layerX : e.offsetX;
    let y = e.offsetY == undefined ? e.layerY : e.offsetY;
    let cellSize = document.querySelector('#field').offsetWidth / 10;
    let xCoords = Math.ceil(x / cellSize - 1);
    let yCoords = Math.ceil(y / cellSize - 1);
    console.log(cellSize)




    window.onclick = function(e) {

        let mobId = e ? e.target : window.event.srcElement;
        return mobId;


    }


    if (xCoords === 0 && yCoords === 0) {
        window.onclick = function(e) {

            mobId = e ? e.target : window.event.srcElement;
            if (mobId.id === String("mob" + Number(playerObj.pos[0] - 1) + Number(playerObj.pos[1]))) {
                simulateKey(37)

            }
            if (mobId.id === String("mob" + Number(playerObj.pos[0] + 1) + Number(playerObj.pos[1]))) {
                simulateKey(39)
            }

            if (mobId.id === String("mob" + Number(playerObj.pos[0]) + Number(playerObj.pos[1] + 1))) {
                simulateKey(40)
            }
            if (mobId.id === String("mob" + Number(playerObj.pos[0]) + Number(playerObj.pos[1] - 1))) {
                simulateKey(38)
            }

        }



    }

    if (xCoords > playerObj.pos[0] && xCoords < playerObj.pos[0] + 2 && yCoords == playerObj.pos[1]) {
        simulateKey(39)

    }
    if (xCoords < playerObj.pos[0] && xCoords > playerObj.pos[0] - 2 && yCoords == playerObj.pos[1]) {
        simulateKey(37)

    }
    if (yCoords > playerObj.pos[1] && yCoords < playerObj.pos[1] + 2 && xCoords == playerObj.pos[0]) {
        simulateKey(40)

    }
    if (yCoords < playerObj.pos[1] && yCoords > playerObj.pos[1] - 2 && xCoords == playerObj.pos[0]) {
        simulateKey(38)

    }

    healthBarChange()

};