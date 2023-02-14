import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
import { MainScene } from "./MainScene";
import { Config } from "./Config";
import { ReaderUtils } from "./ReaderUtils";

export class App {
  run() {
    console.log("Run app perrito");
    this.app = new PIXI.Application({
      autoResize: true,
      resolution: devicePixelRatio,
      backgroundColor: 0x1099bb,
    });

    document.body.appendChild(this.app.view);
    this.mainScene = new MainScene();

    window.addEventListener("resize", this.resizeWindow.bind(this));

    const canvas = document.getElementsByTagName("canvas").item(0);

    canvas.addEventListener("dragover", this.dragOverElement.bind(this));
    canvas.addEventListener("drop", this.dropFile.bind(this));

    document.addEventListener("mousemove", this.mouseLeaveCanvas.bind(this));

    Globals.app = this.app;

    this.resizeWindow();

    const fpsText = new PIXI.Text();
    fpsText.anchor.set(0.5);
    fpsText.x = Globals.appWitdh -100;
    fpsText.y = 20;
    fpsText.style = {
      fontFamily: "monospace",
      fontSize: 18,
      fill: ["#000000"],
    };

    this.app.stage.addChild(fpsText);
    

    //console.log("PFS", PIXI.Ticker.shared.FPS);

    /*this.app.ticker.add(() =>{
      Globals.fps = this.app.ticker.FPS;
      fpsText.text = "FPS: " + Globals.fps.toFixed(4);  
      //console.log(Globals.fps);    

    })*/

    setInterval(() => {
      Globals.fps = this.app.ticker.FPS;
      fpsText.text = "FPS: " + Globals.fps.toFixed(4);  
    },100);
  }

  resizeWindow() {
    Globals.appWitdh = window.innerWidth - Config.windowPadding;
    Globals.appHeight = window.innerHeight - Config.windowPadding;
    this.app.renderer.resize(Globals.appWitdh, Globals.appHeight);
    this.mainScene.init();
    this.app.stage.addChild(this.mainScene.container);
  }

  dragOverElement(ev) {
    ev.preventDefault();
    this.mainScene.showDragDropFilesMessage();

  }

  async dropFile(ev) {
    //console.log(ev);
    //ev.stopr
    ev.preventDefault();
    this.mainScene.hideDragDropFilesMessage();

    if(!ev.dataTransfer.items) {
      return;
    }

    //console.log("droped");

    let rawSkeletonData;
    let rawAtlasData;
    let imageData;

    let spineFileName;

    const displayError = (error) => {
      console.error(error);
    };

    let readerUtils = new ReaderUtils();

    [...ev.dataTransfer.items].forEach((item, i) => {
      // If dropped items aren't files, reject them
      if (item.kind === 'file') {
        const file = item.getAsFile();

        if(!file) {
          return;
        }

        //console.log(`… file[${i}].name = ${file.name}`);
        //console.log(file);
        //console.log(file.name);

        let fileExtension = (/[.]/.exec(file.name)) ? /[^.]+$/.exec(file.name) : undefined;
        fileExtension = fileExtension ? fileExtension[0] : undefined; 
        console.log('fileExtension', fileExtension);
        
        spineFileName = file.name;
        spineFileName = spineFileName.split('.');
        spineFileName = spineFileName[0];
        

        switch (fileExtension) {
          case 'json':
            let promiseSkeleton = readerUtils.promiseReadAsText(file);
            promiseSkeleton
              .then((r) => {
                rawSkeletonData = JSON.parse(r);
                this.mainScene.addCharacterToPreview(rawSkeletonData, rawAtlasData, imageData, spineFileName);
              })
              .catch(displayError);
            //nameJson = file.name;
            break;
          case 'atlas':
            let promiseAtlas = readerUtils.promiseReadAsText(file);
            promiseAtlas.then((r) => {
              rawAtlasData = r;
              this.mainScene.addCharacterToPreview(rawSkeletonData, rawAtlasData, imageData, spineFileName);
            }).catch(displayError); 
            break;
          case 'png':
            let promiseImage = readerUtils.promiseReadAsURL(file); 
            promiseImage.then((r) => {
              imageData = r;
              this.mainScene.addCharacterToPreview(rawSkeletonData, rawAtlasData, imageData, spineFileName);
            }).catch(displayError);
            //namePng = file.name;
            break;
        }

      }
    });

    



    
  }

  mouseLeaveCanvas(ev) {
    //console.log(ev.offsetX, ev.offsetY);
    this.mainScene.hideDragDropFilesMessage();
  }

  /*
    onResizeWindow() {
        console.log("perrito");
        //this.app.view.rresizeTo(window.innerWidth, window.innerHeight);
    }*/

  /*
    scaleToWindow() {
        const canvas = this.app.view; // PIXI.Application.view
        let scaleX, scaleY, scale, center;
        scaleX = window.innerWidth / canvas.offsetWidth;
        scaleY = window.innerHeight / canvas.offsetHeight;
        scale = Math.min(scaleX, scaleY);
        canvas.style.transformOrigin = "0 0";
        canvas.style.transform = "scale(" + scale + ")";
        if (canvas.offsetWidth > canvas.offsetHeight) {
        if (canvas.offsetWidth * scale < window.innerWidth) { center = "horizontally" }
        else { center = "vertically" };
        } else {
        if (canvas.offsetHeight * scale < window.innerHeight) { center = "vertically" }
        else { center = "horizontally"; };
        };
        let margin;
        if (center === "horizontally") {
            margin = (window.innerWidth - canvas.offsetWidth * scale) / 2;
            canvas.style .marginTop = 0 + "px";canvas.style .marginBottom = 0 + "px";
            canvas.style .marginLeft = margin + "px";canvas.style .marginRight = margin + "px";
        };
        if (center === "vertically") {
            margin = (window.innerHeight - canvas.offsetHeight * scale) / 2;
            canvas.style .marginTop  = margin + "px";canvas.style .marginBottom = margin + "px";
            canvas.style .marginLeft = 0      + "px";canvas.style .marginRight  = 0      + "px";
        };
        canvas.style.paddingLeft = 0 + "px";canvas.style.paddingRight  = 0 + "px";
        canvas.style.paddingTop  = 0 + "px";canvas.style.paddingBottom = 0 + "px";
        canvas.style.display = "-webkit-inline-box";
        return scale;
    }; 
    */
}
