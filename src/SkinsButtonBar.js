import * as PIXI from "pixi.js";

export class SkinsButtonBar {
    constructor() {
        this.container = null;
    }

    init(x = 10, y = 10, width = 400, height = 100) {
        if(this.container) {
            this.container.destroy();
        }

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.createBackground();
    }

    createBackground() {
        this.container = new PIXI.Container();
        const background = new PIXI.Graphics();
        background.beginFill(0xFFFFFF);
        background.drawRect(this.x,this.y, this.width, this.height);
        background.endFill();
        this.container.addChild(background);

    }
    
}