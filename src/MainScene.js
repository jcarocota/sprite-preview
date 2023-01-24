import * as PIXI from "pixi.js";
import { TilingSprite } from "pixi.js";
import { AnimationButtonsBar } from "./AnimationButtonsBar";
import { CharacterPreview } from "./CharacterPreview";
import { Globals } from "./Globals";
import { PlayPauseBar } from "./PlayPauseBar";
import { SkinsButtonBar } from "./SkinsButtonBar";

export class MainScene {
    constructor() {
        this.container = null;
        this.dragDropMessageContainer = null;
        this.skinsButtonBar = new SkinsButtonBar();
        this.playPauseBar = new PlayPauseBar();
        this.animationButtonsBar = new AnimationButtonsBar();
        this.characterPreview =  new CharacterPreview();
    }

    init() {
        if(this.container) {
            this.container.destroy();
        }

        this.loadMainScene();
    }

    checkClickOnCharacter(x, y) {
        Globals.characters.forEach(character => {

            if(x >= character.left && 
                x <= character.right &&
                y >= character.top &&
                y <= character.bottom) {
                    console.log("You clicked the character!");
                    this.animationButtonsBar.selectCharacter(character);
                }

        });
    }

    loadMainScene() {
        this.container = new PIXI.Container();

        const skinsButtonBarBounds = this.calculateBoundsSkinButtonBar();
        this.skinsButtonBar.init(skinsButtonBarBounds.x, skinsButtonBarBounds.y, skinsButtonBarBounds.width, skinsButtonBarBounds.height)
        this.container.addChild(this.skinsButtonBar.container);

        const playPauseButtonBounds = this.calculateBoundsPlayPauseBar();
        this.playPauseBar.init(playPauseButtonBounds.x, playPauseButtonBounds.y, playPauseButtonBounds.width, playPauseButtonBounds.height);
        this.container.addChild(this.playPauseBar.container);

        const animationButtonsBarBounds = this.calculateBoundsAnimationButtonsBar();
        this.animationButtonsBar.init(animationButtonsBarBounds.x, animationButtonsBarBounds.y, animationButtonsBarBounds.width, animationButtonsBarBounds.height);
        this.container.addChild(this.animationButtonsBar.container);

        const characterPreviewBouds = this.calculateBoundsCharacterPreview();
        this.characterPreview.init(characterPreviewBouds.x, characterPreviewBouds.y, characterPreviewBouds.width, characterPreviewBouds.height); 
        this.container.addChild(this.characterPreview.container);

        this.container.interactive = true;
        this.container.on("pointerdown", (event) => {
            console.log("You click main", event.data.global.x, event.data.global.y);
            this.checkClickOnCharacter(event.data.global.x, event.data.global.y);
        });
    }

    calculateBoundsSkinButtonBar() {
        const offsetWidth = 10;
        const offsetHeight = 10;
        const width = Math.floor(Globals.appWitdh*0.8) - offsetWidth;
        const height = Math.floor(Globals.appHeight*0.2) - offsetHeight*2;
        const x = offsetWidth;
        const y = Math.floor(Globals.appHeight*0.8) + offsetHeight;

        return {
            x: x,
            y: y,
            height: height,
            width: width
        }

    }

    calculateBoundsPlayPauseBar() {
        const offsetWidth = 10;
        const offsetHeight = 10;
        const width = Math.floor(Globals.appWitdh*0.2) - offsetWidth*2;
        const height = Math.floor(Globals.appHeight*0.2) - offsetHeight*2;
        const x = Math.floor(Globals.appWitdh*0.8) + offsetWidth;
        const y = Math.floor(Globals.appHeight*0.8) + offsetHeight;

        return {
            x: x,
            y: y,
            height: height,
            width: width
        }

    }

    calculateBoundsAnimationButtonsBar() {
        const offsetWidth = 10;
        const offsetHeight = 10;
        const width = Math.floor(Globals.appWitdh*0.2) - offsetWidth*2;
        const height = Math.floor(Globals.appHeight*0.65) - offsetHeight*1;
        const x = Math.floor(Globals.appWitdh*0.8) + offsetWidth;
        const y = Math.floor(Globals.appHeight*0.15) + offsetHeight;

        return {
            x: x,
            y: y,
            height: height,
            width: width
        }

    }

    calculateBoundsAnimationButtonsBar() {
        const offsetWidth = 10;
        const offsetHeight = 10;
        const width = Math.floor(Globals.appWitdh*0.2) - offsetWidth*2;
        const height = Math.floor(Globals.appHeight*0.65) - offsetHeight*1;
        const x = Math.floor(Globals.appWitdh*0.8) + offsetWidth;
        const y = Math.floor(Globals.appHeight*0.15) + offsetHeight;

        return {
            x: x,
            y: y,
            height: height,
            width: width
        }

    }

    calculateBoundsCharacterPreview() {
        const offsetWidth = 10;
        const offsetHeight = 10;
        const width = Math.floor(Globals.appWitdh*0.8) - offsetWidth;
        const height = Math.floor(Globals.appHeight*0.65) - offsetHeight*1;
        const x = offsetWidth;
        const y = Math.floor(Globals.appHeight*0.15) + offsetHeight;

        return {
            x: x,
            y: y,
            height: height,
            width: width
        }

    }

    createDragDropMessageContainer() {
        const widthOffset = 50;
        const heightOffset = 50;
        const width = Globals.appWitdh - widthOffset;
        const height = Globals.appHeight - heightOffset;
        const container = new PIXI.Container();

        container.width = width;
        container.height = height;
        container.x = widthOffset/2;
        container.y = heightOffset/2;

        const dragDropMessage = new PIXI.Text();
        dragDropMessage.anchor.set(0.5);
        dragDropMessage.x = width /2;
        dragDropMessage.y = height/2;
        dragDropMessage.style = {
            fontFamily: "Verdana",
            fontSize: 30,
            fill: ["#FFFFFF"]
        };
        dragDropMessage.text = "Drop spine file (atlas, json and bitmap)";

        const background = new PIXI.Graphics();
        background.lineStyle(2, 0xeaecee , 1);
        background.beginFill(0x17202a,0.5);
        background.drawRect(0, 0, width, height);
        background.endFill();

        container.addChild(background);
        container.addChild(dragDropMessage);
        
        return container;
    }

    showDragDropFilesMessage() {
        if(!this.dragDropMessageContainer) {
            this.dragDropMessageContainer = this.createDragDropMessageContainer();
            this.container.addChild(this.dragDropMessageContainer);
        }
    }

    hideDragDropFilesMessage() {
        if(this.dragDropMessageContainer) {
            this.dragDropMessageContainer.destroy();
            this.dragDropMessageContainer = null;
        }
    }

    addCharacterToPreview(resource) {
        this.characterPreview.addCharacterToPreview(resource);
    }
}