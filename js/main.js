import { Drops } from "./drops.js";
import { KEYCODES } from "./keyCodes.js"
import Renderer from "./render.js";
import FracTree from "./tree.js";


window._stopped = false;




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
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
   
    body.appendChild(canvas);
   
    
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
  
    window.addEventListener("keydown", (event) => {
        event.preventDefault();
        handleKeyInput(event)
    } )
}



function setupObjectMeshes(){
    let objects = [];



  
    let tree1 = new FracTree(0.0, (window.innerWidth / 2 ), window.innerHeight);
    let drops = new Drops(1000);
    
    objects.push(drops,tree1);

    return objects;
}

// this is lokey shit i want to make the renderer somehow globally available but maby not like this so i can change the position of the objects in the event listener




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