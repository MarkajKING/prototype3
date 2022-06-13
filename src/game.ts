import * as PIXI from 'pixi.js'
import coverImage from './images/cover.png'
import { Assets } from './assets'
import { Brandaan } from './brandaan'

export class Game {
    private pixiWidth = 800
    private pixiHeight = 500
    
    public _pixi: PIXI.Application
    private loader: PIXI.Loader
    private brandaan: Brandaan

    constructor(pixi: PIXI.Application) {
        this._pixi = pixi
        new Assets(this)

        this.loader = new PIXI.Loader();
        this.loader.add('coverTexture', coverImage)
        this.loader.load(()=>this.spriteLoadCompleted());
    }

    public loadCompleted() {
        //create brandaan mn niffouw
        let frames: PIXI.Texture[][] = this.createBrandaanFrames()
        this.brandaan = new Brandaan(this, frames, 50, 50, this._pixi)
        //let brandaan move
        this._pixi.ticker.add((delta: number) => this.update(delta))

    }

    public spriteLoadCompleted() {
        //create background
        let cover = new PIXI.Sprite(this.loader.resources["coverTexture"].texture!);
        cover.height = this.pixiHeight;
        cover.width = this.pixiWidth;
        this._pixi.stage.addChild(cover);
    }

    private update(delta: number) {
        this.brandaan.update(delta)
    }

    private createBrandaanFrames(): PIXI.Texture[][] {
        // create an array of textures from an image path
        let frames: PIXI.Texture[] = [];
        let runFrames: PIXI.Texture[] = [];

        for (let i = 1; i <= 6; i++) {
            // magically works since the spritesheet was loaded with the _pixi loader
            frames.push(PIXI.Texture.from(`brandaan_${i}`));
        }
        for (let i = 7; i <= 12; i++) {
            // magically works since the spritesheet was loaded with the _pixi loader
            runFrames.push(PIXI.Texture.from(`brandaan_${i}`));
        }
        return [frames, runFrames]
    }
}
