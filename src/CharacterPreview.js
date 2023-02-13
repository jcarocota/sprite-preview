import * as PIXI from "pixi.js";
import { Spine, TextureAtlas, ISkeletonData} from "pixi-spine";
import { Globals } from "./Globals";
import { Character } from "./Character";
import { BaseTexture } from "pixi.js";
import * as SpineRuntime from "@pixi-spine/runtime-4.1";

export class CharacterPreview {
  constructor() {
    this.container = null;
    this.characters = [];
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
    this.drawCharacters();
  }

  createBackground() {
    this.container = new PIXI.Container();
    const background = new PIXI.Graphics();
    background.beginFill(0x000000);
    background.drawRect(this.x, this.y, this.width, this.height);
    background.endFill();
    this.container.addChild(background);
  }

  /*addCharacterToPreview(resource) {
    const characterName = "character";
    //console.log("recurso", resource);

    console.log("Inicio Character");
    //let file = require();
    //console.log("file", file);
    
    Globals.app.loader
      .add(characterName, "./assets/spineboy.json")
      .load((loader, resources) => {
        //Globals.app.stage.interactive = true;
        const spineCharacter = new Spine(resources.character.spineData);

        //spineBoy.stateData.setMix('walk', 'jump', 0.2);
        //spineBoy.stateData.setMix('jump', 'walk', 0.4);

        //spineBoy.state.setAnimation(0, 'walk', true);

        let character = new Character(
          spineCharacter,
          characterName,
          spineCharacter.spineData.animations
        );

        Globals.characters.push(character);

        //this.container.addChild(spineBoy);
        //console.log("Carga completa");
        this.drawCharacters();
      });
  }*/

  addCharacterToPreview(rawSkeletonData, rawAtlasData, imageData) {
    const characterName = "character";
    console.log("Inicio Character");

    let spineAtlas = new TextureAtlas(rawAtlasData, (path, callback) => {
      callback(BaseTexture.from(imageData));
    });

    let spineAtlasLoader = new SpineRuntime.AtlasAttachmentLoader(spineAtlas);
    let spineJsonParser = new SpineRuntime.SkeletonJson(spineAtlasLoader);

    spineJsonParser.scale = 0.25;

    let spineData = spineJsonParser.readSkeletonData(rawSkeletonData);

    const spineCharacter = new Spine(spineData);

    let character = new Character(
      spineCharacter,
      characterName,
      spineCharacter.spineData.animations
    );

    Globals.characters.push(character);

    this.drawCharacters();
  }

  drawCharacters() {
    Globals.characters.forEach((character) => {
      let widthCharacter = 0;
      let heightCharacter = 0;

      if (
        this.height / this.width >
        character.spine.height / character.spine.width
      ) {
        widthCharacter = this.width * 0.5;
        heightCharacter =
          (character.spine.height * widthCharacter) / character.spine.width;
        //console.log("ancho grande", widthCharacter, heightCharacter);
      } else {
        heightCharacter = this.height * 0.5;
        widthCharacter =
          (heightCharacter * character.spine.width) / character.spine.height;
      }

      character.spine.height = heightCharacter;
      character.spine.width = widthCharacter;
      character.spine.x = this.x + this.width / 2;
      character.spine.y =
        this.y +
        (character.spine.height + (this.height - character.spine.height) / 2);

      //console.log(character.spine.skeleton.data.skins);
      //console.log(character.spine);

      this.container.addChild(character.container);
    });
  }
}
