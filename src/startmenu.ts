import * as PIXI from 'pixi.js'
import { Button } from './button'
import { Game } from './game'

export class Startmenu {
    private pixiWidth = 800
    private pixiHeight = 500
    private button: Button
    
    private _pixi: PIXI.Application

    constructor() {
        console.log("startmenu")

        this._pixi = new PIXI.Application({ width: this.pixiWidth, height: this.pixiHeight, backgroundColor: 0x00FF00 });
        document.body.appendChild(this._pixi.view)

        this.button = new Button(
            this._pixi.screen.width/2,
            this._pixi.screen.height/2)
        this._pixi.stage.addChild(this.button)

        this.button.on("pointerdown", () => this.onClick())
    }



    private onClick() {
        this.button.destroy()
        new Game(this._pixi)
        
    }
}


new Startmenu