import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class AnimationButtonsBar {
  constructor() {
    this.container = null;
  }

  init(x = 10, y = 10, width = 100, height = 100) {
    if (this.container) {
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
    background.beginFill(0xffffff);
    background.drawRect(this.x, this.y, this.width, this.height);
    background.endFill();
    this.container.addChild(background);
  }

  createButtons() {
    if (!Globals.selectedCharacter) {
      return;
    }

    if (Globals.selectedCharacter.animations) {
      const x = this.x + 10;
      let y = this.y + 10;
      const width = this.width - 20;
      const height = 30;

      Globals.selectedCharacter.animations.forEach((element) => {
        const background = new PIXI.Graphics();
        background.beginFill(0xba4a00);
        background.drawRect(x, y, width, height);
        background.endFill();

        background.interactive = true;
        background.on("pointerdown", () => {
          console.log(`You clicked ${element.name}`);
          this.setAnimationCharacter(element.name);
          Globals.playPauseText.text = "Pause";
        });

        const animationText = new PIXI.Text();
        animationText.anchor.set(0.5);
        animationText.x = x + this.width / 2;
        animationText.y = y + height / 2;
        animationText.style = {
          fontFamily: "Verdana",
          fontSize: 18,
          fill: ["#FFFFFF"],
        };
        animationText.text = element.name;

        this.container.addChild(background);
        this.container.addChild(animationText);
        y += 40;
      });
    }
  }

  setAnimationCharacter(animationName) {
    Globals.selectedCharacter.spine.state.setAnimation(0, animationName, true);
    Globals.selectedCharacter.nameAnimationSelected = animationName;
  }

  selectCharacter() {
    //this.selectedCharacter = character;
    //Globals.selectedCharacter = character;
    this.createButtons();
  }
}
