import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class AnimationButtonsBar {
    constructor() {
        this.container = null;
        this.selectedCharacter = null;
    }

    init(x = 10, y = 10, width = 100, height = 100) {
        if(this.container) {
            this.container.destroy();
        }

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.createBackground();
        this.createButtons();
    }

    createBackground() {
        this.container = new PIXI.Container();
        const background = new PIXI.Graphics();
        background.beginFill(0xFFFFFF);
        background.drawRect(this.x,this.y, this.width, this.height);
        background.endFill();
        this.container.addChild(background);
    }

    createButtons() {
        if(!this.selectedCharacter) {
            return;
        }

        if(this.selectedCharacter.animations) {
            const x = this.x +10;
            let y = this.y +10;
            const width = this.width - 20;
            const height = 30;

            this.selectedCharacter.animations.forEach(element => {
                const background = new PIXI.Graphics();
                background.beginFill(0xba4a00 );
                background.drawRect(x,y, width, height);
                background.endFill();

                background.interactive = true;
                background.on('pointerdown', () => {
                    console.log(`You clicked ${element.name}`);
                    this.setAnimationCharacter(element.name);
                });

                const animationText = new PIXI.Text();
                animationText.anchor.set(0.5);
                animationText.x = x + this.width /2;
                animationText.y = y + height/2;
                animationText.style = {
                    fontFamily: "Verdana",
                    fontSize: 18,
                    fill: ["#FFFFFF"]
                };
                animationText.text = element.name;

                this.container.addChild(background);
                this.container.addChild(animationText);
                y+=40;
                
            });
        }


    }

    setAnimationCharacter(animationName) {
        this.selectedCharacter.spine.state.setAnimation(0, animationName, true);
        this.selectedCharacter.nameAnimationSelected = animationName;
        Globals.selectedCharacter.nameAnimationSelected = animationName;

    }

    selectCharacter(character) {
        this.selectedCharacter = character;
        Globals.selectedCharacter = character;
        this.createButtons();

    }
}