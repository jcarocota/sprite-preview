import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";
import { Globals } from "./Globals";

export class Character {
  constructor(character, name, animations = []) {
    this.spine = character;
    this.name = name;
    this.animations = animations;
    this.nameAnimationSelected = null;
    this.nameSkinSelected = null;
    this.dragging = false;
    this.container = this.createContainer();
    this.lastPosition = {
      x: 0,
      y: 0,
    };
    this.playingAnimation = false;
  }

  get left() {
    return this.spine.x - this.spine.width / 2;
  }

  get right() {
    return this.spine.x + this.spine.width / 2;
  }

  get top() {
    return this.spine.y - this.spine.height;
  }

  get bottom() {
    return this.spine.y;
  }

  createContainer() {
    this.container = new PIXI.Container();
    this.container.width = this.spine.width;
    this.container.height = this.spine.height;
    this.container.addChild(this.spine);
    this.container.interactive = true;

    this.container.on("pointerdown", this.onTouchStart.bind(this));
    this.container.on("pointermove", this.onTouchMove.bind(this));
    this.container.on("pointerup", this.onTouchEnd.bind(this));
    return this.container;
  }

  onTouchStart(event) {
    this.touchPosition = { x: event.data.global.x, y: event.data.global.y };
    this.dragging = true;
    //this.container.zIndex = 1;
    Globals.selectedCharacter = this;
    Globals.animationButtonsBar.selectCharacter();
    Globals.skinButtonsBar.selectCharacter();
    //console.log("container", this.container.x, this.container.y);
    //console.log("spine", this.spine.x, this.spine.y);
    Globals.playPauseText.text = "Play/Pause"; 
    Globals.frameRateBar.setCharacterNameSelected();
  }

  onTouchMove(event) {
    if (!this.dragging) {
      return;
    }

    const currentPosition = { x: event.data.global.x, y: event.data.global.y };
    const offsetX = currentPosition.x - this.touchPosition.x;
    const offsetY = currentPosition.y - this.touchPosition.y;
    //console.log("offset", offsetX, offsetY);

    this.container.x = this.lastPosition.x + offsetX;
    this.container.y = this.lastPosition.y + offsetY;

    Globals.selectedCharacter.spine.state.queue.animState.clearTracks();
    Globals.selectedCharacter.spine.skeleton.setToSetupPose();
  }

  onTouchEnd(event) {
    this.dragging = false;
    this.lastPosition = {
      x: this.container.x,
      y: this.container.y,
    };
    //console.log("container", this.lastPosition.x, this.lastPosition.y);
    //console.log("spine", this.spine.x, this.spine.y);

    if (Globals.selectedCharacter.nameAnimationSelected) {
      //Globals.selectedCharacter.spine.state.setAnimation(0, Globals.selectedCharacter.nameAnimationSelected, true);
    }
  }
}
