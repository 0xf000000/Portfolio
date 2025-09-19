import { drawLine, getPoint, calculateNewPoint } from "./draw.js";
import { ObjectMesh } from "./ObjectMesh.js";


export default class FracTree extends ObjectMesh {

    constructor(baseangle, xPos, yPos) {
        super();
        this.bend = 0.1;
        this.ctx = null;
        this.xPos = xPos;
        this.yPos = yPos;
        this.baseangle = baseangle;
        this.direction = true;
        
        this.allPoints = [];
    }



    

    incAngle(angle, baseangle, bend) { return angle + baseangle + bend};
    decAngle(angle, baseangle, bend) {  return angle - baseangle - bend};


    checkAngle(){
         if (this.baseangle > Math.PI / 2 - 0.1) {
                window._stopped = true;
                this.direction = false;
                this.baseangle -= 0.01;
            };
            
            if (this.baseangle < 0.0) { 
                this.direction = true 
            };
    }

    checkDirection(){
         if (this.direction) {
                this.baseangle += 0.01;
            }
            
            if (!this.direction) {
                this.baseangle -= 0.01;
            }
    }


    drawTree(ctx, baseangle) {
        
        const start = getPoint(this.xPos, this.yPos , 0);
        const root = calculateNewPoint(start, 0, 300);
        const allPoints = [];
        let lineLength = 150;
        let endPoints;

        drawLine(ctx, start, root);

        endPoints = [root];

        for (let i = 0; i < 12; i++) {

            let temp = [];

            for (let point of endPoints) {

                let p1, p2;

                let leftAngle = this.decAngle(point.angle, baseangle, this.bend);
                let rightAngle = this.incAngle(point.angle, baseangle, this.bend);

                p1 = calculateNewPoint(point, leftAngle, lineLength)
                p2 = calculateNewPoint(point, rightAngle, lineLength);
                

                drawLine(ctx, point, p1);
                drawLine(ctx, point, p2);
                
                temp.push(p1, p2);
                allPoints.push(p1, p2);
            }
            lineLength *= 0.7;
            endPoints = temp;
        }
       
    }

    draw(){
        this.checkAngle();

        this.ctx.fillText(`Angle: ${this.baseangle}`, 20, 20, 500);
        this.drawTree(this.ctx, this.baseangle);

        this.checkDirection();
        
    }


}

