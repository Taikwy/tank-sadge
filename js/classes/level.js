class LevelManager{
    constructor(size = 0, width = 0, height = 0, xOffset = 0, yOffset = 0){
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.size = size;
        this.width = width;
        this.height = height;

        this.levelArray = [[]];
        this.tileArray = [[]];
        this.enemyArray = [[]];

        this.playerTank;

        this.enemyTanks = [];
        this.bullets = [];
        this.tiles = [];

        this.maxEnemies = 1;
        this.threatLevel = 1;
        this.threatIndex = 1;
        this.layoutDifficulty = 1;

        this.layoutManager = new LayoutManager(width, height);
        this.tileTemplates = [];
        this.enemyTemplates = [];
        this.setupTemplates();

        this.tutorialTileArrays = [];
        this.tutorialEnemyArrays = [];
        this.setupTutorial();

        this.levelNumber = 0;
        this.currentLevelNumber = 0;
        this.currentMaxLevels = [];

        this.timeElapsed = 0;
    }

    setPosition(object, xIndex, yIndex){
        object.x = xIndex * this.size + (this.xOffset + this.size/2);
        object.y = yIndex * this.size + (this.yOffset + this.size/2);
    }

    setupTutorial(){
        this.tutorialTileArrays = [];
        this.tutorialEnemyArrays = [];

        this.tutorialTileArrays.push(this.tileTemplates["basic1"]);
        this.tutorialEnemyArrays.push(this.enemyTemplates["basic1"]);

        this.tutorialTileArrays.push(this.tileTemplates["basic1"]);
        this.tutorialEnemyArrays.push(this.enemyTemplates["basic1"]);

        this.tutorialTileArrays.push(this.tileTemplates["basic2"]);
        this.tutorialEnemyArrays.push(this.enemyTemplates["basic2"]);

        // this.tutorialTileArrays.push(this.tileTemplates["basic1"]);
        // this.tutorialEnemyArrays.push(this.enemyTemplates["basic1"]);

        // this.tutorialTileArrays.push(this.tileTemplates["basic1"]);
        // this.tutorialEnemyArrays.push(this.enemyTemplates["basic1"]);

        // this.tutorialTileArrays.push(this.tileTemplates["basic1"]);
        // this.tutorialEnemyArrays.push(this.enemyTemplates["basic1"]);

        // this.tutorialTileArrays.push(this.tileTemplates["basic1"]);
        // this.tutorialEnemyArrays.push(this.enemyTemplates["basic1"]);

        // this.tutorialTileArrays.push(this.tileTemplates["basic1"]);
        // this.tutorialEnemyArrays.push(this.enemyTemplates["basic1"]);

        // this.tutorialTileArrays.push(this.tileTemplates["basic1"]);
        // this.tutorialEnemyArrays.push(this.enemyTemplates["basic1"]);

        // this.tutorialTileArrays.push(this.tileTemplates["basic1"]);
        // this.tutorialEnemyArrays.push(this.enemyTemplates["basic1"]);
    }

    setupTemplates(){
        this.enemyTemplates["basic1"] = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        this.enemyTemplates["basic2"] = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    }

    setUpTileTemplates(){
        this.tileTemplates["basic1"] = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.tileTemplates["basic2"] = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    }

    createLevel(mode){
        this.resetLevel();
        switch(mode){
            case "random":
                this.randomMode()
                break;
            case "tutorial":
                this.currentMaxLevels = this.tutorialTileArrays;
                this.tutorialMode(this.levelNumber);
                //console.log("level created");
                break;
        }
    }

    randomMode(symmetryType = this.symmetryType, maxEnemies = this.maxEnemies, threatLevel = this.threatLevel, threatIndex = this.threatIndex){
        console.log("");
        console.log(symmetryType);
        // switch(symmetryType){
        //     case "none":
        //         maxStructs = 8;
        //         maxTiles = 40;
        //         break;
        //     case "horizontal":
        //         maxStructs = 5;
        //         maxTiles = 20;
        //         break;
        //     case "vertical":
        //         maxStructs = 5;
        //         maxTiles = 20;
        //         break;
        //     case "both":
        //         maxStructs = 3;
        //         maxTiles = 12;
        //         break;
        //     case "diagonal":
        //         maxStructs = 3;
        //         maxTiles = 12;
        //         break;
        // }

        this.tileArray = this.layoutManager.createLayout(symmetryType);
        tileManager.setLevelGeometry(this.tileArray);
        while(true){
            let playerX = getRandomInt(3, 7);
            let playerY = getRandomInt(7, 10);
            if(this.tileArray[playerY][playerX] == 0){
                playerManager.spawnPlayer(playerX, playerY);
                break;
            }
        }
        this.enemyArray = enemyManager.spawnEnemies(threatLevel, threatIndex);
    }

    tutorialMode(stageNumber){
        this.resetLevel();
        this.tileArray = this.tutorialTileArrays[stageNumber-1];
        this.enemyArray = this.tutorialEnemyArrays[stageNumber-1];

        tileManager.setLevelGeometry(this.tileArray);
        enemyManager.setEnemies(this.enemyArray);
        playerManager.spawnPlayer(7, 7);
    }

    resetLevel(){
        this.timeElapsed = 0;

        this.tileArray = [
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

        this.enemyArray = [
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

    setProximityArray(){
        for (let r = 0; r < this.height; r ++) {
            for (let c = 0; c < this.width; c ++) {
                if(this.tileArray[r][c]!= 0){
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
}

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
class LayoutManager{
    constructor(width = 0, height = 0){
        this.width = width;
        this.height = height;

        this.currentSymmetry = "";
        this.currentLayoutType = "";
        this.layoutTypes = [];
        this.currentLayout = [[]];

        this.levelLayout = [[]];
        this.tileLayout = [[]];
        this.enemyLayout = [[]];

        this.numTiles;
        this.numWalls;

        this.playerTank;

        this.enemyTanks = [];
        this.bullets = [];
        this.tiles = [];

        this.tileTemplates = [];
        this.enemyTemplates = [];
        this.setupTemplates();

        this.structureManager = new StructureManager();
    }

    setupTemplates(){
        this.tileTemplates["basic1"] = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.tileTemplates["basic2"] = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    }

    resetLayouts(){
        //this.tiles = [];
        //this.walls = [];
        //this.breakables = [];
        //this.passables = [];

        this.tileLayout = [
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

        this.enemyLayout = [
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

    updateNumtiletypes(){
        this.numTiles = 0;
        this.numWalls = 0;
        
        for(let r = 0; r < this.height; r++){
            for(let c = 0; c < this.width; c++){
                switch(this.tileLayout[r][c]){
                    case 0:
                        this.numTiles++;
                        break;
                    case 1:
                        this.numWalls++;
                        break;
                }
            }
        }
        
    }

    createLayout(symmetryType = this.currentSymmetry){
        this.resetLayouts();

        let rMin = 1;
        let cMin = 1;
        let rMax;
        let cMax;
        
        let maxStructs;
        let maxTiles;
        switch(symmetryType){
            case "none":
                rMax = this.height-1;
                cMax = this.width-1;
                maxStructs = 8;
                maxTiles = 40;
                break;
            case "horizontal":
                rMax = this.height-1
                cMax = (this.width/2);
                maxStructs = 5;
                maxTiles = 20;
                break;
            case "vertical":
                rMax = (this.height/2);
                cMax = this.width-1;
                maxStructs = 5;
                maxTiles = 20;
                break;
            case "both":
                rMax = (this.height/2)
                cMax = (this.width/2);
                maxStructs = 3;
                maxTiles = 12;
                break;
            case "diagonal":
                rMax = (this.height/2)
                cMax = (this.width/2);
                maxStructs = 3;
                maxTiles = 12;
                break;
        }

        //Creates the first half of the level
        this.createStructs(rMin, cMin, rMax, cMax, maxStructs, maxTiles);

        //unique diag case
        if(symmetryType == "diagonal"){
            rMin = rMax;
            cMin = 1;
            rMax = this.height - 1;
            cMax = cMax;
            
            //Creates bottom left quarter
            this.createStructs(rMin, cMin, rMax, cMax, maxStructs, maxTiles);

            //Mirrors the left half to the right half
            this.tileLayout = this.mirrorHorizontal();
            //Flips the right half vertically
            this.tileLayout = this.flipVertical(this.width/2);
        }
        else if(symmetryType == "both"){
            this.tileLayout = this.mirrorVertical();
            this.tileLayout = this.mirrorHorizontal();            
        }
        else{
            //If only top half filled, flip to fill bottom half
            if(rMax < this.height-1){
                this.tileLayout = this.mirrorVertical();
                this.tileLayout = this.flipHorizontal(this.height/2);
            }
            //If only right half filled, flip to fill left half
            if(cMax < this.width-1){
                this.tileLayout = this.mirrorHorizontal();
                this.tileLayout = this.flipVertical(this.width/2);
            }
        }
        console.log("=======================");
        if(this.checkValid(this.tileLayout) == false){
            console.log("bruhhh--------------");
            this.createLayout(symmetryType);
        }
            
        return this.tileLayout;
    }

    //============================================= LAYOUT TRANSFORMATION FUNCTIONS ====================================================
    flipVertical(cHalf, tileLayout = this.tileLayout){
        let tempTileLayout = duplicate(tileLayout);
        let rMax = tileLayout.length;
        let cMax = tileLayout[0].length;

        for(let r = 0; r < rMax; r++){
            for(let c = cHalf; c < cMax; c++){
                tempTileLayout[(rMax - 1) - r][c] = tileLayout[r][c];
            }
        }
        return tempTileLayout;
    }

    flipHorizontal(rHalf, tileLayout = this.tileLayout){
        let tempTileLayout = duplicate(tileLayout);
        let cMax = tileLayout[0].length;
        let rMax = tileLayout.length;

        for(let c = 0; c < cMax; c++){
            for(let r = rHalf; r < rMax; r++){
                tempTileLayout[r][(cMax - 1) - c] = tileLayout[r][c];
            }
        }
        return tempTileLayout;
    }

    mirrorVertical(tileLayout = this.tileLayout){
        let tempTileLayout = duplicate(tileLayout);

        let cMin = 1;
        let cMax = this.width - 1;
        let rHalf = this.height/2;
        let rMax = this.height - 1;

        let rTop = 1;
        for(let rBot = rMax - 1; rBot >= rHalf; rBot--){
            for(let c = cMin; c < cMax; c++){
                tempTileLayout[rBot][c] = tileLayout[rTop][c];
            }
            rTop++;
        }
        return tempTileLayout;
    }

    mirrorHorizontal(tileLayout = this.tileLayout){
        let tempTileLayout = duplicate(tileLayout);

        let rMin = 1;
        let rMax = this.height - 1;
        let cHalf = this.width/2;
        let cMax = this.width - 1;

        let cLeft = 1;
        for(let cRight = cMax - 1; cRight >= cHalf; cRight--){
            
            for(let r = rMin; r < rMax; r++){
                tempTileLayout[r][cRight] = tileLayout[r][cLeft];
            }
            cLeft++;
        }
        return tempTileLayout;
    }


    //Checks if the given tile layout is a valid layout
    checkValid(currentTileLayout){
        //console.log("checkvalid============================================");
        //console.log(currentTileLayout);

        let rMin = 0;
        let cMin = 0;
        let rMax = currentTileLayout.length;
        let cMax = currentTileLayout[0].length; 

        let totalBlankTiles = 0;
        let numBlankTiles = 0;
        for(let r = rMin; r < rMax; r++){
            for(let c = cMin; c < cMax; c++){
                let tile = [currentTileLayout[r][c], r, c];
                let allNeighbors = this.allNeighbors(tile, currentTileLayout);
                let cardinalNeighbors = this.cardinalNeighbors(tile, currentTileLayout);

                if(tile[0] == 0){
                    totalBlankTiles++;
                    if(this.differentType(tile, cardinalNeighbors).length > 2){
                        return false;
                    }
                    if(numBlankTiles == 0){
                        numBlankTiles = this.reachableTiles(tile, currentTileLayout).length;
                    }
                }
                if(tile[0] == 1){
                    if(this.sameType(tile, allNeighbors).length >= 6){
                        //console.log("cucked type 1")
                        return false;
                    }
                    //console.log(allNeighbors.length);
                    if(allNeighbors.length <= 5){
                        //console.log("edge case");
                        let edgeTiles = 1;
                        for(let neighbor of this.sameType(tile, allNeighbors)){
                            if(this.allNeighbors(neighbor, currentTileLayout).length <= 5){
                                edgeTiles++;
                            }
                        }
                        if(edgeTiles == 3){
                            //console.log("edge");
                            return false;
                        }
                    }
                    if(this.hasDiagNeighbors([currentTileLayout[r][c], r, c ], currentTileLayout)){
                        //console.log("diag");
                        return false;
                    }
                }
            }
        }
        //console.log(numBlankTiles);
        if(numBlankTiles < totalBlankTiles){
            //console.log("cut off");
            return false;
        }
        //console.log("VALID");
        return true;
    }

    //Finds the number of recursive adjacent tiles of the same type
    reachableTiles(tile, currentTileLayout, checkedTiles = []){
        checkedTiles.push(tile);

        let cardinalNeighbors =  this.cardinalNeighbors(tile, currentTileLayout);
        let sameTypeNeighbors = this.sameType(tile, cardinalNeighbors);

        for(let neighbor of sameTypeNeighbors){
            if(arrayContains(checkedTiles, neighbor) == false){
                this.reachableTiles(neighbor, currentTileLayout, checkedTiles);
            }
        }
        return checkedTiles;
    }

    //=================================================== NEIGHBOR FUNCTIONS ===============================================================
    cardinalNeighbors(tile, currentTileLayout){
        let tiles = [];
        let r = tile[1];
        let c = tile[2];

        let rMax = currentTileLayout.length;
        let cMax = currentTileLayout[0].length;

        //console.log(r + " " + c);
        if(r + 1 < rMax){
            let tile = [currentTileLayout[r + 1][c], r + 1, c];
            tiles.push(tile);
        }
        if(r - 1 >= 0){
            let tile = [currentTileLayout[r - 1][c], r - 1, c];
            tiles.push(tile);
        }
        if(c + 1 < cMax){
            let tile = [currentTileLayout[r][c + 1], r, c + 1];
            tiles.push(tile);
        }
        if(c - 1 >= 0){
            let tile = [currentTileLayout[r][c - 1], r, c - 1];
            tiles.push(tile);
        }
        //console.log(tiles.length);
        return tiles;
    }

    diagNeighbors(tile, currentTileLayout){
        let tiles = [];
        let r = tile[1];
        let c = tile[2];

        let rMax = currentTileLayout.length;
        let cMax = currentTileLayout[0].length;

        //console.log(r + " " + c);
        if(r + 1 < rMax){
            if(c + 1 < cMax){
                tile = [currentTileLayout[r + 1][c + 1], r + 1, c + 1];
                tiles.push(tile);
            }
            if(c - 1 >= 0){
                tile = [currentTileLayout[r + 1][c - 1], r + 1, c - 1];
                tiles.push(tile);
            }
        }
        if(r - 1 >= 0){
            if(c + 1 < cMax){
                tile = [currentTileLayout[r - 1][c + 1], r - 1, c + 1];
                tiles.push(tile);
            }
            if(c - 1 >= 0){
                tile = [currentTileLayout[r - 1][c - 1], r - 1, c - 1];
                tiles.push(tile);
            }
        }
        //console.log(tiles.length);
        return tiles;
    }

    allNeighbors(tile, currentTileLayout){
        let tiles = [];
        let r = tile[1];
        let c = tile[2];

        let rMax = currentTileLayout.length;
        let cMax = currentTileLayout[0].length;

        //console.log(r + " " + c);
        if(r + 1 < rMax){
            let tile = [currentTileLayout[r + 1][c], r + 1, c];
            tiles.push(tile);
            if(c + 1 < cMax){
                tile = [currentTileLayout[r + 1][c + 1], r + 1, c + 1];
                tiles.push(tile);
            }
            if(c - 1 >= 0){
                tile = [currentTileLayout[r + 1][c - 1], r + 1, c - 1];
                tiles.push(tile);
            }
        }
        if(r - 1 >= 0){
            let tile = [currentTileLayout[r - 1][c], r - 1, c];
            tiles.push(tile);
            if(c + 1 < cMax){
                tile = [currentTileLayout[r - 1][c + 1], r - 1, c + 1];
                tiles.push(tile);
            }
            if(c - 1 >= 0){
                tile = [currentTileLayout[r - 1][c - 1], r - 1, c - 1];
                tiles.push(tile);
            }
        }
        if(c + 1 < cMax){
            let tile = [currentTileLayout[r][c + 1], r, c + 1];
            tiles.push(tile);
        }
        if(c - 1 >= 0){
            let tile = [currentTileLayout[r][c - 1], r, c - 1];
            tiles.push(tile);
        }
        //console.log(tiles.length);
        return tiles;
    }

    hasDiagNeighbors(tile, currentTileLayout){
        let sameCard = this.sameType(tile, this.cardinalNeighbors(tile, currentTileLayout));
        let sameDiag = this.sameType(tile, this.diagNeighbors(tile, currentTileLayout));

        if(sameCard.length == 2){
            for(let card of sameCard){
                if(card[1] == tile[1] + 1){
                    if(sameCard.includes([tile[0], tile[1], tile[2] + 1])){
                        if(sameDiag.includes([tile[0], tile[1] - 1, tile[2] - 1]))
                            return true;
                    }
                    else if(sameCard.includes([tile[0], tile[1], tile[2] - 1])){
                        if(sameDiag.includes([tile[0], tile[1] - 1, tile[2] + 1]))
                            return true;
                    }
                }
                if(card[1] == tile[1] - 1){
                    if(sameCard.includes([tile[0], tile[1], tile[2] + 1])){
                        if(sameDiag.includes([tile[0], tile[1] + 1, tile[2] - 1]))
                            return true;
                    }
                    else if(sameCard.includes([tile[0], tile[1], tile[2] - 1])){
                        if(sameDiag.includes([tile[0], tile[1] + 1, tile[2] + 1]))
                            return true;
                    }
                }
                if(card[2] == tile[2] + 1){
                    if(sameCard.includes([tile[0], tile[1] + 1, tile[2]])){
                        if(sameDiag.includes([tile[0], tile[1] - 1, tile[2] -1 ]))
                            return true;
                    }
                    if(sameCard.includes([tile[0], tile[1] - 1, tile[2]])){
                        if(sameDiag.includes([tile[0], tile[1] + 1, tile[2] - 1]))
                            return true;
                    }
                }
                if(card[2] == tile[2] - 1){
                    if(sameCard.includes([tile[0], tile[1] + 1, tile[2]])){
                        if(sameDiag.includes([tile[0], tile[1] - 1, tile[2] + 1]))
                            return true;
                    }
                    if(sameCard.includes([tile[0], tile[1] - 1, tile[2]])){
                        if(sameDiag.includes([tile[0], tile[1] + 1, tile[2] + 1]))
                            return true;
                    }
                }
            }
            //console.log("2 bros");
            //console.log(tile);
        }
        else if(sameCard.length == 1){
            //console.log("1 hguy");
            //console.log(tile);
            for(let card of sameCard){
                if(card[1] == tile[1] + 1){
                    //console.log(tile);
                    //console.log(sameCard);
                    //console.log(sameDiag);
                    // console.log(sameDiag[0]);
                    // console.log(sameDiag.includes(sameDiag[0]));
                    // console.log("======================");
                    if(sameDiag.includes([tile[0], tile[1] - 1, tile[2] - 1]))
                        return true;
                    if(sameDiag.includes([tile[0], tile[1] - 1, tile[2] + 1]))
                        return true;
                }
                if(card[1] == tile[1] - 1){
                    //console.log(tile);
                    //console.log(sameCard);
                    //console.log(sameDiag);
                    // console.log(sameDiag[0]);
                    // console.log(sameDiag.includes(sameDiag[0]));
                    // console.log("======================");
                    if(sameDiag.includes([tile[0], tile[1] + 1, tile[2] - 1]))
                        return true;
                    if(sameDiag.includes([tile[0], tile[1] + 1, tile[2] + 1]))
                        return true;
                }
                if(card[2] == tile[2] + 1){
                    //console.log(tile);
                    //console.log(sameCard);
                    //console.log(sameDiag);
                    // console.log(sameDiag[0]);
                    // console.log(sameDiag.includes(sameDiag[0]));
                    // console.log("======================");
                    if(sameDiag.includes([tile[0], tile[1] - 1, tile[2] - 1 ]))
                        return true;
                    if(sameDiag.includes([tile[0], tile[1] + 1, tile[2] - 1]))
                        return true;
                }
                if(card[2] == tile[2] - 1){
                    //console.log(tile);
                    //console.log(sameCard);
                    //console.log(sameDiag);
                    // console.log(sameDiag[0]);
                    // console.log(sameDiag.includes(sameDiag[0]));
                    //console.log("======================");
                    if(sameDiag.includes([tile[0], tile[1] - 1, tile[2] + 1]))
                        return true;
                    if(sameDiag.includes([tile[0], tile[1] + 1, tile[2] + 1]))
                        return true;
                }
            }
        }
        if(sameCard.length == 0){
            //console.log("no guys")
            //console.log(tile);
            if(sameDiag.length > 0){
                return true;
            }
        }

        return false;
    }

    //Returns list of given neighbors that are the same type
    sameType(tile, neighbors){
        let same = [];
        for(let neighbor of neighbors){
            if(neighbor[0] == tile[0])
                same.push(neighbor);
        }
        return same;
    }

    //Returns list of given neighbors that are a different type
    differentType(tile, neighbors){
        let different = [];
        for(let neighbor of neighbors){
            if(neighbor[0] != tile[0])
                different.push(neighbor);
        }
        return different;
    }

    //=============================================== RANDOM STRUCTS LAYOUT CREATION ====================================================
    //Creates a layout with random structs with the given sectioned area and given struct specifications
    createStructs(rMin = 1, cMin = 1, rMax, cMax, maxStructs, maxTiles, complexity, size){
        let emergencyBreak = 70;
        let numStructs = 0;
        let numTiles = 0;

        let sectionTileLayout = this.createSectionTileLayout(rMin, cMin, rMax, cMax);
        //console.log(sectionTileLayout);

        //Fill the specified amount of the map
        while(numStructs < maxStructs && numTiles < maxTiles){
            let struct = this.structureManager.randomStruct(maxTiles * 1.5 - numTiles, rMax - rMin, cMax - cMin, "", "");
            let rRandom = getRandomInt(0, sectionTileLayout.length - struct.height);
            let cRandom = getRandomInt(0, sectionTileLayout[0].length - struct.width);
            let placedLayout = this.placeStruct(struct, rRandom , cRandom, sectionTileLayout);
            //console.log("-------");
            //console.log(struct.structure);
            //console.log(placedLayout);
            if(this.checkValid(placedLayout)){
                this.tileLayout = this.placeStruct(struct, rRandom + rMin, cRandom + cMin);
                sectionTileLayout = this.placeStruct(struct, rRandom , cRandom, sectionTileLayout);
                numTiles = this.numOfTileType(1, sectionTileLayout);
                numStructs++;
            }
            else{
                //console.log("cucked");
            }
            if(emergencyBreak <= 0)
                break;
            emergencyBreak--;
        }
    }

    //Creates a temporary sectioned tile layout of the given larger tile layout
    createSectionTileLayout(rMin, cMin, rMax, cMax, tileLayout = this.tileLayout){
        let sectionTileLayout = [];
        for(let r = rMin; r < rMax; r++){
            let row = [];
            for(let c = cMin; c < cMax; c++){
                row.push(tileLayout[r][c]);
                //console.log(tileLayout[r][c]);
            }
            sectionTileLayout.push(row);
        }
        return sectionTileLayout;
    }

    numOfTileType(tileType, tileLayout){
        let num = 0;
        for(let r = 0; r < tileLayout.length; r++){
            for(let c = 0; c < tileLayout[0].length; c++){
                if(tileLayout[r][c] == tileType)
                    num++;
            }
        }
        return num;
    }

    //Places a struct at the given row and column index of the given level layout
    placeStruct(struct, rIndex, cIndex, tileLayout = this.tileLayout){
        let placedLayout = duplicate(tileLayout);
        for(let r = 0; r < struct.height; r++){
            for(let c = 0; c < struct.width; c++){
                if(struct.structure[r][c] == 1){
                    placedLayout[r + rIndex][c + cIndex] = 1;
                }
            }
        }
        return placedLayout;
    }
}

class StructureManager{
    constructor(){
        this.structs = [];

        this.flats = [];
        this.corners = [];
        this.ends = [];
        this.crosses = [];

        this.basicStructs = [];
        this.complexStructs = [];
        this.smallStructs = [];
        this.bigStructs = [];

        this.horizontals = [];
        this.verticals = [];
        this.fullScreens = [];

        this.setupStructs();
    }

    randomStruct(maxTileSize = 99, maxHeight, maxWidth, complexity, size, orientation){
        if(maxTileSize < 2){
            maxTileSize = 2;
        }

        let possibleStructs = [];
        if(complexity != "basic"){
            for(let complex of this.complexStructs){
                if(complex.width <= maxWidth && complex.height <= maxHeight){
                    possibleStructs.push(complex);
                }
            }
        }
        if(complexity != "complex"){
            for(let basic of this.basicStructs){
                if(basic.width <= maxWidth && basic.height <= maxHeight){
                    possibleStructs.push(basic);
                }
            }
        }

        if(size != "small"){
            for(let big of this.bigStructs){
                if(big.width <= maxWidth && big.height <= maxHeight){
                    possibleStructs.push(big);
                }
            }
        }
        else if(size != "big"){
            for(let small of this.smallStructs){
                if(small.width <= maxWidth && small.height <= maxHeight){
                    possibleStructs.push(small);
                }
            }
        }

        if(orientation == "horizontal"){
            if(orientation == "vertical"){
                if(getRandomInt(0,2) != 0)
                    return this.fullScreens[getRandomInt(0, this.fullScreens.length)];
            }
            if(getRandomInt(0,2) != 0)
                return this.horizontals[getRandomInt(0, this.horizontals.length)];
        }
        if(orientation == "vertical"){
            if(getRandomInt(0,2) != 0)
                return this.verticals[getRandomInt(0, this.verticals.length)];
        }

        //console.log(maxWidth + " " + maxHeight);
        let struct = possibleStructs[getRandomInt(0, possibleStructs.length)];
        return struct;
    }

    setupStructs(){
        this.setupFlats();
        this.setupCorners();
        this.setupEnds();
        this.setupCrosses();

        for(let flat of this.flats){
            flat.complex = false;
            this.basicStructs.push(flat);
            //flat.complexity = "basic";
        }
        for(let corner of this.corners){
            corner.complex = false;
            this.basicStructs.push(corner);
            //corner.complexity = "basic";
        }
        for(let end of this.ends){
            end.complex = true;
            this.complexStructs.push(end);
            //end.complexity = "complex";
        }
        for(let cross of this.crosses){
            cross.complex = true;
            this.complexStructs.push(cross);
        }

        this.structs = this.flats.concat(this.corners, this.ends, this.crosses);

        for(let struct of this.structs){
            let structure = struct.structure;
            for(let r = 0; r < structure.length; r++){
                for(let c = 0; c < structure[r].length; c++){
                    if(structure[r][c] == 1)
                        struct.numTiles++;
                }
            }

            if(struct.numTiles > 7){
                struct.size = "big";
                this.bigStructs.push(struct);
            }
            else if(struct.numTiles <= 7){
                struct.size = "small";
                this.smallStructs.push(struct);
            }
            
            if(struct.width > 8){
                struct.horizontalOnly = true;
                this.horizontals.push(struct);
            }
            if(struct.height > 5){
                struct.verticalOnly = true;
                this.verticals.push(struct);
            }
            if(struct.verticalOnly && struct.horizontalOnly){
                this.fullScreen.push(struct);
            }
        }
        //console.log(this.structs[getRandomInt(0, this.structs.length)]);
    }

    setupFlats(){
        let one = new Structure([
            [1]
        ]);
        let two = new Structure([
            [1,1]
        ]);
        let three = new Structure([
            [1,1,1]
        ]);
        let four = new Structure([
            [1,1,1,1]
        ]);
        let five = new Structure([
            [1,1,1,1,1]
        ]);
        let six = new Structure([
            [1,1,1,1,1,1]
        ]);

        //this.flats.push(one);
        this.flats.push(two);
        this.flats.push(three);
        this.flats.push(four);
        this.flats.push(five);
        this.flats.push(six);

        let tempFlats = duplicate(this.flats);
        for(let flat of tempFlats){
            //console.log(flat);
            for(let rotation of this.createRotations(flat.structure)){
                this.flats.push(rotation);
            }
        }
    }

    setupCorners(){
        let twoXtwo = new Structure([
            [1,1],
            [1,0]
        ]);
        let twoXthree = new Structure([
            [1,1,1],
            [1,0,0]
        ]);
        let twoXfour = new Structure([
            [1,1,1,1],
            [1,0,0,0]
        ]);
        let twoXfive = new Structure([
            [1,1,1,1,1],
            [1,0,0,0,0]
        ]);
        let twoXsix = new Structure([
            [1,1,1,1,1,1],
            [1,0,0,0,0,0]
        ]);

        let threeXthree = new Structure([
            [1,1,1],
            [1,0,0],
            [1,0,0]
        ]);
        let threeXfour = new Structure([
            [1,1,1,1],
            [1,0,0,0],
            [1,0,0,0]
        ]);
        let threeXfive = new Structure([
            [1,1,1,1,1],
            [1,0,0,0,0],
            [1,0,0,0,0]
        ]);
        let threeXsix = new Structure([
            [1,1,1,1,1,1],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0]
        ]);

        let fourXfour = new Structure([
            [1,1,1,1],
            [1,0,0,0],
            [1,0,0,0],
            [1,0,0,0]
        ]);
        let fourXfive = new Structure([
            [1,1,1,1,1],
            [1,0,0,0,0],
            [1,0,0,0,0],
            [1,0,0,0,0]
        ]);
        let fourXsix = new Structure([
            [1,1,1,1,1,1],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0]
        ]);

        let fiveXfive = new Structure([
            [1,1,1,1,1],
            [1,0,0,0,0],
            [1,0,0,0,0],
            [1,0,0,0,0],
            [1,0,0,0,0]
        ]);
        let fiveXsix = new Structure([
            [1,1,1,1,1,1],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0]
        ]);

        let sixXsix = new Structure([
            [1,1,1,1,1,1],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0]
        ]);

        this.corners.push(twoXtwo);
        this.corners.push(twoXthree);
        this.corners.push(twoXfour);
        this.corners.push(twoXfive);
        this.corners.push(twoXsix);

        this.corners.push(threeXthree);
        this.corners.push(threeXfour);
        this.corners.push(threeXfive);
        this.corners.push(threeXsix);

        this.corners.push(fourXfour);
        this.corners.push(fourXfive);
        this.corners.push(fourXsix);

        this.corners.push(fiveXfive);
        this.corners.push(fiveXsix);

        this.corners.push(sixXsix);
        
        let tempCorners = duplicate(this.corners);
        for(let corner of tempCorners){
            for(let rotation of this.createRotations(corner.structure)){
                this.corners.push(rotation);
            }
        }
    }

    setupEnds(){
        let oneXtwoGap = new Structure([
            [1,1,1,1],
            [1,0,0,1]
        ]);
        let oneXthreeGap = new Structure([
            [1,1,1,1,1],
            [1,0,0,0,1]
        ]);
        let oneXfourGap = new Structure([
            [1,1,1,1,1,1],
            [1,0,0,0,0,1]
        ]);

        let twoXtwoGap = new Structure([
            [1,1,1,1],
            [1,0,0,1],
            [1,0,0,1]
        ]);
        let twoXthreeGap = new Structure([
            [1,1,1,1,1],
            [1,0,0,0,1],
            [1,0,0,0,1]
        ]);
        let twoXfourGap = new Structure([
            [1,1,1,1,1,1],
            [1,0,0,0,0,1],
            [1,0,0,0,0,1]
        ]);

        let threeXtwoGap = new Structure([
            [1,1,1,1],
            [1,0,0,1],
            [1,0,0,1],
            [1,0,0,1]
        ]);
        let threeXthreeGap = new Structure([
            [1,1,1,1,1],
            [1,0,0,0,1],
            [1,0,0,0,1],
            [1,0,0,0,1]
        ]);
        let threeXfourGap = new Structure([
            [1,1,1,1,0,1],
            [1,0,0,0,0,1],
            [1,0,0,0,0,1],
            [1,0,0,0,0,1]
        ]);
        
        this.ends.push(oneXtwoGap);
        this.ends.push(oneXthreeGap);
        this.ends.push(oneXfourGap);

        this.ends.push(twoXtwoGap);
        this.ends.push(twoXthreeGap);
        this.ends.push(twoXfourGap);

        this.ends.push(threeXtwoGap);
        this.ends.push(threeXthreeGap);
        this.ends.push(threeXfourGap);
        
        let tempEnds = duplicate(this.ends);

        for(let end of tempEnds){
            for(let rotation of this.createRotations(end.structure)){
                this.ends.push(rotation);
            }
        }
    }

    setupCrosses(){
        let threeCross = new Structure([
            [0,1,0],
            [1,1,1],
            [0,1,0]
        ]);
        let fourSplit = new Structure([
            [0,0,1,0],
            [1,1,1,1],
            [0,1,0,0]
        ]);
        let fiveCross = new Structure([
            [0,0,1,0,0],
            [1,1,1,1,1],
            [0,0,1,0,0]
        ]);
        let fiveGap = new Structure([
            [0,0,0,1,0],
            [1,1,1,1,1],
            [0,1,0,0,0]
        ]);
        let fiveSplitA = new Structure([
            [0,0,1,0,0],
            [1,1,1,1,1],
            [0,1,0,0,0]
        ]);
        let fiveSplitB = new Structure([
            [0,0,0,1,0],
            [1,1,1,1,1],
            [0,0,1,0,0]
        ]);
        let sixSplit = new Structure([
            [0,0,0,1,0,0],
            [1,1,1,1,1,1],
            [0,0,1,0,0,0]
        ]);
        let sixSplitC = new Structure([
            [0,0,0,1,0,0],
            [0,0,0,1,0,0],
            [1,1,1,1,1,1],
            [0,0,1,0,0,0],
            [0,0,1,0,0,0]
        ]);

        this.crosses.push(threeCross);

        this.crosses.push(fourSplit);

        this.crosses.push(fiveCross);
        this.crosses.push(fiveGap);
        this.crosses.push(fiveSplitA);
        this.crosses.push(fiveSplitB);

        this.crosses.push(sixSplit);
        this.crosses.push(sixSplitC);
        
        let tempCrosses = duplicate(this.crosses);
        for(let cross of tempCrosses){
            //console.log(flat);
            for(let rotation of this.createRotations(cross.structure)){
                this.crosses.push(rotation);
            }
        }
    }

    createRotations(structure){
        let rotation;
        let rotations = [];

        let tempArr = duplicate(structure);
        let rotatedArr = [];
        for(let c = 0; c < structure[0].length; c++){
            rotatedArr.push([0]);
            for(let r = structure.length - 1; r >= 0; r--){
                rotatedArr[c][structure.length - 1 - r] = structure[r][c];
            }
        }
        rotation = new Structure(rotatedArr);
        rotations.push(rotation);

        tempArr = duplicate(rotatedArr);
        rotatedArr = [];
        for(let c = 0; c < tempArr[0].length; c++){
            rotatedArr.push([0]);
            for(let r = tempArr.length - 1; r >= 0; r--){
                rotatedArr[c][tempArr.length - 1 - r] = tempArr[r][c];
            }
        }
        rotation = new Structure(rotatedArr);
        rotations.push(rotation);

        tempArr = duplicate(rotatedArr);
        rotatedArr = [];
        for(let c = 0; c < tempArr[0].length; c++){
            rotatedArr.push([0]);
            for(let r = tempArr.length - 1; r >= 0; r--){
                rotatedArr[c][tempArr.length - 1 - r] = tempArr[r][c];
            }
        }
        rotation = new Structure(rotatedArr);
        rotations.push(rotation);

        // console.log(structure);
        // console.log(rotations);
        return rotations;
    }
}

class Structure{
    constructor(structure, x = 0, y = 0){
        this.baseStructure = structure;
        this.structure = structure;

        this.x = x;
        this.y = y;
        this.height = structure.length;
        this.width = structure[0].length;

        this.numTiles = 0;
        this.size = "";
        this.complex;
        this.complexity = "";
        this.orientation = "";

        this.horizontalOnly = false;
        this.verticalOnly = false;
    }
}