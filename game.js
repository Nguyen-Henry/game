import "/engine/engine.js"
//-----------------------------------------------------
//Start

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
    }
    update() {
        this.timer++
        if (this.timer % 12 == 0) {
            this.interval++
        }
    }
    draw(ctx) {
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

            let attackControllerGameObject = GameObject.getObjectByName("AttackController");
            let attackControllerComponent = attackControllerGameObject.getComponent("AttackController");
            attackControllerComponent.randomattack = undefined
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
    }
    update() {
        this.timer++
        if (this.timer % 12 == 0) {
            this.interval++
        }
    }
    draw(ctx) {
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

        // Phase 2 Attack
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

        // Phase 3 Attack
        if (this.interval == 7) {
            // Warning Attack
            ctx.strokeStyle = "black"
            ctx.fillStyle = "black"

            ctx.strokeRect(this.margin, this.margin + this.size - this.warningY * 2, this.warningX * 2, this.warningY * 2)
            ctx.fillRect(this.margin + 23, this.margin + this.size - (this.warningY / 2 + 11), 5, 5)
            ctx.fillRect(this.margin + 23, this.margin + this.size - (this.warningY / 2 + 25), 5, 10)
            this.attacks = []
        }


        // Actual Attack
        if (this.interval == 8) {
            ctx.fillStyle = "red"
            ctx.fillRect(this.margin, this.margin, this.laserX * 2, this.laserY)
            var attack = {
                x: this.margin,
                y: this.margin,
                width: this.laserX * 2,
                height: this.laserY
            }
            this.attacks.push(attack)
        }

        if (this.interval == 9) {
            // Warning Attack
            ctx.strokeStyle = "black"
            ctx.fillStyle = "black"

            ctx.strokeRect(this.margin + 50, this.margin + this.size - this.warningY * 2, this.warningX * 2, this.warningY * 2)
            ctx.fillRect(this.margin + 73, this.margin + this.size - (this.warningY / 2 + 11), 5, 5)
            ctx.fillRect(this.margin + 73, this.margin + this.size - (this.warningY / 2 + 25), 5, 10)
            this.attacks = []
        }

        // Actual Attack
        if (this.interval == 10) {
            ctx.fillStyle = "red"
            ctx.fillRect(this.margin + 50, this.margin, this.laserX * 2, this.laserY)
            var attack = {
                x: this.margin + 50,
                y: this.margin,
                width: this.laserX * 2,
                height: this.laserY
            }
            this.attacks.push(attack)
        }

        if (this.interval == 11) {
            // Warning Attack
            ctx.strokeStyle = "black"
            ctx.fillStyle = "black"

            ctx.strokeRect(this.margin + 100, this.margin + this.size - this.warningY * 2, this.warningX * 2, this.warningY * 2)
            ctx.fillRect(this.margin + 123, this.margin + this.size - (this.warningY / 2 + 11), 5, 5)
            ctx.fillRect(this.margin + 123, this.margin + this.size - (this.warningY / 2 + 25), 5, 10)
            this.attacks = []
        }

        // Actual Attack
        if (this.interval == 12) {
            ctx.fillStyle = "red"
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

            ctx.strokeRect(this.margin + 150, this.margin + this.size - this.warningY * 2, this.warningX * 2, this.warningY * 2)
            ctx.fillRect(this.margin + 173, this.margin + this.size - (this.warningY / 2 + 11), 5, 5)
            ctx.fillRect(this.margin + 173, this.margin + this.size - (this.warningY / 2 + 25), 5, 10)
            this.attacks = []
        }

        // Actual Attack
        if (this.interval == 14) {
            ctx.fillStyle = "red"
            ctx.fillRect(this.margin + 150, this.margin, this.laserX * 2, this.laserY)
            var attack = {
                x: this.margin + 150,
                y: this.margin,
                width: this.laserX * 2,
                height: this.laserY
            }
            this.attacks.push(attack)
        }

        if (this.interval >= 15) {
            this.interval = 0;
            this.attacks = []
            let playerGameObject = GameObject.getObjectByName("PlayerComponent");
            let playerComponent = playerGameObject.getComponent("PlayerComponent");
            playerComponent.hitInterval = 0

            let attackControllerGameObject = GameObject.getObjectByName("AttackController");
            let attackControllerComponent = attackControllerGameObject.getComponent("AttackController");
            attackControllerComponent.randomattack = undefined
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
        this.turn = true;
        this.blue = true;
    }
    update() {
        this.timer++
        if (this.timer % 12 == 0) {
            this.interval++;
        }
    }
    draw(ctx) {
        if (this.turn) {
            // Phase 1 Attack
            // Warning
            if (this.interval == 3) {
                ctx.strokeStyle = "blue"
                ctx.fillStyle = "blue"
                ctx.strokeRect(this.margin / 2 - 5, this.margin / 2 + this.size / 2, this.warningX, this.warningY)
                ctx.fillRect(this.margin / 2 + 5, this.margin / 2 + this.size / 2 - (this.warningY / 2 + 11) + 40, 5, 5)
                ctx.fillRect(this.margin / 2 + 5, this.margin / 2 + this.size / 2 - (this.warningY / 2 + 25) + 40, 5, 10)
            }

            // Blue Attack
            if (this.interval == 4) {
                if (this.count <= 9) {
                    ctx.fillStyle = "blue"
                    ctx.fillRect(this.margin + this.laserX * this.count, this.margin, this.laserX, this.laserY)
                    this.count++
                    var attack = {
                        x: this.margin + 50,
                        y: this.margin,
                        width: this.laserX * 2,
                        height: this.laserY
                    }
                    this.attacks.push(attack)
                }
            }

            // Phase 2 Attack
            // Warning
            if (this.interval == 5) {
                ctx.strokeStyle = "orange"
                ctx.fillStyle = "orange"
                ctx.strokeRect(this.margin / 2 - 5, this.margin / 2 + this.size / 2, this.warningX, this.warningY)
                ctx.fillRect(this.margin / 2 + 5, this.margin / 2 + this.size / 2 - (this.warningY / 2 + 11) + 40, 5, 5)
                ctx.fillRect(this.margin / 2 + 5, this.margin / 2 + this.size / 2 - (this.warningY / 2 + 25) + 40, 5, 10)
                this.count = 0
                this.attacks = []
            }

            // Blue Attack
            if (this.interval == 6) {
                if (this.count <= 9) {
                    this.blue = false
                    ctx.fillStyle = "orange"
                    ctx.fillRect(this.margin + this.laserX * this.count, this.margin, this.laserX, this.laserY)
                    this.count++
                    var attack = {
                        x: this.margin + 50,
                        y: this.margin,
                        width: this.laserX * 2,
                        height: this.laserY
                    }
                    this.attacks.push(attack)
                }
            }

            if (this.interval == 7) {
                this.interval = 0
                this.count = 0
                let playerGameObject = GameObject.getObjectByName("PlayerComponent");
                let playerComponent = playerGameObject.getComponent("PlayerComponent");
                playerComponent.hitInterval = 0
                this.attacks = []
                let attackControllerGameObject = GameObject.getObjectByName("AttackController");
                let attackControllerComponent = attackControllerGameObject.getComponent("AttackController");
                attackControllerComponent.randomattack = undefined
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
        if (this.transform.x < this.margin + 7) {
            this.transform.x = this.transform.x + this.margin - 48
        }
        if (this.transform.x > this.margin + this.size - 5) {
            this.transform.x = -this.transform.x / 2 + this.margin + this.size + 117
        }
        if (this.transform.y < this.margin + 7) {
            this.transform.y = this.transform.y + this.margin - 48
        }
        if (this.transform.y > this.margin + this.size - 5) {
            this.transform.y = -this.transform.y / 2 + this.margin + this.size + 117
        }

        // Lives Component
        let livesGameObject = GameObject.getObjectByName("LivesGameObject");
        let livesComponent = livesGameObject.getComponent("LivesComponent");

        /*
        // Hit Detection for Attack1Component -------------------------------------------------
        let attacks1GameObject = GameObject.getObjectByName("Attack1Component");
        let attacks1Component = attacks1GameObject.getComponent("Attack1Component");

        // Handle iFrames
        if (this.iFrame && this.hitInterval < attacks1Component.interval) {
            this.iFrame = false
        }

        // Check for hit detection
        attacks1Component.attacks.forEach(attack => {
            var distX = Math.abs(this.transform.x - attack.x - attack.width / 2);
            var distY = Math.abs(this.transform.y - attack.y - attack.height / 2);

            if (distX <= (attack.width / 2) && !this.iFrame && distY <= (attack.height / 2)) {
                livesComponent.lives--
                this.iFrame = true
                this.hitInterval = attacks1Component.interval + 1
            }
        })
        */
        
        // Hit Detection for Attack2Component -------------------------------------------------
        let attacks2GameObject = GameObject.getObjectByName("Attack2Component");
        let attacks2Component = attacks2GameObject.getComponent("Attack2Component");
    
        // Handle iFrames
        if (this.iFrame && this.hitInterval < attacks2Component.interval) {
            this.iFrame = false
        }

        // Check for hit detection
        attacks2Component.attacks.forEach(attack => {
            var distX = Math.abs(this.transform.x - attack.x - attack.width / 2);
            var distY = Math.abs(this.transform.y - attack.y - attack.height / 2);

            if (distX <= (attack.width / 2) && !this.iFrame && distY <= (attack.height / 2)) {
                livesComponent.lives--
                this.iFrame = true
                this.hitInterval = attacks2Component.interval + 1
            }
        })
        
        /*
        // Hit Detection for Attack3Component -------------------------------------------------
        let attacks3GameObject = GameObject.getObjectByName("Attack3Component");
        let attacks3Component = attacks3GameObject.getComponent("Attack3Component");

        // Handle iFrames
        if (this.iFrame && this.hitInterval < attacks3Component.interval) {
            this.iFrame = false
        }

        // Check for hit detection
        attacks3Component.attacks.forEach(attack => {
            var distX = Math.abs(this.transform.x - attack.x - attack.width / 2);
            var distY = Math.abs(this.transform.y - attack.y - attack.height / 2);

            if (distX <= (attack.width / 2) && !this.iFrame && distY <= (attack.height / 2)) {
                //if (attack3Component.blue && keysDown.length == 0) {
                    livesComponent.lives--
                    this.iFrame = true
                    this.hitInterval = attacks3Component.interval + 1
                //}

                // if (!attack3Component.blue && !(keysDown.length == 0)) {
                //     livesComponent.lives--
                //     this.iFrame = true
                //     this.hitInterval = attacks3Component.interval + 1
                // }
            }
        })
        */
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

        if (this.randomAttack == undefined) {
            let randomIndex = Math.floor(Math.random() * this.attacksSequence.length)
            this.randomAttack = this.attacksSequence[randomIndex]
        }

        this.attacksSequence.forEach(attack => {
            if (attack == this.randomAttack) {
                this.empty = false
                attack.turn = true
                let index = this.attacksSequence.indexOf(this.randomAttack)
                this.attacksSequence.splice(index, 1)
            }
        })

        if (this.attacksSequence.length == 0) {
            this.empty = true;
        }
    }
}

class MainScene extends Scene {
    constructor() {
        super("white")
    }
    start() {
        // Attacks Code
        //this.addGameObject(new GameObject("Attack1Component").addComponent(new Attack1Component()))
        this.addGameObject(new GameObject("Attack2Component").addComponent(new Attack2Component()))
        //this.addGameObject(new GameObject("Attack3Component").addComponent(new Attack3Component()))

        //this.addGameObject(new GameObject("AttacksController").addComponent(new AttacksController()))

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

let startScene = new StartScene()
let mainScene = new MainScene()
let deadScene = new DeadScene()

window.allScenes = [startScene, mainScene, deadScene]