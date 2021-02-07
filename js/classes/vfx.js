class Explosion extends PIXI.AnimatedSprite{
    constructor(texture, x = 0, y = 0, speed, scale){
        super(texture);
        this.x = x;
        this.y = y;

        this.animationSpeed = speed/3;
        this.scale.set(scale);
        this.anchor.set(0.5,0.5);
        this.loop = false;
        this.onComplete = e => gameScene.removeChild(this);
        this.play();
    }
}

class Trail{
    constructor(texture, x = 0, y = 0, history = 5, rope = 50){
        this.trailTexture = texture;
        this.historyX = [];
        this.historyY = [];
        //How long trail wil be
        this.historySize = history;
        //How smooth trail will be
        this.ropeSize = rope;
        this.points = [];

        // Create history array.
        for (let i = 0; i < this.historySize; i++) {
            this.historyX.push(x);
            this.historyY.push(y);
        }
        // Create rope points.
        for (let i = 0; i < this.ropeSize; i++) {
            this.points.push(new PIXI.Point(x, y));
        }

        // Create the rope
        this.rope = new PIXI.SimpleRope(this.trailTexture, this.points);

        // Set the blendmode
        this.rope.blendmode = PIXI.BLEND_MODES.ADD;

        //app.stage.addChild(rope);
    }

    resetPoints(posX, posY){
        // Create history array.
        for (let i = 0; i < this.historySize; i++) {
            this.historyX[i] = posX;
            this.historyY[i] = posY;
        }
        // Create rope points.
        for (let i = 0; i < this.ropeSize; i++) {
            this.points[i].x = posX;
            this.points[i].y = posY;
        }

    }

    updatePoints(posX = mousePosition.x, posY = mousePosition.y, smooth = true){
        // Update the mouse values to history
        this.historyX.pop();
        this.historyX.unshift(posX);
        this.historyY.pop();
        this.historyY.unshift(posY);
        // Update the points to correspond with history.
        for (let i = 0; i < this.ropeSize; i++) {
            let p = this.points[i];

            if(smooth){
                // Smooth the curve with cubic interpolation to prevent sharp edges.
                let ix = cubicInterpolation(this.historyX, i / this.ropeSize * this.historySize);
                let iy = cubicInterpolation(this.historyY, i / this.ropeSize * this.historySize);

                p.x = ix;
                p.y = iy;
            }
            else{
                p.x = this.historyX[i];
                p.y = this.historyY[i];
            }
            
        }
    }
}

class Particle{
    constructor(){
        this.particle = fx.getParticleEmitter('paint');
        def.x = 900;
        def.y = 600;
        def.init(mainMenuScene, true, 1);
    }
}

class Track extends PIXI.AnimatedSprite{
    constructor(texture, x = 0, y = 0, r, speed, tSpeed){
        super(texture);
        this.anchor.set(0.5,0.5);
        this.x = x;
        this.y = y;
        this.rotation = r;

        this.animationSpeed = speed;
        this.loop = false;
        this.onComplete = e => gameScene.removeChild(this);
        this.play();

        this.transparentSpeed = tSpeed;
    }

    updateTransparency(){
        if(this.alpha == 0){
            gameScene.removeChild(this);
        }
    }
}