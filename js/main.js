import { Drops } from "./drops.js";
import { KEYCODES } from "./keyCodes.js"
import Renderer from "./render.js";
import FracTree from "./tree.js";


window._stopped = false;


function reziseCanvas(canvas, ctx){
  
    
     
    if(!canvas){ return; }
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
    
     if(!ctx){ return }
     ctx.strokeStyle = "#EA2264";
     ctx.lineWidth = 0.5; // increase for more visibility
     ctx.lineJoin = "round";
     ctx.lineCap = "round";

    
    //return dpr;
}

function setupCtx(canvas){

    const ctx = canvas.getContext("2d");
   // ctx.scale(dpr, dpr);
    ctx.fillStyle = "#F78D60"
    ctx.strokeStyle = "#EA2264";
    ctx.lineWidth = 1; // increase for more visibility
    ctx.lineJoin = "round";
    ctx.lineCap = "round";


    return ctx;

}

function setupCanvas() {
   
    const body = document.body;
    let canvas = document.createElement("canvas");
    let ctx;
   
   
    body.appendChild(canvas);
    reziseCanvas(canvas,null); 
    
    canvas.style.border = "1px solid black";
    canvas.style.backgroundColor ="#0D1164";
    ctx = setupCtx(canvas);
    
    
   
    return {canvas , ctx};
}


function stopAnimation(){
    window._stopped = true;
}

function startAnimation(){
    window._stopped = false;
}


function handleKeyInput(keyobj){
   
    if(keyobj.keyCode == KEYCODES.SPACE && !window._stopped ){
        stopAnimation();
    }else{
        startAnimation();
    }
  

}


function setupEventListeners(canvas,ctx){
    window.addEventListener("resize", () => {reziseCanvas(canvas, ctx) });
    window.addEventListener("keydown", (event) => {
        event.preventDefault();
        handleKeyInput(event)
    } )
}



function setupObjectMeshes(){
    let objects = [];



    let tree1 = new FracTree(0.0, window.innerWidth / 4, window.innerHeight);
    let tree2 = new FracTree(0.0, (window.innerWidth / 4 ) * 3, window.innerHeight);
    let drops = new Drops(100);

    objects.push(tree1, tree2, drops);

    return objects;
}



function main() {

    const { canvas, ctx } = setupCanvas();
    const objectMeshes = setupObjectMeshes();
    const renderer = new Renderer(ctx, objectMeshes);

    

    setupEventListeners(canvas, ctx);
   
    renderer.render();

    return;
}



(function () {
    main();
})();