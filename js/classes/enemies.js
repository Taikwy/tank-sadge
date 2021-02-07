
class EnemyManager{
    constructor(width = 0, height = 0, xOffset = 0, yOffset = 0){
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.width = width;
        this.height = height;

        this.numEnemies = 0;
        this.threatLevel = 0;

        this.enemyPrefabs = [];
        this.enemyTypes = [11, 12, 13, 21, 22, 23, 24];
        this.enemyThreat = [10, 12, 15, 20, 25, 30, 35];
        this.possibleEnemies = [];
        this.appearedEnemies = [];
        this.levelEnemies = [];

        this.enemyArray = [[]];
        this.enemies = [];

        this.sectionOne;
        this.sectionTwo;
        this.sectionThree;
        this.sectionFour;
        this.sectionFive;
        this.sectionNumEnemies = [];

        this.setupEnemies();
    }

    setupEnemies(){
        let tankSprite = loadSpriteSheet("bodies.png", 1, 40, 40, 4);
        let treadSprite = loadSpriteSheet("treads.png", 1, 48, 48, 4);
        let turretSprite = loadSprite("turrets.png", 0, 64*1, 64, 64);

        this.enemyPrefabs["gray"] = [tankSprite, treadSprite, turretSprite, 50, "slow"];

        tankSprite = loadSpriteSheet("bodies.png", 2, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 1, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*2, 64, 64);

        this.enemyPrefabs["darkGray"] = [tankSprite, treadSprite, turretSprite, 50, "basicPlus"];

        tankSprite = loadSpriteSheet("bodies.png", 3, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 1, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*3, 64, 64);

        this.enemyPrefabs["brown"] = [tankSprite, treadSprite, turretSprite, 80, "basic"];

        tankSprite = loadSpriteSheet("bodies.png", 4, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 0, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*4, 64, 64);

        this.enemyPrefabs["green"] = [tankSprite, treadSprite, turretSprite, 80, "basic"];

        tankSprite = loadSpriteSheet("bodies.png", 5, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 0 , 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*5, 64, 64);

        this.enemyPrefabs["pine"] = [tankSprite, treadSprite, turretSprite, 100, "basicPlus"];

        tankSprite = loadSpriteSheet("bodies.png", 6, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 1, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*6, 64, 64);

        this.enemyPrefabs["blackGreen"] = [tankSprite, treadSprite, turretSprite, 125, "basicPlusPlus"];

        tankSprite = loadSpriteSheet("bodies.png", 7, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 2, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*7, 64, 64);

        this.enemyPrefabs["orange"] = [tankSprite, treadSprite, turretSprite, 80, "rocket"];

        tankSprite = loadSpriteSheet("bodies.png", 8, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 3, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*8, 64, 64);

        this.enemyPrefabs["teal"] = [tankSprite, treadSprite, turretSprite, 100, "rocket"];

        // tankSprite = loadSpriteSheet("bodies.png", 9, 40, 40, 4);
        // treadSprite = loadSpriteSheet("treads.png", 3, 48, 48, 4);
        // turretSprite = loadSprite("turrets.png", 0, 64*9, 64, 64);

        // this.enemyPrefabs["darkTeal"] = [tankSprite, treadSprite, turretSprite, 0];
    }

    setSections(){
        this.sectionOne = [];
        this.sectionTwo = [];
        this.sectionThree = [];
        this.sectionFour = [];
        this.sectionFive = [];
        for(let r = 1; r < 7; r++){
            let row = [];
            for(let c = 1; c < 7; c++){
                row.push(levelManager.tileArray[r][c]);
            }
            this.sectionOne.push(row);
        }
        for(let r = 1; r < 6; r++){
            let row = [];
            for(let c = 7; c < 11; c++){
                row.push(levelManager.tileArray[r][c]);
            }
            this.sectionTwo.push(row);
        }
        for(let r = 1; r < 6; r++){
            let row = [];
            for(let c = 11; c < 17; c++){
                row.push(levelManager.tileArray[r][c]);
            }
            this.sectionThree.push(row);
        }
        for(let r = 6; r < 11; r++){
            let row = [];
            for(let c = 7; c < 11; c++){
                row.push(levelManager.tileArray[r][c]);
            }
            this.sectionFour.push(row);
        }
        for(let r = 6; r < 11; r++){
            let row = [];
            for(let c = 11; c < 17; c++){
                row.push(levelManager.tileArray[r][c]);
            }
            this.sectionFive.push(row);
        }
    }

    setEnemies(enemyArray){
        this.resetEnemies();
        this.enemyArray = enemyArray;
        this.createEnemies();
    }

    spawnEnemies(threatLevel, threatIndex){
        this.resetEnemies();
        this.setSections();

        //console.log(threatLevel + " " + maxEnemies + " " + threatIndex);
        
        let numEnemies = 0;
        let currentThreat = 0;

        while(currentThreat < threatLevel){
            let r = getRandomInt(1, this.height-1);
            let c = getRandomInt(1, this.width-1);
            //console.log(r + " " + c);
            if(c > 5 || r < 7){
                if(levelManager.tileArray[r][c] == 0){
                    let index = getRandomInt(0, this.enemyTypes.length);
                    let enemyType = this.enemyTypes[index];
                    while(true){
                        //console.log(enemyType);
                        //console.log(Math.floor(enemyType/10));

                        if(Math.floor(enemyType/10) <= threatIndex){
                            if(threatIndex - Math.floor(enemyType/10) < 2){
                                if(this.appearedEnemies.includes(this.enemyTypes[index - 1])){
                                    break;
                                }
                                if(index == 0){
                                    break;
                                }
                            }
                        }
                        //console.log("rip");
                        index = getRandomInt(0, this.enemyTypes.length);
                        enemyType = this.enemyTypes[index];
                        //console.log(index);
                    }

                    this.enemyArray[r][c] = enemyType;
                    this.levelEnemies.push(enemyType);
                    //console.log(enemyType);

                    currentThreat += this.enemyThreat[index];
                    numEnemies++;
                }
            }
            //console.log("bruh");
        }
        for(let enemy of this.levelEnemies){
            this.appearedEnemies.push(enemy);
        }

        this.createEnemies();
        return this.enemyArray;
    }

    resetEnemies(){
        this.levelEnemies = [];

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

        this.enemies = [];
        this.grays = [];
        this.browns = [];
        this.greens = [];
        this.darkGrays = [];
        this.oranges = [];
        this.pines = [];
        this.blues = [];
    }

    createEnemies(){
        for (let r = 0; r < this.height; r ++) {
            for (let c = 0; c < this.width; c ++) {
                switch(this.enemyArray[r][c]){
                    case 11:
                        this.createTank("gray", c, r);
                        break;
                    case 12:
                        this.createTank("brown", c, r);
                        break;
                    case 13:
                        this.createTank("green", c, r);
                        break;
                    case 21:
                        this.createTank("darkGray", c, r);
                        break;
                    case 22:
                        this.createTank("orange", c, r);
                        break;
                    case 23:
                        this.createTank("pine", c, r);
                        break;
                    case 24:
                        this.createTank("teal", c, r);
                        break;
                    case 31:
                        this.createTank("blackGreen", c, r);
                        break;
                }
            }
        }
    }

    createTank(color, x = 0, y = 0){
        let et = new EnemyTank(this.enemyPrefabs[color], 0,0);
        et.changeDirection();
        levelManager.setPosition(et, x, y);
        enemyTanks.push(et);
        gameScene.addChild(et.tread);
        gameScene.addChild(et);
        gameScene.addChild(et.turret); 

        console.log("enemy spawned");
    }
}

//Enemy tank
class EnemyTank extends Tank{
    constructor(enemyPrefab, x=0, y=0){
        super(enemyPrefab[0], enemyPrefab[1], enemyPrefab[2], x, y, 1);
        this.animations["move"] = enemyPrefab[0];
        
        // movementsd
        this.speed = enemyPrefab[3];        
        this.changeDuration = 1;
        this.maxDuration = Math.random()*2.5+.5;
        this.changeTimer = this.changeDuration;

        //attack stuffs
		this.isAttacking = false;
		this.attackDuration = 2+Math.random()*2;
        this.attackTimer = this.attackDuration; 

        this.bulletType = enemyPrefab[4];
        //More sounds
        this.loadSounds();
    }

    initialUpdate(dt= 1/60, xPos, yPos){
        this.tempBehavior(dt);
        super.initialUpdate(dt, xPos, yPos);
    }

    physicsUpdate(dt = 1/60){
        for(let t of tileManager.tiles){
            if(handleCollisions(this.tread,t)){
                this.x = this.tread.x;
                this.y = this.tread.y;
            }
            //handleCollisions(this, t);

            // if(rectColl(this,t)){
            //     // this.reflectX();
            //     // this.reflectY();
            //     // this.move(dt);
            // }
        }    
        for(let et of enemyTanks){
            if(this != et){
                AABBCollisions(this,et);
            }
        }

        // if(handleCollisions(playerTank, this)){
        //     console.log("j");
        // }
        if(handleCollisions(playerTank.tread,this.tread)){
            console.log("y");
            playerTank.x = playerTank.tread.x;
            playerTank.y = playerTank.tread.y;
        }
        
        //rectColl(playerTank, this);
    }

    move(dt = 1/60){
        this.updateMovement(dt);
        super.move(dt);
    }

    updateMovement(dt = 1/60){
        this.changeTimer -= dt;
        if(this.changeTimer <= 0){
            this.changeDirection();
            this.changeTimer = this.maxDuration*Math.random();
        }
    }

    changeDirection(){
        let newDir = Math.random()*4;
        if(newDir>3){
            this.dx = 1;
            this.dy = 0;
        }
        else if(newDir>2){
            this.dx = -1;
            this.dy = 0;
        }
        else if(newDir>1){
            this.dx = 0;
            this.dy = 1;
        }
        else{
            this.dx = 0;
            this.dy = -1;
        }
    }

    tempBehavior(dt = 1/60){
        this.attackTimer -= dt;
        if(this.attackTimer <= 0)
        {
            this.fireBullet();
        }
    }

    reflectX(){
        this.dx *= -1;
    }

    reflectY(){
        this.dy *= -1;
    }

    fireBullet(){
        let b;
        switch(this.bulletType){
            case "slow":
                b = new SlowBullet(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
            case "basic":
                b = new BasicBullet(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
            case "basicPlus":
                b = new BasicPlus(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
            case "basicPlusPlus":
                b = new BasicPlusPlus(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
            case "small":
                b = new SmallBullet(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
            case "rocket":
                b = new Rocket(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
        }
        bullets.push(b);
        enemyBullets.push(b);
        gameScene.addChild(b);

        this.attackTimer = this.attackDuration;
        this.sounds["shoot"].play();
    }

    updateAnim(){
        //Idle anim
        if(this.dx == 0 && this.dy == 0){
            this.tread.stop();
        }
        //Up anim
        else if (this.dy < 0) {
            this.angle = 180;
            this.tread.angle = 180;
            this.tread.play();
        }    
        //Down anim
        else if (this.dy > 0) {
            this.angle = 0;
            this.tread.angle = 0;
            this.tread.play();
        }
        //Left anim
        else if (this.dx < 0) {
            this.angle = 90;
            this.tread.angle = 90;
            this.tread.play();
        }
        //Right anim
        else if (this.dx > 0) {
            this.angle = -90;
            this.tread.angle = -90;
            this.tread.play();
        }
    }
}