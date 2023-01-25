import * as PIXI from "pixi.js";
import { Spine } from 'pixi-spine';

export class Character {
    constructor(character, name, animations = []) {
        this.spine = character;
        this.name = name;
        this.animations = animations;
        this.nameAnimationSelected = null;
    }

    get left() {
        return this.spine.x - this.spine.width/2;

    }

    get right() {
        return this.spine.x + this.spine.width/2;
    }

    get top() {
        return this.spine.y - this.spine.height;
    }

    get bottom() {
        return this.spine.y;

    }

}