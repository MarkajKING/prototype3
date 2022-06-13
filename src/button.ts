import * as PIXI from 'pixi.js'
import { Graphics } from 'pixi.js'

export class Button extends PIXI.Graphics {
    constructor(x: number, y: number) {
        super()
        

        this.beginFill(0xFF0000)
        this.drawRoundedRect(0, 0, 300, 80, 15)
        this.endFill()

        this.x = x - this.getBounds().width/2
        this.y = y - this.getBounds().height/2

        const startText = new PIXI.Text("Start Game", {
            "align": "center",
            "fontFamily": "Comic Sans MS",
            "fontSize": 50,
        })

        startText.x = this.getBounds().width /2
        startText.y = this.getBounds().height /2
        startText.anchor.set(0.5)

        this.addChild(startText)

        this.buttonMode = true
        this.interactive = true

    }
}