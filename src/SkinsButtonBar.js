import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class SkinsButtonBar {
  constructor() {
    this.container = null;
  }

  init(x = 10, y = 10, width = 400, height = 100) {
    if (this.container) {
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
    background.beginFill(0xffffff);
    background.drawRect(this.x, this.y, this.width, this.height);
    background.endFill();
    this.container.addChild(background);
  }

  createButtons() {
    if (!Globals.selectedCharacter) {
      return;
    }

    if (Globals.selectedCharacter.spine.skeleton.data.skins) {
      let x = this.x + 10;
      const y = this.y + 10;
      const width = 100;
      const height = this.height - 20;

      Globals.selectedCharacter.spine.skeleton.data.skins.forEach((element) => {
        const background = new PIXI.Graphics();
        background.beginFill(0xf7dc6f);
        background.drawRect(x, y, width, height);
        background.endFill();

        background.interactive = true;
        background.on("pointerdown", () => {
          console.log(`You clicked ${element.name}`);
          this.setSkinCharacter(element.name);
        });

        const skinText = new PIXI.Text();
        skinText.anchor.set(0.5);
        skinText.x = x + width / 2;
        skinText.y = y + this.height / 2;
        skinText.style = {
          fontFamily: "Verdana",
          fontSize: 18,
          fill: ["#FFFFFF"],
        };
        console.log("element.name", element.name);
        skinText.text = element.name;

        this.container.addChild(background);
        this.container.addChild(skinText);
        x += 100;

      });


    }

  }

  setSkinCharacter(skinName) {
    Globals.selectedCharacter.spine.skeleton.skin = skinName;
    Globals.selectedCharacter.nameSkinSelected = skinName;
  }

  selectCharacter() {
    //this.selectedCharacter = character;
    //Globals.selectedCharacter = character;
    this.createButtons();
  }
}
