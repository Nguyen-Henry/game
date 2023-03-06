import "/engine/engine.js"

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
        this.points = 0
        this.margin = 50
        this.lives = 3
    }
    update() {

    }
    draw(ctx) {
        ctx.fillStyle = "black"
        ctx.fillText("Lives: ", this.margin, this.margin - 10)
        for (let i = 0; i < this.lives; i++) {
            ctx.fillRect(this.margin + 30 + 15 * i, this.margin - 18, 10, 10)
        }
    }
}

class Attack3Component extends Component {
    name = "Attack3Component"
    start() {
        this.margin = 50
        this.size = 200
        this.attacks = 4
        this.warningX = 25
        this.warningY = 25
        this.laserX = 25;
        this.laserY = this.size;
    }
    update() {

    }
    draw(ctx) {
        // Warning Attack
        for (let i = 0; i < this.attacks; i++) {
            ctx.strokeRect(this.margin + 50 * i, this.margin + this.size - this.warningY, this.warningX, this.warningY)
            ctx.fillRect(this.margin + 50 * i + 10, this.margin + this.size - (this.warningY / 2 - 4), 5, 5)
            ctx.fillRect(this.margin + 50 * i + 10, this.margin + this.size - (this.warningY / 2 + 10), 5, 10)
        }
        // Actual Attack
        ctx.strokeStyle = "blue"
        for (let i = 0; i < this.attacks; i++) {
            ctx.strokeRect(this.margin + 50 * i, this.margin, this.laserX, this.laserY)
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
    }
    update() {
        //Update the player based on input
        if (keysDown["ArrowLeft"]) {
            this.transform.x -= 2;
        }
        if (keysDown["ArrowRight"]) {
            this.transform.x += 2
        }
        if (keysDown["ArrowUp"]) {
            this.transform.y -= 2
        }
        if (keysDown["ArrowDown"]) {
            this.transform.y += 2
        }

        // Constrict Movement
        if (this.transform.x < this.margin + 7) {
            this.transform.x = this.transform.x + this.margin - 48
        }
        if (this.transform.x > this.margin + this.size - 5) {
            this.transform.x = -this.transform.x / 2 + this.margin + this.size + 117
        }
    }
}

class MainScene extends Scene {
    start() {
        // Attacks Code
        this.addGameObject(new GameObject("Attack3Component").addComponent(new Attack3Component()))

        // Player code
        let playerComponent = new GameObject("PlayerComponent")
        playerComponent.addComponent(new PlayerComponent())
        let circle = new Circle()
        playerComponent.addComponent(circle)
        circle.fillStyle = "black"
        circle.transform.sx = 7
        this.addGameObject(playerComponent)

        // Walls Code
        this.addGameObject(new GameObject("WallsGameObject").addComponent(new WallsComponent()))

        // Points code
        let livesGameObject = new GameObject("LivesGameObject")
        livesGameObject.addComponent(new LivesComponent())
        this.addGameObject(livesGameObject)
        this.addGameObject(new GameObject("LivesComponent").addComponent(new LivesComponent()))
    }
}

let mainScene = new MainScene()

window.allScenes = [mainScene]
