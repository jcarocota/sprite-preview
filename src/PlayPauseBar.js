import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class PlayPauseBar {
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
    this.createButton();
  }

  createBackground() {
    this.container = new PIXI.Container();
    const background = new PIXI.Graphics();
    background.beginFill(0xffffff);
    background.drawRect(this.x, this.y, this.width, this.height);
    background.endFill();
    this.container.addChild(background);
  }

  createButton() {
    const x = this.x + 10;
    const y = this.y + 10;
    const width = this.width - 20;
    const height = this.height - 20;
    const background = new PIXI.Graphics();
    background.beginFill(0xba4a00);
    background.drawRect(x, y, width, height);
    background.endFill();

    background.interactive = true;

    const animationText = new PIXI.Text();
    animationText.anchor.set(0.5);
    animationText.x = x + this.width / 2;
    animationText.y = y + height / 2;
    animationText.style = {
      fontFamily: "Verdana",
      fontSize: 18,
      fill: ["#FFFFFF"],
    };
    animationText.text = "Play/Pause";

    Globals.playPauseText = animationText;

    background.on("pointerdown", () => {
      //console.log(`You clicked play pause!!`);

      if (
        !Globals.selectedCharacter ||
        !Globals.selectedCharacter.nameAnimationSelected
      ) {
        return;
      }

      if (
        !Globals.selectedCharacter.spine.state.queue.animState.tracks ||
        Globals.selectedCharacter.spine.state.queue.animState.tracks.length == 0
      ) {
        Globals.selectedCharacter.spine.state.setAnimation(
          0,
          Globals.selectedCharacter.nameAnimationSelected,
          true
        );
        Globals.selectedCharacter.playingAnimation = true;
        animationText.text = 'Pause';
      } else {
        Globals.selectedCharacter.spine.state.queue.animState.clearTracks();
        Globals.selectedCharacter.spine.skeleton.setToSetupPose();
        Globals.selectedCharacter.playingAnimation = false;
        animationText.text = 'Play';
      }
      //console.log(Globals.selectedCharacter.spine.skeleton);
    });

    this.container.addChild(background);
    this.container.addChild(animationText);
  }
}
