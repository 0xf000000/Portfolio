import fracTree from "./tree.js";

// this is a little render class well not really because here is also some logic for the frac tree but i think like this is kinda okay otherwise i also would have to write a class for the frac then, what idont intend to do rn maby if more functionality comes
export default class Renderer {

    constructor(ctx) {
        this.delay = 20;
        this.ctx = ctx;
        this.direction = true;
       
        this.before = performance.now();

        this.tree = new fracTree(ctx, 0.0);
    }


    cleanup(){
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }


    renderLoop() {
            let now = performance.now();

            const timeElapsed = now - this.before;

            if (timeElapsed > this.delay) {

                if (!window._stopped) {
                    
                    this.cleanup();
                    this.tree.drawLoop();
                    

                } 

             this.before = now;
        }

        requestAnimationFrame( () => this.renderLoop() );

    }

}