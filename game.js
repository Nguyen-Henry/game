import "/engine/engine.js"
//-----------------------------------------------------
//Start

class Global {
    lives = 3
}

class StartController extends Component {
    start() {
        this.freezeTime = 0
        this.maxFreezeTime = 1
    }
    update() {
        this.freezeTime += 25 / 1000
        if (keysDown[" "] && this.freezeTime >= this.maxFreezeTime) {
            SceneManager.changeScene(1)
        }
    }
}

class StartDrawComponent extends Component {
    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "40px Courier"
        ctx.fillText("Welcome to Walmart Undertale", 100, 100);
        ctx.fillText("Press space to start", 100, 200);
        ctx.fillText("Press p to pause", 100, 250);
        ctx.fillText("Orange attack = move", 100, 300);
        ctx.fillText("Blue attack = don't move", 100, 350);
    }
}

class StartControllerGameObject extends GameObject {
    start() {
        this.addComponent(new StartController())
    }

}

class StartDrawGameObject extends GameObject {
    start() {
        this.addComponent(new StartDrawComponent());
    }

}

class StartScene extends Scene {
    constructor() {
        super("black")
    }
    start() {
        this.addGameObject(new StartControllerGameObject())
        this.addGameObject(new StartDrawGameObject())
    }
}

//-----------------------------------------------------
//Main

class WallsComponent extends Component {
    name = "WallsComponent"
    start() {
        this.margin = 50
        this.size = 200
    }
    draw(ctx) {
        ctx.strokeStyle = "black"
        ctx.beginPath()
        ctx.moveTo(this.margin, this.margin)
        ctx.lineTo(this.margin + this.size, this.margin)
        ctx.lineTo(this.margin + this.size, this.margin + this.size)
        ctx.lineTo(this.margin, this.margin + this.size)
        ctx.lineTo(this.margin, this.margin)
        ctx.stroke()
    }
}

class LivesComponent extends Component {
    name = "LivesComponent"
    start() {
        this.lives = 3
    }
    update() {
        this.parent.getComponent("Text").string = "Lives: " + this.lives
        if (this.lives == 0) {
            SceneManager.changeScene(2)
        }
    }
}
class Attack1Component extends Component {
    name = "Attack1Component"
    start() {
        this.margin = 50
        this.size = 200
        this.numLasers = 2
        this.warningX = 50
        this.warningY = 50
        this.laserX = 50
        this.laserY = this.size
        this.timer = 0
        this.interval = 0
        this.attacks = []
        this.turn = false
    }
    update() {
        if (this.turn) {
            this.timer++
            if (this.timer % 12 == 0) {
                this.interval++
            }
        }
    }
    draw(ctx) {
        if (this.turn) {
            // Phase 1 Attack
            // Warning Attack
            if (this.interval == 3) {
                ctx.strokeStyle = "black"
                ctx.fillStyle = "black"
                // Horizontal lasers
                for (let i = 0; i < this.numLasers; i++) {
                    ctx.strokeRect(0, this.margin + (i * (this.size - this.margin)), this.warningX, this.warningY)
                    ctx.fillRect(this.warningX / 2 - 2, this.margin + 30 + (i * (this.size - this.margin)), 5, 5)
                    ctx.fillRect(this.warningX / 2 - 2, this.margin + 15 + (i * (this.size - this.margin)), 5, 10)
                }

                // Vertical Lasers
                for (let i = 0; i < this.numLasers; i++) {
                    ctx.strokeRect(this.margin + (i * (this.size - this.margin)), this.margin + this.size, this.warningX, this.warningY)
                    ctx.fillRect(this.warningX / 2 - 2 + this.margin + (i * (this.size - this.margin)), this.margin + 30 + this.size, 5, 5)
                    ctx.fillRect(this.warningX / 2 - 2 + this.margin + (i * (this.size - this.margin)), this.margin + 15 + this.size, 5, 10)
                }
            }

            // Actual Attack
            ctx.fillStyle = "red"
            if (this.interval == 4) {
                // Horizontal Lasers
                for (let i = 0; i < this.numLasers; i++) {
                    ctx.fillRect(this.margin, this.margin + (i * (this.size - this.margin)), this.laserY, this.laserX)
                    var attack = {
                        x: this.margin,
                        y: this.margin + (i * (this.size - this.margin)),
                        width: this.laserY,
                        height: this.laserX
                    }
                    this.attacks.push(attack)
                }

                //Vertical Lasers
                for (let i = 0; i < this.numLasers; i++) {
                    ctx.fillRect(this.margin + (i * (this.size - this.margin)), this.margin, this.laserX, this.laserY)
                    var attack = {
                        x: this.margin + (i * (this.size - this.margin)),
                        y: this.margin,
                        width: this.laserX,
                        height: this.laserY
                    }
                    this.attacks.push(attack)
                }
            }

            // Phase 2 Attack
            // Warning Attack
            if (this.interval == 5) {
                ctx.strokeStyle = "black"
                ctx.fillStyle = "black"

                // Horizontal Lasers
                ctx.strokeRect(0, this.size / 2 + this.margin / 2, this.warningX, this.warningY)
                ctx.fillRect(this.warningX / 2 - 2, 30 + this.size / 2 + this.margin / 2, 5, 5)
                ctx.fillRect(this.warningX / 2 - 2, 15 + this.size / 2 + this.margin / 2, 5, 10)

                // Vertical lasers
                ctx.strokeRect(this.size / 2 + this.margin / 2, this.margin + this.size, this.warningX, this.warningY)
                ctx.fillRect(this.warningX / 2 - 2 + this.size / 2 + this.margin / 2, 30 + this.margin + this.size, 5, 5)
                ctx.fillRect(this.warningX / 2 - 2 + this.size / 2 + this.margin / 2, 15 + this.margin + this.size, 5, 10)
                this.attacks = []
            }

            // Actual Attack
            ctx.fillStyle = "red"
            if (this.interval == 6) {
                // Horizontal Lasers
                ctx.fillRect(this.margin, this.size / 2 + this.margin / 2, this.laserY, this.laserX)
                var attack = {
                    x: this.margin,
                    y: this.size / 2 + this.margin / 2,
                    width: this.laserY,
                    height: this.laserX
                }
                this.attacks.push(attack)

                //Vertical Lasers
                ctx.fillRect(this.size / 2 + this.margin / 2, this.margin, this.laserX, this.laserY)
                var attack = {
                    x: this.size / 2 + this.margin / 2,
                    y: this.margin,
                    width: this.laserX,
                    height: this.laserY
                }
                this.attacks.push(attack)
            }

            // Phase 3 Attack
            // Warning Attack
            if (this.interval == 7) {
                ctx.strokeStyle = "black"
                ctx.fillStyle = "black"

                // Horizontal Lasers
                for (let i = 0; i < this.numLasers; i++) {
                    ctx.strokeRect(0, this.margin * 2 + 100 * i, this.warningX, this.warningY)
                    ctx.fillRect(this.warningX / 2 - 2, 30 + this.margin * 2 + (100 * i), 5, 5)
                    ctx.fillRect(this.warningX / 2 - 2, 15 + this.margin * 2 + (100 * i), 5, 10)

                    // Vertical lasers
                    ctx.strokeRect(this.margin * 2 + 100 * i, this.margin + this.size, this.warningX, this.warningY)
                    ctx.fillRect(this.warningX / 2 - 2 + this.margin * 2 + 100 * i, 30 + this.margin + this.size, 5, 5)
                    ctx.fillRect(this.warningX / 2 - 2 + this.margin * 2 + 100 * i, 15 + this.margin + this.size, 5, 10)
                }
                this.attacks = []
            }

            // Actual Attack
            ctx.fillStyle = "red"
            if (this.interval == 8) {
                // Horizontal Lasers
                for (let i = 0; i < this.numLasers; i++) {
                    ctx.fillRect(this.margin, this.margin * 2 + 100 * i, this.laserY, this.laserX)
                    var attack = {
                        x: this.margin,
                        y: this.margin * 2 + 100 * i,
                        width: this.laserY,
                        height: this.laserX
                    }
                    this.attacks.push(attack)
                }

                //Vertical Lasers
                for (let i = 0; i < this.numLasers; i++) {
                    ctx.fillRect(this.margin * 2 + 100 * i, this.margin, this.laserX, this.laserY)
                    var attack = {
                        x: this.margin * 2 + 100 * i,
                        y: this.margin,
                        width: this.laserX,
                        height: this.laserY
                    }
                    this.attacks.push(attack)
                }
            }

            if (this.interval == 9) {
                this.interval = 0;
                let playerGameObject = GameObject.getObjectByName("PlayerComponent");
                let playerComponent = playerGameObject.getComponent("PlayerComponent");
                playerComponent.hitInterval = 0
                this.attacks = []

                let attackControllerGameObject = GameObject.getObjectByName("AttacksController");
                let attackControllerComponent = attackControllerGameObject.getComponent("AttacksController");
                attackControllerComponent.randomAttack = undefined
                this.turn = false
            }
        }
    }
}

class Attack2Component extends Component {
    name = "Attack2Component"
    start() {
        this.attacks = []
        this.margin = 50
        this.size = 200
        this.numLasers = 4
        this.warningX = 25
        this.warningY = 25
        this.laserX = 25
        this.laserY = this.size
        this.timer = 0
        this.interval = 0;
        this.turn = false;
    }
    update() {
        if (this.turn) {
            this.timer++
            if (this.timer % 8 == 0) {
                this.interval++
            }
        }
    }
    draw(ctx) {
        if (this.turn) {
            // Phase 1 Attack
            // Warning Attack
            if (this.interval == 3) {
                ctx.strokeStyle = "black"
                ctx.fillStyle = "black"
                for (let i = 0; i < this.numLasers; i++) {
                    ctx.strokeRect(this.margin + 50 * i, this.margin + this.size - this.warningY, this.warningX, this.warningY)
                    ctx.fillRect(this.margin + 50 * i + 10, this.margin + this.size - (this.warningY / 2 - 4), 5, 5)
                    ctx.fillRect(this.margin + 50 * i + 10, this.margin + this.size - (this.warningY / 2 + 10), 5, 10)
                }
            }

            // Actual Attack
            ctx.fillStyle = "red"
            if (this.interval == 4) {
                for (let i = 0; i < this.numLasers; i++) {
                    ctx.fillRect(this.margin + 50 * i, this.margin, this.laserX, this.laserY)
                    var attack = {
                        x: this.margin + 50 * i,
                        y: this.margin,
                        width: this.laserX,
                        height: this.laserY
                    }
                    this.attacks.push(attack)
                }
            }

            // Warning Attack
            if (this.interval == 5) {
                ctx.strokeStyle = "black"
                ctx.fillStyle = "black"
                for (let i = 0; i < this.numLasers; i++) {
                    ctx.strokeRect(this.margin + 50 * i + 25, this.margin + this.size - this.warningY, this.warningX, this.warningY)
                    ctx.fillRect(this.margin + 50 * i + 10 + 25, this.margin + this.size - (this.warningY / 2 - 4), 5, 5)
                    ctx.fillRect(this.margin + 50 * i + 10 + 25, this.margin + this.size - (this.warningY / 2 + 10), 5, 10)
                }
                this.attacks = []
            }

            // Actual Attack
            ctx.fillStyle = "red"
            if (this.interval == 6) {
                for (let i = 0; i < this.numLasers; i++) {
                    ctx.fillRect(this.margin + 50 * i + 25, this.margin, this.laserX, this.laserY)
                    var attack = {
                        x: this.margin + 50 * i + 25,
                        y: this.margin,
                        width: this.laserX,
                        height: this.laserY
                    }
                    this.attacks.push(attack)
                }
            }

            // Warning Attack
            if (this.interval == 7) {
                ctx.strokeStyle = "black"
                ctx.fillStyle = "black"
                for (let i = 0; i < this.numLasers; i++) {
                    ctx.strokeRect(this.margin + 50 * i, this.margin + this.size - this.warningY, this.warningX, this.warningY)
                    ctx.fillRect(this.margin + 50 * i + 10, this.margin + this.size - (this.warningY / 2 - 4), 5, 5)
                    ctx.fillRect(this.margin + 50 * i + 10, this.margin + this.size - (this.warningY / 2 + 10), 5, 10)
                }
            }

            // Actual Attack
            ctx.fillStyle = "red"
            if (this.interval == 8) {
                for (let i = 0; i < this.numLasers; i++) {
                    ctx.fillRect(this.margin + 50 * i, this.margin, this.laserX, this.laserY)
                    var attack = {
                        x: this.margin + 50 * i,
                        y: this.margin,
                        width: this.laserX,
                        height: this.laserY
                    }
                    this.attacks.push(attack)
                }
            }

            // Warning Attack
            if (this.interval == 9) {
                ctx.strokeStyle = "black"
                ctx.fillStyle = "black"
                for (let i = 0; i < this.numLasers; i++) {
                    ctx.strokeRect(this.margin + 50 * i + 25, this.margin + this.size - this.warningY, this.warningX, this.warningY)
                    ctx.fillRect(this.margin + 50 * i + 10 + 25, this.margin + this.size - (this.warningY / 2 - 4), 5, 5)
                    ctx.fillRect(this.margin + 50 * i + 10 + 25, this.margin + this.size - (this.warningY / 2 + 10), 5, 10)
                }
                this.attacks = []
            }

            // Actual Attack
            ctx.fillStyle = "red"
            if (this.interval == 10) {
                for (let i = 0; i < this.numLasers; i++) {
                    ctx.fillRect(this.margin + 50 * i + 25, this.margin, this.laserX, this.laserY)
                    var attack = {
                        x: this.margin + 50 * i + 25,
                        y: this.margin,
                        width: this.laserX,
                        height: this.laserY
                    }
                    this.attacks.push(attack)
                }
            }

            // Phase 2 Attack
            if (this.interval == 11) {
                // Warning Attack
                ctx.strokeStyle = "black"
                ctx.fillStyle = "black"

                ctx.strokeRect(this.margin, this.margin + this.size - this.warningY * 2, this.warningX * 2, this.warningY * 2)
                ctx.fillRect(this.margin + 23, this.margin + this.size - (this.warningY / 2 + 11), 5, 5)
                ctx.fillRect(this.margin + 23, this.margin + this.size - (this.warningY / 2 + 25), 5, 10)

                ctx.strokeRect(this.margin + 100, this.margin + this.size - this.warningY * 2, this.warningX * 2, this.warningY * 2)
                ctx.fillRect(this.margin + 123, this.margin + this.size - (this.warningY / 2 + 11), 5, 5)
                ctx.fillRect(this.margin + 123, this.margin + this.size - (this.warningY / 2 + 25), 5, 10)
                this.attacks = []
            }


            // Actual Attack
            if (this.interval == 12) {
                ctx.fillStyle = "red"
                ctx.fillRect(this.margin, this.margin, this.laserX * 2, this.laserY)
                var attack = {
                    x: this.margin,
                    y: this.margin,
                    width: this.laserX * 2,
                    height: this.laserY
                }
                this.attacks.push(attack)

                ctx.fillRect(this.margin + 100, this.margin, this.laserX * 2, this.laserY)
                var attack = {
                    x: this.margin + 100,
                    y: this.margin,
                    width: this.laserX * 2,
                    height: this.laserY
                }
                this.attacks.push(attack)
            }

            if (this.interval == 13) {
                // Warning Attack
                ctx.strokeStyle = "black"
                ctx.fillStyle = "black"

                ctx.strokeRect(this.margin + 50, this.margin + this.size - this.warningY * 2, this.warningX * 2, this.warningY * 2)
                ctx.fillRect(this.margin + 73, this.margin + this.size - (this.warningY / 2 + 11), 5, 5)
                ctx.fillRect(this.margin + 73, this.margin + this.size - (this.warningY / 2 + 25), 5, 10)

                ctx.strokeRect(this.margin + 150, this.margin + this.size - this.warningY * 2, this.warningX * 2, this.warningY * 2)
                ctx.fillRect(this.margin + 173, this.margin + this.size - (this.warningY / 2 + 11), 5, 5)
                ctx.fillRect(this.margin + 173, this.margin + this.size - (this.warningY / 2 + 25), 5, 10)
                this.attacks = []
            }

            // Actual Attack
            if (this.interval == 14) {
                ctx.fillStyle = "red"
                ctx.fillRect(this.margin + 50, this.margin, this.laserX * 2, this.laserY)
                var attack = {
                    x: this.margin + 50,
                    y: this.margin,
                    width: this.laserX * 2,
                    height: this.laserY
                }
                this.attacks.push(attack)

                ctx.fillRect(this.margin + 150, this.margin, this.laserX * 2, this.laserY)
                var attack = {
                    x: this.margin + 150,
                    y: this.margin,
                    width: this.laserX * 2,
                    height: this.laserY
                }
                this.attacks.push(attack)
            }

            if (this.interval == 15) {
                // Warning Attack
                ctx.strokeStyle = "black"
                ctx.fillStyle = "black"

                ctx.strokeRect(this.margin, this.margin + this.size - this.warningY * 2, this.warningX * 2, this.warningY * 2)
                ctx.fillRect(this.margin + 23, this.margin + this.size - (this.warningY / 2 + 11), 5, 5)
                ctx.fillRect(this.margin + 23, this.margin + this.size - (this.warningY / 2 + 25), 5, 10)

                ctx.strokeRect(this.margin + 100, this.margin + this.size - this.warningY * 2, this.warningX * 2, this.warningY * 2)
                ctx.fillRect(this.margin + 123, this.margin + this.size - (this.warningY / 2 + 11), 5, 5)
                ctx.fillRect(this.margin + 123, this.margin + this.size - (this.warningY / 2 + 25), 5, 10)
                this.attacks = []
            }


            // Actual Attack
            if (this.interval == 16) {
                ctx.fillStyle = "red"
                ctx.fillRect(this.margin, this.margin, this.laserX * 2, this.laserY)
                var attack = {
                    x: this.margin,
                    y: this.margin,
                    width: this.laserX * 2,
                    height: this.laserY
                }
                this.attacks.push(attack)

                ctx.fillRect(this.margin + 100, this.margin, this.laserX * 2, this.laserY)
                var attack = {
                    x: this.margin + 100,
                    y: this.margin,
                    width: this.laserX * 2,
                    height: this.laserY
                }
                this.attacks.push(attack)
            }

            if (this.interval == 17) {
                this.interval = 0;
                this.attacks = []
                let playerGameObject = GameObject.getObjectByName("PlayerComponent");
                let playerComponent = playerGameObject.getComponent("PlayerComponent");
                playerComponent.hitInterval = 0

                let attackControllerGameObject = GameObject.getObjectByName("AttacksController");
                let attackControllerComponent = attackControllerGameObject.getComponent("AttacksController");
                attackControllerComponent.randomAttack = undefined
                this.turn = false
            }
        }
    }
}

class Attack3Component extends Component {
    name = "Attack3Component"
    start() {
        this.attacks = []
        this.margin = 50
        this.size = 200
        this.warningY = 25
        this.warningX = 25
        this.laserX = 20
        this.laserY = this.size
        this.timer = 0;
        this.interval = 0;
        this.count = 0;
        this.turn = false;
        this.blue
        this.colors = []
        this.randomIndex
        this.attackNumber = 0
        this.number = 0
    }
    update() {
        if (this.turn) {
            this.timer++
            if (this.timer % 12 == 0) {
                this.interval++;
            }
        }
    }
    draw(ctx) {
        if (this.turn) {
            // Phase 1 Attack
            // Warning
            if (this.interval == 3) {
                ctx.strokeStyle = "blue"
                ctx.fillStyle = "blue"
                this.blue = true

                //x
                ctx.strokeRect(this.margin / 2 - 5, this.margin / 2 + this.size / 2, this.warningX, this.warningY)
                ctx.fillRect(this.margin / 2 + 5, this.margin / 2 + this.size / 2 - (this.warningY / 2 + 11) + 40, 5, 5)
                ctx.fillRect(this.margin / 2 + 5, this.margin / 2 + this.size / 2 - (this.warningY / 2 + 25) + 40, 5, 10)

                //y
                ctx.strokeRect((this.margin + this.size) / 2, this.margin, this.warningX, this.warningY)
                ctx.fillRect((this.margin + this.size) / 2 + 9, this.margin - (this.warningY / 2 + 11) + 40, 5, 5)
                ctx.fillRect((this.margin + this.size) / 2 + 9, this.margin - (this.warningY / 2 + 25) + 40, 5, 10)
            }

            // Blue Attack
            if (this.interval == 4 || this.interval == 5) {
                if (this.count <= 9) {
                    ctx.fillStyle = "blue"
                    ctx.fillRect(this.margin + this.laserX * this.count, this.margin, this.laserX, this.laserY)
                    ctx.fillRect(this.margin, this.margin + this.laserX * this.count, this.laserY, this.laserX)
                    if (this.timer % 2 == 0) {
                        this.count++
                        this.attacks = []
                    }
                    var attack = {
                        x: this.margin + this.laserX * this.count,
                        y: this.margin,
                        width: this.laserX,
                        height: this.laserY
                    }
                    this.attacks.push(attack)
                }
            }

            // Phase 2 Attack
            // Warning
            if (this.interval == 6) {
                ctx.strokeStyle = "orange"
                ctx.fillStyle = "orange"
                this.blue = false

                //x
                ctx.strokeRect(this.margin / 2 - 5, this.margin / 2 + this.size / 2, this.warningX, this.warningY)
                ctx.fillRect(this.margin / 2 + 5, this.margin / 2 + this.size / 2 - (this.warningY / 2 + 11) + 40, 5, 5)
                ctx.fillRect(this.margin / 2 + 5, this.margin / 2 + this.size / 2 - (this.warningY / 2 + 25) + 40, 5, 10)

                //y
                ctx.strokeRect((this.margin + this.size) / 2, this.margin, this.warningX, this.warningY)
                ctx.fillRect((this.margin + this.size) / 2 + 9, this.margin - (this.warningY / 2 + 11) + 40, 5, 5)
                ctx.fillRect((this.margin + this.size) / 2 + 9, this.margin - (this.warningY / 2 + 25) + 40, 5, 10)
                this.count = 0
            }

            // Orange Attack
            if (this.interval == 7 || this.interval == 8) {
                if (this.count <= 9) {
                    ctx.fillStyle = "orange"
                    ctx.fillRect(this.margin + this.laserX * this.count, this.margin, this.laserX, this.laserY)
                    ctx.fillRect(this.margin, this.margin + this.laserX * this.count, this.laserY, this.laserX)
                    if (this.timer % 2 == 0) {
                        this.count++
                        this.attacks = []
                    }
                    var attack = {
                        x: this.margin + this.laserX * this.count,
                        y: this.margin,
                        width: this.laserX,
                        height: this.laserY
                    }
                    this.attacks.push(attack)
                }
            }

            // Warnings
            if (this.interval == 9) {
                if (this.attackNumber == 0) {
                    this.randomIndex = Math.floor(Math.random() * 2)
                    this.attackNumber += 1
                    this.number += 1
                    if (this.randomIndex == 0) {
                        this.colors.push("blue")
                    }
                    else {
                        this.colors.push("orange")
                    }
                }

                if (this.randomIndex == 0) {
                    ctx.strokeStyle = "blue"
                    ctx.fillStyle = "blue"
                }

                else {
                    ctx.strokeStyle = "orange"
                    ctx.fillStyle = "orange"
                }

                ctx.strokeRect((this.margin + this.size) / 2, this.margin - 25, this.warningX, this.warningY)
                ctx.fillRect((this.margin + this.size) / 2 + 9, this.margin - 25 - (this.warningY / 2 + 11) + 40, 5, 5)
                ctx.fillRect((this.margin + this.size) / 2 + 9, this.margin - 25 - (this.warningY / 2 + 25) + 40, 5, 10)
                ctx.fillText(this.number, (this.margin + this.size) / 2 + 9, this.margin - 30);
            }

            if (this.interval == 10) {
                if (this.attackNumber == 1) {
                    this.randomIndex = Math.floor(Math.random() * 2)
                    this.attackNumber += 1
                    this.number += 1

                    if (this.randomIndex == 0) {
                        this.colors.push("blue")
                    }
                    else {
                        this.colors.push("orange")
                    }
                }

                if (this.randomIndex == 0) {
                    ctx.strokeStyle = "blue"
                    ctx.fillStyle = "blue"
                }

                else {
                    ctx.strokeStyle = "orange"
                    ctx.fillStyle = "orange"
                }

                ctx.strokeRect((this.margin + this.size) / 2, this.margin - 25, this.warningX, this.warningY)
                ctx.fillRect((this.margin + this.size) / 2 + 9, this.margin - 25 - (this.warningY / 2 + 11) + 40, 5, 5)
                ctx.fillRect((this.margin + this.size) / 2 + 9, this.margin - 25 - (this.warningY / 2 + 25) + 40, 5, 10)
                ctx.fillText(this.number, (this.margin + this.size) / 2 + 9, this.margin - 30);
            }

            if (this.interval == 11) {
                if (this.attackNumber == 2) {
                    this.randomIndex = Math.floor(Math.random() * 2)
                    this.attackNumber += 1
                    this.number += 1
                    if (this.randomIndex == 0) {
                        this.colors.push("blue")
                    }
                    else {
                        this.colors.push("orange")
                    }
                }

                if (this.randomIndex == 0) {
                    ctx.strokeStyle = "blue"
                    ctx.fillStyle = "blue"
                }

                else {
                    ctx.strokeStyle = "orange"
                    ctx.fillStyle = "orange"
                }

                ctx.strokeRect((this.margin + this.size) / 2, this.margin - 25, this.warningX, this.warningY)
                ctx.fillRect((this.margin + this.size) / 2 + 9, this.margin - 25 - (this.warningY / 2 + 11) + 40, 5, 5)
                ctx.fillRect((this.margin + this.size) / 2 + 9, this.margin - 25 - (this.warningY / 2 + 25) + 40, 5, 10)
                ctx.fillText(this.number, (this.margin + this.size) / 2 + 9, this.margin - 30);
            }

            if (this.interval == 12) {
                if (this.attackNumber == 3) {
                    this.randomIndex = Math.floor(Math.random() * 2)
                    this.attackNumber += 1
                    this.number += 1

                    if (this.randomIndex == 0) {
                        this.colors.push("blue")
                    }
                    else {
                        this.colors.push("orange")
                    }
                }

                if (this.randomIndex == 0) {
                    ctx.strokeStyle = "blue"
                    ctx.fillStyle = "blue"
                }

                else {
                    ctx.strokeStyle = "orange"
                    ctx.fillStyle = "orange"
                }

                ctx.strokeRect((this.margin + this.size) / 2, this.margin - 25, this.warningX, this.warningY)
                ctx.fillRect((this.margin + this.size) / 2 + 9, this.margin - 25 - (this.warningY / 2 + 11) + 40, 5, 5)
                ctx.fillRect((this.margin + this.size) / 2 + 9, this.margin - 25 - (this.warningY / 2 + 25) + 40, 5, 10)
                ctx.fillText(this.number, (this.margin + this.size) / 2 + 9, this.margin - 30);
            }

            if (this.interval == 13) {
                if (this.attackNumber == 4) {
                    this.randomIndex = Math.floor(Math.random() * 2)
                    this.attackNumber += 1
                    this.number += 1

                    if (this.randomIndex == 0) {
                        this.colors.push("blue")
                    }
                    else {
                        this.colors.push("orange")
                    }
                }

                if (this.randomIndex == 0) {
                    ctx.strokeStyle = "blue"
                    ctx.fillStyle = "blue"
                }

                else {
                    ctx.strokeStyle = "orange"
                    ctx.fillStyle = "orange"
                }

                ctx.strokeRect((this.margin + this.size) / 2, this.margin - 25, this.warningX, this.warningY)
                ctx.fillRect((this.margin + this.size) / 2 + 9, this.margin - 25 - (this.warningY / 2 + 11) + 40, 5, 5)
                ctx.fillRect((this.margin + this.size) / 2 + 9, this.margin - 25 - (this.warningY / 2 + 25) + 40, 5, 10)
                ctx.fillText(this.number, (this.margin + this.size) / 2 + 9, this.margin - 30);
            }

            // Attacks
            if (this.interval == 14) {
                if (this.attackNumber == 5) {
                    this.attackNumber += 1
                    this.number = 1
                }
                if (this.colors[0] == "blue") {
                    ctx.strokeStyle = "blue"
                    ctx.fillStyle = "blue"
                    this.blue = true
                }

                if (this.colors[0] == "orange") {
                    ctx.strokeStyle = "orange"
                    ctx.fillStyle = "orange"
                    this.blue = false
                }

                ctx.fillRect(this.margin, this.margin, this.size, this.size)
                var attack = {
                    x: this.margin,
                    y: this.margin,
                    width: this.size,
                    height: this.size
                }
                this.attacks.push(attack)
                ctx.fillText(this.number, (this.margin + this.size) / 2 + 9, this.margin - 30)
            }

            if (this.interval == 15) {
                this.attacks = []
            }

            if (this.interval == 16) {
                if (this.attackNumber == 6) {
                    this.attackNumber += 1
                    this.number += 1
                    this.colors.shift()
                }

                if (this.colors[0] == "blue") {
                    ctx.strokeStyle = "blue"
                    ctx.fillStyle = "blue"
                    this.blue = true
                }

                if (this.colors[0] == "orange") {
                    ctx.strokeStyle = "orange"
                    ctx.fillStyle = "orange"
                    this.blue = false
                }

                ctx.fillRect(this.margin, this.margin, this.size, this.size)
                var attack = {
                    x: this.margin,
                    y: this.margin,
                    width: this.size,
                    height: this.size
                }
                this.attacks.push(attack)
                ctx.fillText(this.number, (this.margin + this.size) / 2 + 9, this.margin - 30)
            }

            if (this.interval == 17) {
                this.attacks = []
            }

            if (this.interval == 18) {
                if (this.attackNumber == 7) {
                    this.attackNumber += 1
                    this.number += 1
                    this.colors.shift()
                }

                if (this.colors[0] == "blue") {
                    ctx.strokeStyle = "blue"
                    ctx.fillStyle = "blue"
                    this.blue = true
                }

                if (this.colors[0] == "orange") {
                    ctx.strokeStyle = "orange"
                    ctx.fillStyle = "orange"
                    this.blue = false
                }

                ctx.fillRect(this.margin, this.margin, this.size, this.size)
                var attack = {
                    x: this.margin,
                    y: this.margin,
                    width: this.size,
                    height: this.size
                }
                this.attacks.push(attack)
                ctx.fillText(this.number, (this.margin + this.size) / 2 + 9, this.margin - 30)
            }

            if (this.interval == 19) {
                this.attacks = []
            }

            if (this.interval == 20) {
                if (this.attackNumber == 8) {
                    this.attackNumber += 1
                    this.number += 1
                    this.colors.shift()
                }

                if (this.colors[0] == "blue") {
                    ctx.strokeStyle = "blue"
                    ctx.fillStyle = "blue"
                    this.blue = true
                }

                if (this.colors[0] == "orange") {
                    ctx.strokeStyle = "orange"
                    ctx.fillStyle = "orange"
                    this.blue = false
                }

                ctx.fillRect(this.margin, this.margin, this.size, this.size)
                var attack = {
                    x: this.margin,
                    y: this.margin,
                    width: this.size,
                    height: this.size
                }
                this.attacks.push(attack)
                ctx.fillText(this.number, (this.margin + this.size) / 2 + 9, this.margin - 30)
            }

            if (this.interval == 21) {
                this.attacks = []
            }

            if (this.interval == 22) {
                if (this.attackNumber == 9) {
                    this.attackNumber += 1
                    this.number += 1
                    this.colors.shift()
                }

                if (this.colors[0] == "blue") {
                    ctx.strokeStyle = "blue"
                    ctx.fillStyle = "blue"
                    this.blue = true
                }

                if (this.colors[0] == "orange") {
                    ctx.strokeStyle = "orange"
                    ctx.fillStyle = "orange"
                    this.blue = false
                }

                ctx.fillRect(this.margin, this.margin, this.size, this.size)
                var attack = {
                    x: this.margin,
                    y: this.margin,
                    width: this.size,
                    height: this.size
                }
                this.attacks.push(attack)
                ctx.fillText(this.number, (this.margin + this.size) / 2 + 9, this.margin - 30)
            }
            if (this.interval == 23) {
                this.attacks = []
            }

            if (this.interval == 24) {
                this.interval = 0
                this.count = 0
                let playerGameObject = GameObject.getObjectByName("PlayerComponent");
                let playerComponent = playerGameObject.getComponent("PlayerComponent");
                playerComponent.hitInterval = 0
                this.attacks = []

                let attackControllerGameObject = GameObject.getObjectByName("AttacksController");
                let attackControllerComponent = attackControllerGameObject.getComponent("AttacksController");
                attackControllerComponent.randomAttack = undefined
                this.turn = false
            }
        }
    }
}

class Attack4Component extends Component {
    name = "Attack4Component"
    start() {
        this.attacks = []
        this.margin = 50
        this.size = 200
        this.numLasers = 4
        this.warningX = 25
        this.warningY = 25
        this.laserX = 25
        this.laserY = this.size
        this.timer = 0
        this.interval = 0
        this.turn = true
        this.tempPlayerX = 0
        this.attackReset = true
        this.randomIndex
    }
    
    update() {
        if (this.turn) {
            this.timer++
            if (this.timer % 12 == 0) {
                this.interval++
            }
        }
    }

    draw(ctx) {
        if (this.turn) {
            let playerGameObject = GameObject.getObjectByName("PlayerComponent")
            let playerComponent = playerGameObject.getComponent("PlayerComponent")
            let playerX = playerComponent.transform.x

            if (this.interval >= 3 && this.interval <= 12) {
                // Warning Attack
                if (this.interval % 2 == 1) {
                    ctx.strokeStyle = "black"
                    ctx.fillStyle = "black"
                    if (this.tempPlayerX != 0 && this.attackReset) {
                        this.tempPlayerX = 0
                        this.attacks = []
                        this.attackReset = false
                    }

                    if (this.tempPlayerX == 0) {
                        this.tempPlayerX = playerX - 12
                    }

                    ctx.strokeRect(this.tempPlayerX, this.margin + this.size - this.warningY, this.warningX, this.warningY)
                    ctx.fillRect(this.tempPlayerX + 10, this.margin + this.size - (this.warningY / 2 - 4), 5, 5)
                    ctx.fillRect(this.tempPlayerX + 10, this.margin + this.size - (this.warningY / 2 + 10), 5, 10)
                }

                else {
                    // Actual Attack
                    ctx.fillStyle = "red"
                    ctx.fillRect(this.tempPlayerX, this.margin, this.laserX, this.laserY)
                    var attack = {
                        x: this.tempPlayerX,
                        y: this.margin,
                        width: this.laserX,
                        height: this.laserY
                    }
                    this.attacks.push(attack)
                    this.attackReset = true;
                }
            }

            if (this.interval >= 13 && this.interval <= 28) {
                // Warning Attack
                if (this.interval % 2 == 1) {
                    ctx.fillStyle = "yellow"

                    if (this.tempPlayerX != 0 && this.attackReset) {
                        this.tempPlayerX = 0
                        this.attacks = []
                        this.attackReset = false
                        this.randomIndex = Math.floor(Math.random() * 2)
                    }

                    if (this.randomIndex == 0) {
                        if (this.tempPlayerX == 0) {
                            this.tempPlayerX = playerX - 2
                        }

                        ctx.fillRect(this.tempPlayerX, this.margin, 2, this.size * 2)
                        ctx.fillRect(this.tempPlayerX - 30, this.margin, 2, this.size * 2)
                        ctx.fillRect(this.tempPlayerX + 30, this.margin, 2, this.size * 2)
                    }
                    else {
                        if (this.tempPlayerX == 0) {
                            this.tempPlayerX = playerX - 2
                        }

                        ctx.fillRect(this.tempPlayerX + 15, this.margin, 2, this.size * 2)
                        ctx.fillRect(this.tempPlayerX - 15, this.margin, 2, this.size * 2)
                        ctx.fillRect(this.tempPlayerX + 45, this.margin, 2, this.size * 2)
                        ctx.fillRect(this.tempPlayerX - 45, this.margin, 2, this.size * 2)
                    }
                }

                else {
                    // Actual Attack
                    if (this.randomIndex == 0) {
                        ctx.fillStyle = "red"
                        ctx.fillRect(this.tempPlayerX, this.margin, 2, this.size * 2)
                        var attack = {
                            x: this.tempPlayerX,
                            y: this.margin,
                            width: 2,
                            height: this.size * 2
                        }
                        this.attacks.push(attack)

                        ctx.fillRect(this.tempPlayerX + 30, this.margin, 2, this.size * 2)
                        var attack = {
                            x: this.tempPlayerX + 30,
                            y: this.margin,
                            width: 2,
                            height: this.size * 2
                        }
                        this.attacks.push(attack)

                        ctx.fillRect(this.tempPlayerX - 30, this.margin, 2, this.size * 2)
                        var attack = {
                            x: this.tempPlayerX - 30,
                            y: this.margin,
                            width: 2,
                            height: this.size * 2
                        }
                        this.attacks.push(attack)
                    }
                    else{
                        ctx.fillStyle = "red"
                        ctx.fillRect(this.tempPlayerX - 15, this.margin, 2, this.size * 2)
                        var attack = {
                            x: this.tempPlayerX - 15,
                            y: this.margin,
                            width: 2,
                            height: this.size * 2
                        }
                        this.attacks.push(attack)

                        ctx.fillRect(this.tempPlayerX + 15, this.margin, 2, this.size * 2)
                        var attack = {
                            x: this.tempPlayerX + 15,
                            y: this.margin,
                            width: 2,
                            height: this.size * 2
                        }
                        this.attacks.push(attack)

                        ctx.fillRect(this.tempPlayerX - 45, this.margin, 2, this.size * 2)
                        var attack = {
                            x: this.tempPlayerX - 45,
                            y: this.margin,
                            width: 2,
                            height: this.size * 2
                        }
                        this.attacks.push(attack)

                        ctx.fillRect(this.tempPlayerX + 45, this.margin, 2, this.size * 2)
                        var attack = {
                            x: this.tempPlayerX + 45,
                            y: this.margin,
                            width: 2,
                            height: this.size * 2
                        }
                        this.attacks.push(attack)
                    }

                    this.attackReset = true;
                }
            }

            if (this.interval > 29) {
                this.interval = 0;
                this.attacks = []
                let playerGameObject = GameObject.getObjectByName("PlayerComponent");
                let playerComponent = playerGameObject.getComponent("PlayerComponent");
                playerComponent.hitInterval = 0

                let attackControllerGameObject = GameObject.getObjectByName("AttacksController");
                let attackControllerComponent = attackControllerGameObject.getComponent("AttacksController");
                attackControllerComponent.randomAttack = undefined
                this.turn = false
            }
        }
    }
}

class Attack5Component extends Component {
    name = "Attack5Component"
    start() {
        this.margin = 50
        this.size = 200
        this.numLasers = 2
        this.warningX = 50
        this.warningY = 50
        this.laserX = 50
        this.laserY = 50
        this.timer = 0
        this.interval = 0
        this.attacks = []
        this.turn = true
        this.randomx1 = 0
        this.randomx2 = 0
        this.randomx3 = 0
        this.randomx4 = 0
        this.randomx5 = 0
        this.randomy1 = 0
        this.randomy2 = 0
        this.randomy3 = 0
        this.randomy4 = 0
        this.randomy5 = 0
        this.attackReset = true
    }
    update() {
        if (this.turn) {
            this.timer++
            if (this.timer % 15 == 0) {
                this.interval++
            }
        }
    }
    draw(ctx) {
        if (this.turn) {
            if (this.interval >= 3 && this.interval <= 12) {
                // Warning Attack
                if (this.interval % 2 == 1) {
                    ctx.strokeStyle = "black"
                    ctx.fillStyle = "black"

                    if (this.attackReset) {
                        this.randomx1 = Math.random() * (this.margin + this.size) / 2 + this.laserX / 2 + 50
                        this.randomx2 = Math.random() * (this.margin + this.size) / 2 + this.laserX / 2 + 50
                        this.randomx3 = Math.random() * (this.margin + this.size) / 2 + this.laserX / 2 + 50
                        this.randomx4 = Math.random() * (this.margin + this.size) / 2 + this.laserX / 2 + 50
                        this.randomx5 = Math.random() * (this.margin + this.size) / 2 + this.laserX / 2 + 50
                        this.randomy1 = Math.random() * (this.margin + this.size) / 2 + this.laserY + 50
                        this.randomy2 = Math.random() * (this.margin + this.size) / 2 + this.laserY + 50
                        this.randomy3 = Math.random() * (this.margin + this.size) / 2 + this.laserY + 50
                        this.randomy4 = Math.random() * (this.margin + this.size) / 2 + this.laserY + 50
                        this.randomy5 = Math.random() * (this.margin + this.size) / 2 + this.laserY + 50
                        this.attackReset = false
                        this.attacks = []
                    }

                    // random 1
                    ctx.strokeRect(this.randomx1, this.randomy1 - this.warningY, this.warningX, this.warningY)
                    ctx.fillRect(this.randomx1 + 10, this.randomy1 - (this.warningY / 2 - 4), 5, 5)
                    ctx.fillRect(this.randomx1 + 10, this.randomy1 - (this.warningY / 2 + 10), 5, 10)

                    // random 2
                    ctx.strokeRect(this.randomx2, this.randomy2 - this.warningY, this.warningX, this.warningY)
                    ctx.fillRect(this.randomx2 + 10, this.randomy2 - (this.warningY / 2 - 4), 5, 5)
                    ctx.fillRect(this.randomx2 + 10, this.randomy2 - (this.warningY / 2 + 10), 5, 10)

                    // random 3
                    ctx.strokeRect(this.randomx3, this.randomy3 - this.warningY, this.warningX, this.warningY)
                    ctx.fillRect(this.randomx3 + 10, this.randomy3 - (this.warningY / 2 - 4), 5, 5)
                    ctx.fillRect(this.randomx3 + 10, this.randomy3 - (this.warningY / 2 + 10), 5, 10)

                    // random 4
                    ctx.strokeRect(this.randomx4, this.randomy4 - this.warningY, this.warningX, this.warningY)
                    ctx.fillRect(this.randomx4 + 10, this.randomy4 - (this.warningY / 2 - 4), 5, 5)
                    ctx.fillRect(this.randomx4 + 10, this.randomy4 - (this.warningY / 2 + 10), 5, 10)

                    // random 5
                    ctx.strokeRect(this.randomx5, this.randomy5 - this.warningY, this.warningX, this.warningY)
                    ctx.fillRect(this.randomx5 + 10, this.randomy5 - (this.warningY / 2 - 4), 5, 5)
                    ctx.fillRect(this.randomx5 + 10, this.randomy5 - (this.warningY / 2 + 10), 5, 10)
                }

                else {
                    // Actual Attack
                    ctx.fillStyle = "red"

                    // random 1
                    ctx.fillRect(this.randomx1, this.randomy1 - this.warningY, this.laserX, this.laserY)
                    var attack = {
                        x: this.randomx1,
                        y: this.randomy1 - this.warningY,
                        width: this.laserX,
                        height: this.laserY
                    }
                    this.attacks.push(attack)

                    // random 2
                    ctx.fillRect(this.randomx2, this.randomy2 - this.warningY, this.laserX, this.laserY)
                    var attack = {
                        x: this.randomx2,
                        y: this.randomy2 - this.warningY,
                        width: this.laserX,
                        height: this.laserY
                    }
                    this.attacks.push(attack)

                    // random 3
                    ctx.fillRect(this.randomx3, this.randomy3 - this.warningY, this.laserX, this.laserY)
                    var attack = {
                        x: this.randomx3,
                        y: this.randomy3 - this.warningY,
                        width: this.laserX,
                        height: this.laserY
                    }
                    this.attacks.push(attack)

                    // random 4
                    ctx.fillRect(this.randomx4, this.randomy4 - this.warningY, this.laserX, this.laserY)
                    var attack = {
                        x: this.randomx4,
                        y: this.randomy4 - this.warningY,
                        width: this.laserX,
                        height: this.laserY
                    }
                    this.attacks.push(attack)

                    // random 5
                    ctx.fillRect(this.randomx5, this.randomy5 - this.warningY, this.laserX, this.laserY)
                    var attack = {
                        x: this.randomx5,
                        y: this.randomy5 - this.warningY,
                        width: this.laserX,
                        height: this.laserY
                    }

                    this.attacks.push(attack)
                    this.attackReset = true
                }
            }

            if (this.interval == 13) {
                this.interval = 0;
                let playerGameObject = GameObject.getObjectByName("PlayerComponent");
                let playerComponent = playerGameObject.getComponent("PlayerComponent");
                playerComponent.hitInterval = 0
                this.attacks = []

                let attackControllerGameObject = GameObject.getObjectByName("AttacksController");
                let attackControllerComponent = attackControllerGameObject.getComponent("AttacksController");
                attackControllerComponent.randomAttack = undefined
                this.turn = false
            }
        }
    }
}

class PlayerComponent extends Component {
    name = "PlayerComponent"
    start() {
        // Starting Point
        this.margin = 50
        this.size = 200
        this.transform.x = this.margin + this.size / 2
        this.transform.y = this.margin + this.size / 2
        this.pongVX = 3
        this.pongVY = 3
        this.circleRadius = 5;
        this.iFrame = false;
        this.hitInterval = 0;
    }
    update() {
        //Update the player based on input
        if (keysDown["ArrowLeft"]) {
            this.transform.x -= 3
        }
        if (keysDown["ArrowRight"]) {
            this.transform.x += 3
        }
        if (keysDown["ArrowUp"]) {
            this.transform.y -= 3
        }
        if (keysDown["ArrowDown"]) {
            this.transform.y += 3
        }

        // Constrict Movement
        if (this.transform.x < this.margin + 5) {
            this.transform.x = this.transform.x + 3
        }
        if (this.transform.x > this.margin + this.size - 5) {
            this.transform.x = -this.transform.x / 2 + this.margin + this.size + 117
        }
        if (this.transform.y < this.margin + 5) {
            this.transform.y = this.transform.y + 3
        }
        if (this.transform.y > this.margin + this.size - 5) {
            this.transform.y = -this.transform.y / 2 + this.margin + this.size + 117
        }

        // Lives Component
        let livesGameObject = GameObject.getObjectByName("LivesGameObject")
        let livesComponent = livesGameObject.getComponent("LivesComponent")

        // // Hit Detection for Attack1Component -------------------------------------------------
        // let attacks1GameObject = GameObject.getObjectByName("Attack1Component");
        // let attacks1Component = attacks1GameObject.getComponent("Attack1Component");

        // // Handle iFrames
        // if (this.iFrame && this.hitInterval < attacks1Component.interval) {
        //     this.iFrame = false
        // }

        // // Check for hit detection
        // attacks1Component.attacks.forEach(attack => {
        //     var distX = Math.abs(this.transform.x - attack.x - attack.width / 2);
        //     var distY = Math.abs(this.transform.y - attack.y - attack.height / 2);

        //     if (distX <= (attack.width / 2) && !this.iFrame && distY <= (attack.height / 2)) {
        //         livesComponent.lives--
        //         this.iFrame = true
        //         this.hitInterval = attacks1Component.interval + 1
        //     }
        // })

        // // Hit Detection for Attack2Component -------------------------------------------------
        // let attacks2GameObject = GameObject.getObjectByName("Attack2Component");
        // let attacks2Component = attacks2GameObject.getComponent("Attack2Component");

        // // Handle iFrames
        // if (this.iFrame && this.hitInterval < attacks2Component.interval) {
        //     this.iFrame = false
        // }

        // // Check for hit detection
        // attacks2Component.attacks.forEach(attack => {
        //     var distX = Math.abs(this.transform.x - attack.x - attack.width / 2);
        //     var distY = Math.abs(this.transform.y - attack.y - attack.height / 2);

        //     if (distX <= (attack.width / 2) && !this.iFrame && distY <= (attack.height / 2)) {
        //         livesComponent.lives--
        //         this.iFrame = true
        //         this.hitInterval = attacks2Component.interval + 1
        //     }
        // })

        // // Hit Detection for Attack3Component -------------------------------------------------
        // let attacks3GameObject = GameObject.getObjectByName("Attack3Component");
        // let attacks3Component = attacks3GameObject.getComponent("Attack3Component");

        // // Handle iFrames
        // if (this.iFrame && this.hitInterval < attacks3Component.interval) {
        //     this.iFrame = false
        // }

        // // Check for hit detection
        // attacks3Component.attacks.forEach(attack => {
        //     var distX = Math.abs(this.transform.x - attack.x - attack.width / 2);
        //     var distY = Math.abs(this.transform.y - attack.y - attack.height / 2);

        //     if (distX <= (attack.width / 2) && !this.iFrame && distY <= (attack.height / 2)) {
        //         if (attacks3Component.blue && (keysDown["ArrowRight"] || keysDown["ArrowLeft"] || keysDown["ArrowUp"] || keysDown["ArrowDown"])) {
        //             livesComponent.lives--
        //             this.iFrame = true
        //             this.hitInterval = attacks3Component.interval + 1
        //         }

        //         if (!attacks3Component.blue && !(keysDown["ArrowRight"] || keysDown["ArrowLeft"] || keysDown["ArrowUp"] || keysDown["ArrowDown"])) {
        //             livesComponent.lives--
        //             this.iFrame = true
        //             this.hitInterval = attacks3Component.interval + 1
        //         }
        //     }
        // })

        // // Hit Detection for Attack4Component -------------------------------------------------
        // let attacks4GameObject = GameObject.getObjectByName("Attack4Component");
        // let attacks4Component = attacks4GameObject.getComponent("Attack4Component");

        // // Handle iFrames
        // if (this.iFrame && this.hitInterval < attacks4Component.interval) {
        //     this.iFrame = false
        // }

        // // Check for hit detection
        // attacks4Component.attacks.forEach(attack => {
        //     var distX = Math.abs(this.transform.x - attack.x - attack.width / 2);
        //     var distY = Math.abs(this.transform.y - attack.y - attack.height / 2);

        //     if (distX <= (attack.width / 2) && !this.iFrame && distY <= (attack.height / 2)) {
        //         livesComponent.lives--
        //         this.iFrame = true
        //         this.hitInterval = attacks4Component.interval + 1
        //     }
        // })

        // // Hit Detection for Attack5Component -------------------------------------------------
        // let attacks5GameObject = GameObject.getObjectByName("Attack5Component");
        // let attacks5Component = attacks5GameObject.getComponent("Attack5Component");

        // // Handle iFrames
        // if (this.iFrame && this.hitInterval < attacks5Component.interval) {
        //     this.iFrame = false
        // }

        // // Check for hit detection
        // attacks5Component.attacks.forEach(attack => {
        //     var distX = Math.abs(this.transform.x - attack.x - attack.width / 2);
        //     var distY = Math.abs(this.transform.y - attack.y - attack.height / 2);

        //     if (distX <= (attack.width / 2) && !this.iFrame && distY <= (attack.height / 2)) {
        //         livesComponent.lives--
        //         this.iFrame = true
        //         this.hitInterval = attacks5Component.interval + 1
        //     }
        // })
    }
}

class AttacksController extends Component {
    name = "AttacksController"
    start() {
        this.attacksSequence = [];
        this.randomAttack = undefined;
        this.empty = true;
    }

    update() {
        //Attack Sequence
        let attack1GameObject = GameObject.getObjectByName("Attack1Component");
        let attack1Component = attack1GameObject.getComponent("Attack1Component");
        if (!this.attacksSequence.includes(attack1Component) && this.empty) {
            this.attacksSequence.push(attack1Component)
        }

        let attack2GameObject = GameObject.getObjectByName("Attack2Component");
        let attack2Component = attack2GameObject.getComponent("Attack2Component");
        if (!this.attacksSequence.includes(attack2Component) && this.empty) {
            this.attacksSequence.push(attack2Component)
        }

        let attack3GameObject = GameObject.getObjectByName("Attack3Component");
        let attack3Component = attack3GameObject.getComponent("Attack3Component");
        if (!this.attacksSequence.includes(attack3Component) && this.empty) {
            this.attacksSequence.push(attack3Component)
        }

        let attack4GameObject = GameObject.getObjectByName("Attack4Component");
        let attack4Component = attack4GameObject.getComponent("Attack4Component");
        if (!this.attacksSequence.includes(attack4Component) && this.empty) {
            this.attacksSequence.push(attack4Component)
        }

        let attack5GameObject = GameObject.getObjectByName("Attack5Component");
        let attack5Component = attack5GameObject.getComponent("Attack5Component");
        if (!this.attacksSequence.includes(attack5Component) && this.empty) {
            this.attacksSequence.push(attack5Component)
        }

        if (this.randomAttack == undefined) {
            let randomIndex = Math.floor(Math.random() * this.attacksSequence.length)
            this.randomAttack = this.attacksSequence[randomIndex]
        }

        this.empty = false

        this.attacksSequence.forEach(attack => {
            if (attack == this.randomAttack) {
                attack.turn = true
                let index = this.attacksSequence.indexOf(this.randomAttack)
                this.attacksSequence.splice(index, 1)
            }
        })

        let livesGameObject = GameObject.getObjectByName("LivesGameObject");
        let livesComponent = livesGameObject.getComponent("LivesComponent");

        if (this.attacksSequence.length == 0 && this.randomAttack == undefined) {
            Global.lives = livesComponent.lives
            SceneManager.changeScene(3)
        }
    }
}

class MainScene extends Scene {
    constructor() {
        super("white")
    }
    start() {
        // Attacks Code
        // this.addGameObject(new GameObject("Attack1Component").addComponent(new Attack1Component()))
        // this.addGameObject(new GameObject("Attack2Component").addComponent(new Attack2Component()))
        // this.addGameObject(new GameObject("Attack3Component").addComponent(new Attack3Component()))
        this.addGameObject(new GameObject("Attack4Component").addComponent(new Attack4Component()))
        // this.addGameObject(new GameObject("Attack5Component").addComponent(new Attack5Component()))
        // this.addGameObject(new GameObject("AttacksController").addComponent(new AttacksController()))

        // Player code
        let playerComponent = new GameObject("PlayerComponent")
        playerComponent.addComponent(new PlayerComponent())
        let circle = new Circle()
        playerComponent.addComponent(circle)
        circle.fillStyle = "black"
        circle.radius = 5
        this.addGameObject(playerComponent)

        // Walls Code
        this.addGameObject(new GameObject("WallsGameObject").addComponent(new WallsComponent()))

        // Lives code
        this.addGameObject(
            new GameObject("LivesGameObject")
                .addComponent(new LivesComponent())
                .addComponent(new Text("Lives: 3", "black")),
            new Vector2(50, 45))
    }
}



//-----------------------------------------------------
//dead

class DeadController extends Component {
    update() {
        if (keysDown[" "]) {
            SceneManager.changeScene(0)
        }
    }
}

class DeadScene extends Scene {
    constructor() {
        super("Black")
    }
    start() {
        this.addGameObject(new GameObject().addComponent(new DeadController()))
        this.addGameObject(new GameObject().addComponent(new Text("You Died", "red")), new Vector2(100, 100))
        this.addGameObject(new GameObject().addComponent(new Text("Press spacebar to try again", "red")), new Vector2(100, 150))
    }
}

class EndController extends Component {
    update() {
        if (keysDown[" "]) {
            SceneManager.changeScene(0)
        }
    }
}

class EndScene extends Scene {
    constructor() {
        super("Black")
    }
    start() {
        this.addGameObject(new GameObject().addComponent(new EndController()))
        this.addGameObject(new GameObject().addComponent(new Text("Congratulations! You have beat the game", "white")), new Vector2(100, 100))
        this.addGameObject(new GameObject().addComponent(new Text("Press spacebar to go back to the start menu", "white")), new Vector2(100, 150))
        this.addGameObject(new GameObject().addComponent(new Text("You lived with: " + Global.lives + " lives!", "white")), new Vector2(100, 200))
    }
}

let startScene = new StartScene()
let mainScene = new MainScene()
let deadScene = new DeadScene()
let endScene = new EndScene()

window.allScenes = [startScene, mainScene, deadScene, endScene]