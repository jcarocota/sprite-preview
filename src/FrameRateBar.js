import * as PIXI from "pixi.js";
import { Config } from "./Config";
import { Globals } from "./Globals";

export class FrameRateBar {
  constructor() {
    this.width = null;
    this.container = null;
  }

  init(x = 10, y = 10, width = 100) {
    if (this.container) {
      this.container.destroy();
    }

    this.x = x;
    this.y = y;
    this.width = width;

    this.createSlider();
  }

  createSlider() {
    this.container = new PIXI.Container();
    this.slider = new PIXI.Graphics();

    this.slider.beginFill(0x272d37);
    this.slider.drawRect(0, 0, this.width, 4);
    this.slider.x = this.x;
    this.slider.y = this.y;
    this.slider.width = this.width;

    this.handle = new PIXI.Graphics();
    this.handle.beginFill(0xffffff);
    this.handle.drawCircle(0, 0, 8);
    this.handle.y = this.slider.height / 2;

    if (this.lastPositionXHandleBeforeResize) {
      this.handle.x = this.width * this.lastPositionXHandleBeforeResize;
    } else {
      this.handle.x = this.slider.width / 2;
    }
    this.handle.interactive = true;
    this.handle.cursor = "pointer";

    this.handle.on("pointerdown", this.onDragStart.bind(this));
    this.handle.on("pointerup", this.onDragEnd.bind(this));
    this.handle.on("pointerupoutside", this.onDragEnd.bind(this));

    //this.handleDragging = false;

    this.slider.addChild(this.handle);

    this.container.addChild(this.slider);
  }

  onDragStart(event) {
    this.container.interactive = true;
    this.touchPosition = { x: event.data.global.x, y: event.data.global.y };
    this.lastPositionXHandle = this.handle.x;
    this.container.on("pointermove", this.onDrag.bind(this));
    //this.handleDragging = true;
  }

  onDragEnd(event) {
    this.container.interactive = false;
    this.container.on("pointermove", this.onDrag.bind(this));
    //this.handleDragging = false;
  }

  onDrag(event) {
    //const halfHandleWidth = this.handle.width / 2;
    // Set handle y-position to match pointer, clamped to (4, screen.height - 4).
    //console.log("this.slider.toLocal(e.global)", this.slider.toLocal(e.global))
    //this.handle.x = Math.max(halfHandleWidth, Math.min(
    //        this.slider.toLocal(e.global).x,
    //        this.slider.width - halfHandleWidth,
    //    ));
    // Normalize handle position between -1 and 1.
    //const t = 2 * ((this.handle.x / this.slider.width) - 0.5);
    //bunny.scale.set(3 * (1.1 + t));
    /*if(!this.handleDragging) {
            return;
        }*/

    const currentPositionX = event.data.global.x;
    const offsetX = currentPositionX - this.touchPosition.x;

    this.handle.x = this.lastPositionXHandle + offsetX;

    if (this.handle.x > this.slider.x + this.width) {
      this.handle.x = this.slider.x + this.width - this.handle.width / 2;
    } else if (this.handle.x < this.slider.x) {
      this.handle.x = this.slider.x - this.handle.width / 2;
    }

    this.lastPositionXHandleBeforeResize = this.handle.x / this.slider.width;

    console.log(Globals.selectedCharacter);
    Globals.selectedCharacter.spine.state.timeScale =
      (this.handle.x / (this.slider.width / 2)) * Config.animationSpeedIndex;
  }
}
