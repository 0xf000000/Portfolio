// for all the events that will happen w the canvas, and i need a way to get the positions of all objects inside of the sceen

import FracTree from "./tree.js";


export class CanvasEventManager {
    constructor(renderer) {
        this.renderer = renderer;

        this.initializeEvents();
    }

    initializeEvents() {
        let ctx = this.renderer.ctx;
        let canvas = ctx.canvas;

        window.addEventListener("resize", (event) => {

          
            this.reziseCanvas(canvas, ctx);

            this.resizeTree(this.renderer.meshObjects);
        });

        

    }


    resizeTree(meshObjects){
        
        for(let i = 0; i < meshObjects.length; i++){

            if(meshObjects[i] instanceof FracTree ){
                
                meshObjects[i].xPos = window.innerWidth / 2;
                meshObjects[i].yPos = window.innerHeight;
            }
        }



        return;
    }


    reziseCanvas(canvas, ctx) {



        if (!canvas) { return; }
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
  
        if (!ctx) { return }
        ctx.strokeStyle = "#EA2264";
        ctx.lineWidth = 0.5; // increase for more visibility
        ctx.lineJoin = "round";
        ctx.lineCap = "round";


        //return dpr;
    }


}