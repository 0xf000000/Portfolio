import { drawLine } from "./draw.js";
import { getRandomInt, lerp, vec2Normalize, vec2scale } from "./math.js";
import { ObjectMesh } from "./ObjectMesh.js";

export class Drops extends ObjectMesh{
    constructor(count){
        super(); 
        this.ctx = null;
        this.drops = [];
        this.DROP_COUNT = count;
        
        this.WIND_VELOCITY = 0.5;
        this.DROP_MIN_VELOCITY = 0.2;
        this.DROP_MAX_VELOCITY = 0.6;

        this.DROP_MIN_LENGTH = 20;
        this.DROP_MAX_LENGTH = 40;
        this.DROP_MIN_ALPHA = 0.3;
        this.DROP_MAX_ALPHA = 1;



        this.initializeDrops();
    }





    initializeDrops(){
        for(let i = 0; i < this.DROP_COUNT; i++){
            let drop = {};

            drop = this.resetDrop(drop);
            drop.y = getRandomInt(0, window.innerHeight);

            this.drops.push(drop);
        }

    }

    resetDrop(drop){
        let scale = Math.random();

        drop.x = getRandomInt(0, window.innerWidth);
        drop.vx = this.WIND_VELOCITY;
        drop.vy = lerp(this.DROP_MIN_VELOCITY, this.DROP_MAX_VELOCITY, scale);
        drop.l = lerp(this.DROP_MIN_LENGTH, this.DROP_MAX_LENGTH, scale);
        drop.a = lerp(this.DROP_MIN_ALPHA, this.DROP_MAX_ALPHA, scale);
        drop.y = getRandomInt(-drop.l, 0);

        return drop;
    }

    update( drop ,dt){
      
            drop.x += drop.vx * dt;
            drop.y += drop.vy * dt;

            if(drop.y > window.innerHeight + drop.l){
              drop =  this.resetDrop(drop)
            }


            return
 
    }

    setupCTX(){
        this.ctx.save();

        this.ctx.strokeStyle = "lightblue";
        this.ctx.lineWidth = 2;
        this.ctx.compositeOperation = "lighter";
    
        return;
    }



    draw(){
        
        for(let i = 0; i < this.drops.length; i++){

            var drop = this.drops[i];

            this.update(drop,1);

            let x1 = Math.round(this.drops[i].x);
            let y1 = Math.round(this.drops[i].y);

            var v = {x: drop.vx, y : drop.vy };


            v = vec2Normalize(v);
            v = vec2scale(v, -drop.l);

            let x2 = Math.round(x1 + v.x);
            let y2 = Math.round(y1 + v.y);

            this.ctx.globalAlpha = drop.a;

            drawLine(this.ctx, {x: x1, y:y1}, {x: x2, y: y2} );

        }
        
        this.ctx.restore();


    }


}