class UIText extends PIXI.Text{
    constructor(text, fill, fontSize, fontFamily, x = 0, y = 0){
        super(text);
        this.style = new PIXI.TextStyle({
            fill: fill,
            fontSize: fontSize,
            fontFamily: fontFamily
        });
        this.x = x;
        this.y = y;
    }
}

class Button extends PIXI.Sprite{
    constructor(textures, x = 0, y = 0, clickedFunction){
        super(textures[0]);
        this.buttonDefault = textures[0];
        this.buttonOver = textures[1];
        this.buttonDown = textures[2];

        this.x = x;
        this.y = y;

        this.interactive = true;
        //this.buttonMode = true;

        this.isDown = false;
        this.isOver = false;
        this
            .on('pointerdown', this.onButtonDown)
            .on('pointerup', clickedFunction)
            .on('pointerupoutside', this.onButtonUp)
            .on('pointerover', this.onButtonOver)
            .on('pointerout', this.onButtonOut);
    }

    onButtonDown() {
        this.isDown = true;
        this.texture = this.buttonDown;
        console.log("button down");
    }
    
    onButtonUp() {
        this.isDown = false;
        if (this.isOver) {
            this.texture = this.buttonOver;
        } else {
            this.texture = this.buttonDefault;
        }
        console.log("button up");
    }
    
    onButtonOver() {
        this.isOver = true;
        if (this.isdown) {
            return;
        }
        this.texture = this.buttonOver;
    }
    
    onButtonOut() {
        this.isOver = false;
        if (this.isdown) {
            return;
        }
        this.texture = this.buttonDefault;
    }
}

class UIOverlay extends PIXI.Container{
    constructor(){
        super();
        this.bigNum = loadSpriteSheet("bignumbers.png", 0, 32, 52, 10);
        this.mediumNum = loadSpriteSheet("mediumnumbers.png", 0, 28, 52, 10);
        this.smallNum = loadSpriteSheet("smallnumbers.png", 0, 12, 20, 10);

        this.background = new PIXI.Sprite(loadSprite("ui background.png"));
        this.addChild(this.background);

        this.pauseButton = new Button(loadSpriteSheet("smallbuttons.png", 0, 100, 100, 3), 40, 12, this.pause);
        this.addChild(this.pauseButton);

        this.healthPoints;
        this.currentBullet = new PIXI.Sprite(loadSprite("ui bullet.png", 0, 60, 60, 60));
        this.currentBullet.x = 536;
        this.currentBullet.y = 32;
        this.addChild(this.currentBullet);

        this.setupTimer();
        this.setupFloorNumber();
    }

    pause(){
        gameScene.currentStatus = "paused";
        paused = true;
        //this.stage.addChild(gameScene.pauseOverlay);
        sceneManager.updateOverlay(gameScene.pauseOverlay);
    }

    resetDisplay(){
        this.healthPoints = [];   
        for(let i = 0; i < playerTank.maxHealth; i++){
            let hp = new PIXI.Sprite(loadSprite("tankheart.png"));
            hp.x = 172 + (i * (44 + 8));
            hp.y = 52;
            if(i > 3)
                hp.visible = false;
            this.healthPoints.push(hp);
            this.addChild(hp);
        }
    }

    updateDisplay(){
        //waveLabel.text = `Wave ${levelManager.levelNumber}`;

        for(let i = 0; i < this.healthPoints.length; i++){
            if(i + 1 > playerTank.currentHealth){
                this.healthPoints[i].visible = false;
            }
        }

        this.updateTimer();

        this.floorTens.texture = this.smallNum[0];
        this.floorOnes.texture = this.smallNum[0];
        this.levelTens.texture = this.smallNum[Math.floor(levelManager.levelNumber/10)];
        this.levelOnes.texture = this.smallNum[levelManager.levelNumber%10];
        console.log(levelManager.levelNumber%10);
    }

    setupFloorNumber(){
        this.floorTens = new PIXI.Sprite(this.smallNum[0]);
        this.floorOnes = new PIXI.Sprite(this.smallNum[0]);
        this.levelTens = new PIXI.Sprite(this.smallNum[0]);
        this.levelOnes = new PIXI.Sprite(this.smallNum[0]);

        this.addChild(this.floorTens);
        this.addChild(this.floorOnes);
        this.addChild(this.levelTens);
        this.addChild(this.levelOnes);

        let x = 1112;
        let y = 32;

        this.floorTens.x = x;
        this.floorOnes.x = x + 16;

        this.levelTens.x = x;
        this.levelOnes.x = x +16;

        this.floorTens.y = y;
        this.floorOnes.y = y;

        this.levelTens.y = y  + 32;
        this.levelOnes.y = y + 32;
    }

    setupTimer(){
        this.hundredth = new PIXI.Sprite(this.mediumNum[0]);
        this.tenth = new PIXI.Sprite(this.mediumNum[0]);
        this.ones = new PIXI.Sprite(this.bigNum[0]);
        this.tens = new PIXI.Sprite(this.bigNum[0]);
        this.hundreds = new PIXI.Sprite(this.bigNum[0]);

        this.addChild(this.hundredth);
        this.addChild(this.tenth);
        this.addChild(this.ones);
        this.addChild(this.tens);
        this.addChild(this.hundreds);

        let x = 752;
        let y = 40;
        this.hundredth.x = x + 168;
        this.tenth.x = x + 132;
        this.ones.x = x + 80;
        this.tens.x = x + 40;
        this.hundreds.x = x;

        this.hundredth.y = y + 12;
        this.tenth.y = y+ 12;
        this.ones.y = y;
        this.tens.y = y;
        this.hundreds.y = y;
    }

    updateTimer(){
        let temp = parseFloat((levelManager.timeElapsed)/1000).toFixed(2);
        while(temp.length < 6)
            temp = 0 + temp;
        
        this.hundredth.texture = this.mediumNum[temp[5]];
        this.tenth.texture = this.mediumNum[temp[4]];

        this.ones.texture = this.bigNum[temp[2]];
        this.tens.texture = this.bigNum[temp[1]];
        this.hundreds.texture = this.bigNum[temp[0]];
    }
}

class PauseOverlay extends PIXI.Container{
    constructor(currentMode = ""){
        super();
        this.currentMode = currentMode;
        this.alpha = 100;

        this.addChild(new PIXI.Sprite(loadSprite("alpha background.png")));

        this.menuButton = new Button(loadSpriteSheet("buttons.png", 1, 208, 100, 3), 494, 550, this.backToMenu);
        this.addChild(this.menuButton);

        this.resumeButton = new Button(loadSpriteSheet("buttons.png", 4, 268, 100, 3), 464, 404, this.resume);
        this.addChild(this.resumeButton);
    }

    backToMenu(){
        sceneManager.updateOverlay(sceneManager.blankOverlay);
        sceneManager.updateScene(mainMenuScene);
    }

    resume(){
        if(paused || gameScene.currentStatus == "paused"){
            gameScene.currentStatus = "play";
        }
        else{
            gameScene.currentStatus = "paused";
            paused = true;
        }
        sceneManager.updateOverlay(sceneManager.blankOverlay);
    }
}

class LevelFailOverlay extends PIXI.Container{
    constructor(currentMode = ""){
        super();
        this.currentMode = currentMode;

        this.addChild(new PIXI.Sprite(loadSprite("alpha background.png")));

        this.menuButton = new Button(loadSpriteSheet("buttons.png", 1, 208, 100, 3), 494, 550, this.backToMenu);
        this.addChild(this.menuButton);

        this.retryButton = new Button(loadSpriteSheet("buttons.png", 2, 232, 100, 3), 478, 404, this.retryLevel);
        this.addChild(this.retryButton);
    }

    backToMenu(){
        //gameScene.nextLevel();
        sceneManager.updateOverlay(sceneManager.blankOverlay);
        sceneManager.updateScene(mainMenuScene);
    }

    retryLevel(){
        if(playerTank.maxHealth > 1 || gameScene.currentMode == "tutorial"){
            gameScene.retryLevel();
            sceneManager.updateOverlay(sceneManager.blankOverlay);
        }
        //sceneManager.updateScene(mainMenuScene);
    }
}

class LevelClearOverlay extends PIXI.Container{
    constructor(currentMode = ""){
        super();        
        this.currentMode = currentMode;

        this.addChild(new PIXI.Sprite(loadSprite("alpha background.png")));

        this.nextLevelButton = new Button(loadSpriteSheet("buttons.png", 3, 208, 100, 3), 494, 550, this.nextLevel);
        this.addChild(this.nextLevelButton);
    }

    nextLevel(){
        gameScene.nextLevel();
        sceneManager.updateOverlay(sceneManager.blankOverlay);
    }
}

class ModeCompleteOverlay extends PIXI.Container{
    constructor(currentMode = ""){
        super();        
        this.currentMode = currentMode;

        this.addChild(new PIXI.Sprite(loadSprite("alpha background.png")));

        this.menuButton = new Button(loadSpriteSheet("buttons.png", 1, 208, 100, 3), 450, 650, this.backToMenu);
        this.addChild(this.menuButton);
    }

    backToMenu(){
        //gameScene.nextLevel();
        sceneManager.updateOverlay(sceneManager.blankOverlay);
        sceneManager.updateScene(mainMenuScene);
    }
}