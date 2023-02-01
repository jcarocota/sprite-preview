import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
import { MainScene } from "./MainScene";
import { Config } from "./Config";

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
    this.mainScene.addCharacterToPreview(null);
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
    //console.log(ev);
    //console.log("gatito");
  }

  dropFile(ev) {
    //console.log(ev);
    //ev.stopr
    ev.preventDefault();
    this.mainScene.hideDragDropFilesMessage();

    /*const fs = require('fs');
        const os = require('os');
        const path = require('path');

        let tmpDir;
        const appPrefix = 'spine-preview';
        
        let nameAltas = null;
        let nameJson = null;
        let namePng = null;

        //console.log("droped");

        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...ev.dataTransfer.items].forEach((item, i) => {
              // If dropped items aren't files, reject them
              if (item.kind === 'file') {
                const file = item.getAsFile();
                console.log(`… file[${i}].name = ${file.name}`);
                console.log(file);
                console.log(file.name);

                let fileExtension = (/[.]/.exec(file.name)) ? /[^.]+$/.exec(file.name) : undefined;
                fileExtension = fileExtension ? fileExtension[0] : undefined; 
                console.log('fileExtension', fileExtension);

                switch (fileExtension) {
                    case 'json':
                        nameJson = file.name;
                        break;
                    case 'atlas': 
                        nameAltas = file.name;
                        break;
                    case 'png':
                        namePng = file.name;
                        break;
                }

                let fr = new FileReader();
                fr.onload = (e) => {
                    console.log("File read!");
                    console.log(fr.result);

                    try {
                        tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), appPrefix));
                        console.log('tmpDir', tmpDir);
                        // the rest of your app goes here
                      }
                      catch {
                        // handle error
                      }
                      finally {
                        try {
                          if (tmpDir) {
                            fs.rmSync(tmpDir, { recursive: true });
                          }
                        }
                        catch (e) {
                          console.error(`An error has occurred while removing the temp folder at ${tmpDir}. Please remove it manually. Error: ${e}`);
                        }
                      }

                    this.mainScene.addCharacterToPreview(e.target.result);
                }

                fr.readAsDataURL(file);

                let url = window.URL.createObjectURL(file);
                console.log("url", url);
              }
            });
          } else {
            // Use DataTransfer interface to access the file(s)
            [...ev.dataTransfer.files].forEach((file, i) => {
              console.log(`… file[${i}].name = ${file.name}`);
              console.log(file);
              console.log(file.path);
              
             
            });
          }

          console.log('ev.dataTransfer', ev.dataTransfer);

          if(!nameAltas || !nameJson || !namePng) {
            //not complete... show error
          } else {
            //this.mainScene.addCharacterToPreview(null);
          }
*/
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
