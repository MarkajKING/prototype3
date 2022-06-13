import * as PIXI from 'pixi.js'
import { Game } from './game'


export class Brandaan extends PIXI.AnimatedSprite {
    private game: Game
    private _pixi: PIXI.Application
    private xSpeed: number = 0
    private ySpeed: number = 0
    private frames: PIXI.Texture[][] = []
    private previousFrame: number = -1

    constructor(game: Game, textures: PIXI.Texture[][], x: number, y: number, pixi: PIXI.Application) {
        super(textures[0])
        this.game = game
        this.frames = textures
        this._pixi = pixi

        this.anchor.set(0.5)
        this.x = game._pixi.screen.width/2
        this.y = game._pixi.screen.height/2
        this.anchor.set(0.5)
        this.scale.set(1)
        this.animationSpeed = 0.1;
        this.loop = true
        this.play();

        this.game._pixi.stage.addChild(this);

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

    }

    private onKeyDown(e: KeyboardEvent): any {
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
                this.xSpeed = -1
                this.scale.set(-2,2)
                this.setFrames(1)
                break
            case "D":
            case "ARROWRIGHT":
                this.xSpeed = 1
                this.scale.set(2)
                this.setFrames(1)
                break
            case "W":
            case "ARROWUP":
                this.ySpeed = -1
                this.setFrames(1)
                break
            case "S":
            case "ARROWDOWN":
                this.ySpeed = 1
                this.setFrames(1)
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): any {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xSpeed = 0
                this.setFrames(0)
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.ySpeed = 0
                this.setFrames(0)
                break
        }
    }

    private setFrames(frame: number) {
        if (this.previousFrame != frame) {
            this.textures = this.frames[frame]
            this.loop = true
            this.play()
            this.previousFrame = frame
        }

    }

    public update(delta: number): void {
        super.update(delta)
        this.x += this.xSpeed * delta
        this.y += this.ySpeed * delta

        let mapwidth = window.innerWidth
        let mapheight = window.innerHeight
        let centerx = 800 /4
        let centery = 600 / 4

        // // beweeg het karakter over de map maar niet buiten beeld
        this.x = this.clamp(this.x + this.xSpeed, 0, mapwidth)
        this.y = this.clamp(this.y + this.ySpeed, 0, mapheight)

        // // centreer het hele level onder het karakter, gebruik clamp om bij de randen niet te scrollen
        let mapx = this.clamp(this.x, centerx, mapwidth - centerx)
        let mapy = this.clamp(this.y, centery, mapheight - centery)
        
        this.game._pixi.stage.pivot.set(mapx, mapy) 
    }

    clamp(num: number, min: number, max: number) {
        return Math.min(Math.max(num, min), max)
    }
}
