//---------------------------------------------------------------------GRAPHICS---------------------------------------------------------------------------------
//Loads a sprite sheet given specifications
function loadSpriteSheet(source, row = 0, width = 0, height = 0, frames = 0) {  
    let baseTexture = new PIXI.BaseTexture.from(source);
    let sprites = [];    
    if(frames == 1){
        let sprite = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, row*height, width, height));
        return sprite;        
    }
    for (let i = 0; i < frames; i++) {
        let sprite = new PIXI.Texture(baseTexture, new PIXI.Rectangle(i * width, row*height, width, height));
        sprites.push(sprite);
    }    
    return sprites;
}

function loadSprite(source, xOrigin = 0, yOrigin = 0, width = 0, height = 0){
    let baseTexture = new PIXI.BaseTexture.from(source);
    if(width == 0 || height == 0){
        let sprite = new PIXI.Texture(baseTexture, new PIXI.Rectangle(xOrigin, yOrigin, baseTexture.realWidth, baseTexture.realHeight));
        return sprite;
    }
    let sprite = new PIXI.Texture(baseTexture, new PIXI.Rectangle(xOrigin, yOrigin, width, height));
    return sprite;
}

//Assigns the proper sound files to all the sound variables
function loadSound(source, volume){
    let sound = new Howl({
        src: [source],
        volume: volume
    });
    return sound;
}

function arrayContains(bigArray, smallArray){
    for(let r = 0; r < bigArray.length; r++){
        let checker = [];
        for(let c = 0; c < bigArray[r].length; c++){
            if(bigArray[r][c] == smallArray[c])
                checker.push(true);
            else
                checker.push(false);
        }
        if(!checker.includes(false))
            return true;
    }
    return false;
}

function duplicate(array){
    let tempArray = [];
    //console.log(array[0].length);
    if(!array[0].length){
        return array.slice();
    }
    for(let r = 0; r < array.length; r++){
        tempArray[r] = array[r].slice();
    }
    return tempArray;
}

//---------------------------------------------------------------------MATH---------------------------------------------------------------------------------
//returns a random value between the two values, inclusive min, exclusive max
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

//Inclusive min, exclusive max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

  function getDistance(aX, aY, bX, bY){
    let xDiff = bX - aX;
    let yDiff = bY - aY;
    let squaredDist = Math.pow(xDiff, 2) + Math.pow(yDiff, 2);
    return Math.sqrt(squaredDist);
}

/**
 * Cubic interpolation based on https://github.com/osuushi/Smooth.js
 */
function clipInput(k, arr) {
    if (k < 0) k = 0;
    if (k > arr.length - 1) k = arr.length - 1;
    return arr[k];
}

function getTangent(k, factor, array) {
    return factor * (clipInput(k + 1, array) - clipInput(k - 1, array)) / 2;
}

function cubicInterpolation(array, t, tangentFactor) {
    if (tangentFactor == null) tangentFactor = 1;

    const k = Math.floor(t);
    const m = [getTangent(k, tangentFactor, array), getTangent(k + 1, tangentFactor, array)];
    const p = [clipInput(k, array), clipInput(k + 1, array)];
    t -= k;
    const t2 = t * t;
    const t3 = t * t2;
    return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + (-2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
}

//========================================================== Vector class: x, y, magnitudes, etc =================================================================
class Vector{
    constructor(x,y, x2, y2)
    {
        this.x = x;
        this.y = y;
        this.x2 = x2;
        this.y2 = y2;

        this.xMagnitude = x2 - x;
        this.yMagnitude = y2 - y;

        this.magnitude = Math.sqrt((this.xMagnitude*this.xMagnitude) + (this.yMagnitude*this.yMagnitude));
    }

    //Sets magnitude to 1
    normalize()
    {
        this.xMagnitude = this.xMagnitude / this.magnitude;
        this.yMagnitude = this.yMagnitude / this.magnitude;
        this.magnitude = 1;    
    }

    //Finds normal vector sharing the same startpoint
    findNormal(){
        let normalVect = new Vector(this.x, this.y, this.x + this.yMagnitude, this.y + (-this.xMagnitude))
        return normalVect;
    }

    //Subtract vect 2 from vect 1 (vect 1 - vect 2)
    subtract(vec2)
    {
        // X2 and Y2 remain the same
        this.x = vec2.x2;
        this.y = vec2.y2;
        
        //Recalculate the magnitudes
        this.xMagnitude = (this.xMagnitude - vec2.xMagnitude);
        this.yMagnitude = (this.yMagnitude - vec2.yMagnitude);
        this.magnitude = Math.sqrt((this.xMagnitude*this.xMagnitude) + (this.yMagnitude*this.yMagnitude));
    }

    //Finds angle between the 2 vectors
    findAngle(vec2){
        let dot = this.dotProduct(vec2);
        let magnitudes = vec2.magnitude * vec2.magnitude;
        let theta = Math.acos(dot/magnitudes);
        return theta;
    }

    //Finds the projection of current vector onto second vector
    projection(vec2){
        let dot = this.dotProduct(vec2);
        let magnitudes = vec2.magnitude * vec2.magnitude;
        let projectionVect = vec2.multiplyBy(dot/magnitudes);
        return projectionVect;
    }

    //Add vector 2 to vector 1
    add(vec2)
    {
        // X and Y remain the same
        this.x2 = vec2.x2;
        this.y2 = vec2.y2;
        
        //Recalculate the magnitudes
        this.xMagnitude = (this.xMagnitude + vec2.xMagnitude);
        this.yMagnitude = (this.yMagnitude + vec2.yMagnitude);
        this.magnitude = Math.sqrt((this.xMagnitude*this.xMagnitude) + (this.yMagnitude*this.yMagnitude));
    }

    //Finds dotproduct
    dotProduct(vec2){
        let newX = this.xMagnitude * vec2.xMagnitude;
        let newY = this.yMagnitude * vec2.yMagnitude;

        //console.log(this, vec2);
        //console.log(newX + newY);
        return newX + newY;
    }

    //Multiply by scalar
    multiplyBy(num)
    {
        //X and y remain the same
        this.x2 = this.x2 * num;
        this.y2 = this.y2 * num;

        //Recalculate the magnitudes
        this.xMagnitude = this.x2 - this.x;
        this.yMagnitude = this.y2 - this.y;
        this.magnitude = Math.sqrt((this.xMagnitude*this.xMagnitude) + (this.yMagnitude*this.yMagnitude));
    }
}

//returns a random direction as a Vector
function getRandomUnitVector(){
  let x = getRandom(-1,1);
  let y = getRandom(-1,1);
  let length = Math.sqrt(x*x + y*y);
  if(length == 0){ // very unlikely
      x=1; // point right
      y=0;
      length = 1;
  } else{
      x /= length;
      y /= length;
  }

  return {x:x, y:y};
}