import { CanvasEventManager } from "./canvasEventManager.js";
import fracTree from "./tree.js";

// this is a little render class well not really because here is also some logic for the frac tree but i think like this is kinda okay otherwise i also would have to write a class for the frac then, what idont intend to do rn maby if more functionality comes
export default class Renderer {

    constructor(ctx, meshObjects) {
        this.delay = 20;
        this.ctx = ctx;
        this.direction = true;
       
        this.before = performance.now();
        this.meshObjects = meshObjects;
        
        this.canvasEventManager = new CanvasEventManager(this);
        this.configureCtx();

        
    }

    configureCtx(){

        for(let i = 0; i < this.meshObjects.length; i++){
            this.meshObjects[i].setCtx(this.ctx);
        }

    }



    cleanup(){
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }


    render() {
            let now = performance.now();

            const timeElapsed = now - this.before;

            if (timeElapsed > this.delay) {

                if (!window._stopped) {
                    
                    this.cleanup();
                  

                    for(let i = 0; i < this.meshObjects.length; i++){
                        
                        this.meshObjects[i].draw();

                    }




                } 

             this.before = now;
        }

        requestAnimationFrame( () => this.render() );

    }

}