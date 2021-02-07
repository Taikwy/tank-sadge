
class TileManager{
    constructor(size = 0, width = 0, height = 0, xOffset = 0, yOffset = 0){
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.size = size;
        this.width = width;
        this.height = height;

        this.currentTileset;
        this.textures = [];
        this.setUpTextures();

        this.groundTiles = [];
        this.tiles = [];
        this.walls = [];
        this.breakables = [];
        this.passables = [];
        this.levelArray = [[]];
        this.proximityArray = [[]];
        this.unoccupied = [];

        // let t = new Tile( this.textures["tile"], this.size,  3, 3);
        // tiles.push(t);
        // gameScene.addChild(t);
    }

    setUpTextures(){
        this.currentTileset = "white";

        let textureSource = "tileset3.png";
        this.textures["teal"] = [];
        this.textures["teal"]["tile"] = [];
        this.textures["teal"]["border"] = [];
        this.textures["teal"]["wall"] = [];
        this.textures["teal"]["passable"] = [];

        this.textures["teal"]["tile"] = loadSpriteSheet(textureSource, 0, this.size, this.size, 4);
        this.textures["teal"]["border"] = loadSpriteSheet(textureSource, 1, this.size, this.size, 4);
        this.textures["teal"]["wall"].push(loadSpriteSheet(textureSource, 2, this.size, this.size, 4));
        this.textures["teal"]["wall"].push(loadSpriteSheet(textureSource, 3, this.size, this.size, 4));
        //this.textures["teal"]["passable"].push(loadSpriteSheet(source, 4, this.size, this.size, 4));
        //this.textures["teal"]["passable"].push(loadSpriteSheet(source, 5, this.size, this.size, 4));

        textureSource = "tileset4.png";
        this.textures["green"] = [];
        this.textures["green"]["tile"] = [];
        this.textures["green"]["border"] = [];
        this.textures["green"]["wall"] = [];
        this.textures["green"]["passable"] = [];

        this.textures["green"]["tile"] = loadSpriteSheet(textureSource, 0, this.size, this.size, 4);
        this.textures["green"]["border"] = loadSpriteSheet(textureSource, 1, this.size, this.size, 4);
        this.textures["green"]["wall"].push(loadSpriteSheet(textureSource, 2, this.size, this.size, 4));
        this.textures["green"]["wall"].push(loadSpriteSheet(textureSource, 3, this.size, this.size, 4));
        //this.textures["green"]["passable"].push(loadSpriteSheet(source, 4, this.size, this.size, 4));
        //this.textures["green"]["passable"].push(loadSpriteSheet(source, 5, this.size, this.size, 4));

        textureSource = "tileset2.png";
        this.textures["white"] = [];
        this.textures["white"]["tile"] = [];
        this.textures["white"]["border"] = [];
        this.textures["white"]["wall"] = [];
        this.textures["white"]["passable"] = [];

        this.textures["white"]["tile"] = loadSpriteSheet(textureSource, 0, this.size, this.size, 6);
        this.textures["white"]["border"] = loadSpriteSheet(textureSource, 1, this.size, this.size, 4);
        this.textures["white"]["wall"].push(loadSpriteSheet(textureSource, 2, this.size, this.size, 4));
        this.textures["white"]["wall"].push(loadSpriteSheet(textureSource, 3, this.size, this.size, 4));
        this.textures["white"]["passable"].push(loadSpriteSheet(textureSource, 4, this.size, this.size, 4));
        this.textures["white"]["passable"].push(loadSpriteSheet(textureSource, 5, this.size, this.size, 4));

        
    }

    createLevelGeometry(){
        this.resetTiles();    
        this.setTestTiles();
        this.setOutterWalls();   
        //this.createRandomTiles();
        this.createTiles();
        return this.levelArray;
    }

    setLevelGeometry(levelArray){
        this.resetTiles();
        this.levelArray = levelArray;
        this.setOutterWalls(); 
        this.createTiles();
    }

    createTile(xIn = 0, yIn = 0, tileset = this.currentTileset){
        let textures = [this.textures[tileset]["tile"][getRandomInt(0, this.textures[tileset]["tile"].length)]];
        let t = new Tile(textures, this.size, xIn, yIn);
        t.x += (this.xOffset + this.size/2);
        t.y += (this.yOffset + this.size/2);
        this.groundTiles.push(t);
        gameScene.addChild(t);
    }

    createBorderTile(xIn = 0, yIn = 0, tileset = this.currentTileset){
        let textures = this.textures[tileset]["border"];
        //let textures = this.textures["border"][getRandomInt(0, this.textures["border"].length)];
        let w = new WallTile(textures, this.size, xIn, yIn);
        w.x += (this.xOffset + this.size/2);
        w.y += (this.yOffset + this.size/2);
        this.tiles.push(w);
        this.walls.push(w);
        gameScene.addChild(w);
    }

    createWallTile(xIn = 0, yIn = 0, tileset = this.currentTileset){
        let textures = this.textures[tileset]["wall"][getRandomInt(0, this.textures[tileset]["wall"].length)];
        let w = new WallTile(textures, this.size, xIn, yIn);
        w.x += (this.xOffset + this.size/2);
        w.y += (this.yOffset + this.size/2);
        this.tiles.push(w);
        this.walls.push(w);
        gameScene.addChild(w);
    }

    createPassableTile(xIn = 0, yIn = 0, tileset = this.currentTileset){
        let textures = this.textures[tileset]["passable"][getRandomInt(0, this.textures[tileset]["passable"].length)];
        let p = new PassableTile(textures, this.size, xIn, yIn);
        p.x += (this.xOffset + this.size/2);
        p.y += (this.yOffset + this.size/2);
        this.tiles.push(p);
        this.passables.push(p);
        gameScene.addChild(p);
    }    

    createBreakableTile(xIn = 0, yIn = 0, tileset = this.currentTileset){
        let b = new WallTile(this.textures["breakable"], this.size, xIn, yIn);
        b.x += (this.xOffset + this.size/2);
        b.y += (this.yOffset + this.size/2);
        this.tiles.push(b);
        this.breakables.push(b);
        gameScene.addChild(b);
        console.log("culprit" + b.width);
        console.log(b.width);
    }

    resetTiles(){
        this.groundTiles = [];
        this.tiles = [];
        this.walls = [];
        this.breakables = [];
        this.passables = [];

        this.levelArray = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];        

        this.proximityArray = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    }

    setNeighbors(){
        for(let w of this.walls){

        }
        for(let b of this.breakables){
            
        }
        for(let p of this.passables){
            
        }
    }   

    setOutterWalls(){
        for (let r = 0; r < this.height; r ++) {
            for (let c = 0; c < this.width; c ++) {
                if(r == 0 || r == this.height-1 || c == 0 || c == this.width-1){
                    this.levelArray[r][c] = 9;
                }
            }
        }       
    }

    createTiles(){
        for (let r = 0; r < this.height; r ++) {
            for (let c = 0; c < this.width; c ++) {
                this.createTile(c, r);
                switch(this.levelArray[r][c]){
                    case 1:
                        this.createWallTile(c,r);
                        break;
                    case 2:
                        this.createPassableTile(c,r);
                        break;
                    case 3:
                        this.createBreakableTile(c,r);
                        break;
                    case 9:
                        this.createBorderTile(c,r);
                        break;
                }
            }
        }
    }

    setTestTiles(){
        let i = 0;
        let j = 0;
        let numTiles = 0;

        let totalTiles = this.width*this.height;

        while(i<8 || j<8){
            for (let r = 1; r < this.height-1; r ++) {
                for (let c = 1; c < this.width-1; c ++) {
                    if(getRandom(0,totalTiles) <= 1 && i<8){
                        this.levelArray[r][c] = 1;
                        i++; 
                        numTiles++;
                    }
                    else if(getRandom(0,totalTiles) <= 1&& j<8){
                        this.levelArray[r][c] = 2;
                        j++; 
                        numTiles++;
                    }
                }
            }
        }        
    }

    growRandomTiles(){
        let i = 0;
        let numTiles = 10;

        let totalTiles = this.width*this.height;

        this.setProximityArray(); 

        for (let r = 1; r < this.height-1; r ++) {
            for (let c = 1; c < this.width-1; c ++) {
                //Full random
                if(getRandom(0,totalTiles) <= 3){
                    this.levelArray[r][c] = 2;
                    this.proximityArray[r][c] = 100;
                    i++; 
                }
            }
        }

        this.setProximityArray();  
        while(i<numTiles){
            for (let r = 0; r < this.height; r ++) {
                for (let c = 0; c < this.width; c ++) {
                    if(getRandom(0,totalTiles-i) <= (this.proximityArray[r][c]+1)*160/100){
                        //console.log((this.proximityArray[r][c]+1)*160/100);
                        if( this.levelArray[r][c] == 0){
                            this.levelArray[r][c] = 1;
                            //this.proximityArray[r][c] = 100;
                            i++;
                        }
                        
                    }                    
                }
            }  
        }
        
        //console.log(this.proximityArray);
        //console.log(this.levelArray);
    }

    setProximityArray(){
        for (let r = 0; r < this.height; r ++) {
            for (let c = 0; c < this.width; c ++) {
                if(this.levelArray[r][c]!= 0){
                    this.setProximity(c, r, 50, 0.5, 5);
                }
            }
        }

        for (let r = 0; r < this.height; r ++) {
            for (let c = 0; c < this.width; c ++) {
                //Sets max and min proximity weights to 100 and 0
                if(this.proximityArray[r][c]>100){
                    this.proximityArray[r][c] = 100;
                }
                if(this.proximityArray[r][c]<0){
                    this.proximityArray[r][c] = 0;
                }
            }
        }
        //console.log(this.proximityArray);
    }

    setProximity(xIndex, yIndex, deviation, deviationCoeff, deviationRange){
        let distance = 0;
        for (let r = 1; r < this.height-1; r ++) {
            for (let c = 1; c < this.width-1; c ++) {
                distance = getDistance(xIndex, yIndex, c, r);
                if(distance <= deviationRange){
                    this.proximityArray[r][c] += Math.pow(deviationCoeff, distance)*deviation;      

                    //Sets max and min proximity weights to 100 and 0
                    // if(this.proximityArray[r][c]>100){
                    //     this.proximityArray[r][c] = 100;
                    // }
                    // if(this.proximityArray[r][c]<0){
                    //     this.proximityArray[r][c] = 0;
                    // }
                }         
            }
        }
    }

    createRandomTiles(){
        let i = 0;
        let numTiles = 70;

        while(i<numTiles){
            for (let r = 1; r < this.height-1; r ++) {
                for (let c = 1; c < this.width-1; c ++) {
                    //Full random
                    if(getRandom(0,160) <= 1){
                        this.createWallTile(c, r);
                        i++; 
                    }

                    //Even rows
                    // if(r%2 == 0 && getRandom(0,160) <= 1){
                    //     this.createWallTile(c, r);
                    //     i++; 
                    // }
                    //Odd rows
                    // if(r%2 != 0 && getRandom(0,160) <= 1){
                    //     this.createWallTile(c, r);
                    //     i++; 
                    // }

                    //Even columns
                    // if(c%2 == 0 && getRandom(0,160) <= 1){
                    //     this.createWallTile(c, r);
                    //     i++; 
                    // }
                    //Odd columns
                    // if(c%2 != 0 && getRandom(0,160) <= 1){
                    //     this.createWallTile(c, r);
                    //     i++; 
                    // }

                    //Even bomberman
                    // if(r%2 == 0 && c%2 == 0 && getRandom(0,160) <= 1){
                    //     this.createWallTile(c, r);
                    //     i++; 
                    // }
                    //Odd bomberman
                    // if(r%2 != 0 && c%2 != 0 && getRandom(0,160) <= 1){
                    //     this.createWallTile(c, r);
                    //     i++; 
                    //}

                    //Sqyares
                    // if(r%3 == 0 && c%3 != 0 && getRandom(0,160) <= 1){
                    //     this.createWallTile(c, r);
                    //     i++; 
                    // }
                    // if(r%3 != 0 && c%3 == 0 && getRandom(0,160) <= 1){
                    //     this.createWallTile(c, r);
                    //     i++; 
                    // }
                    // if(r%3 == 0 && c%3 == 0 && getRandom(0,160) <= 1){
                    //     this.createWallTile(c, r);
                    //     i++; 
                    // }


                    //Right diagonal
                    // if(r%3 == (c+1)%3 && getRandom(0,160) <= 1){
                    //     this.createWallTile(c, r);
                    //     i++; 
                    // }
                    //Left diagonal
                    // if(r%3 == (99-c)%3 && getRandom(0,160) <= 1){
                    //     this.createWallTile(c, r);
                    //     i++; 
                    // } 

                    //Right diagonal
                    // if(r%2 == 0 && c%2==0 && getRandom(0,160) <= 1){
                    //     this.createWallTile(c, r);
                    //     i++; 
                    // }

                    //Angles
                    // if(r%2 == 0){
                    //     if(c>=r){
                    //         this.createWallTile(c, r);
                    //         i++; 
                    //     }                        
                    // }
                    // if(c%2 == 0){
                    //     if(r>=c){
                    //         this.createWallTile(c, r);
                    //         i++; 
                    //     }
                    // }

                }
            }
        }        
    }
}

//Default tile, used for background
class Tile extends PIXI.AnimatedSprite{
    constructor(texture, size = 0, xIndex = 0, yIndex = 0) {
        super(texture);
        this.anchor.set(0.5,0.5); //Position, scaling, rotating, etc. are now from center of sprite
        this.size = size;
        this.x = xIndex * size;
        this.y = yIndex * size;
        this.xIndex = xIndex;
        this.yIndex = yIndex;
        this.health = 999;
        this.breakable = false;
        this.passable = false;
        this.collision = 1;

        this.animationSpeed = 0.15;
        this.play();
    }
}

//Blocks everything, can't be destroyed
class WallTile extends Tile{
    constructor(texture, size = 0, xIndex = 0, yIndex = 0) {
        super(texture, size, xIndex, yIndex);
        this.health = 999;
        this.breakable = false;
        this.passable = false;
    }
}

//Breakable tile
class BreakableTile extends Tile{
    constructor(textures, size = 0, xIndex = 0, yIndex = 0, health) {
        super(textures[health-1], size, xIndex, yIndex);
        this.health = health;
        this.breakable = true;
        this.passable = false;
        this.textures = textures;

        this.play();
    }

    takeDamage(source){
        this.health -= source.damage;
        if(this.health<=0){
            this.destroyed();
        }
        else{
            this.texture = this.textures[this.health-1];
        }
    }

    destroyed(){}
}

//Bullets can fly over
class PassableTile extends Tile{
    constructor(texture, size = 0, xIndex = 0, yIndex = 0) {
        super(texture, size, xIndex, yIndex);
        this.health = 999;
        this.breakable = false;
        this.passable = true;
    }
}
