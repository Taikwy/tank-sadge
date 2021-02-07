class SceneManager{
    constructor(stage){
        this.currentScene;
        this.nextScene;
        this.previousScene;

        

        this.scenes = [];
        this.overlays = [];

        this.stage = stage;

        this.blankOverlay = new PIXI.Container();
        this.blankOverlay.visible = false;
        stage.addChild(this.blankOverlay);
        this.overlays.push(this.blankOverlay);

        this.currentOverlay = this.blankOverlay;
    }

    updateScene(newScene){
        for(let scene of this.scenes){
            scene.visible = false;
        }
        this.currentScene = newScene;
        newScene.visible = true;

        stage.removeChild(trail.rope);
        stage.addChild(trail.rope);
    }

    updateOverlay(newOverlay){
        this.stage.addChild(newOverlay);
        this.stage.removeChild(this.currentOverlay);
        for(let scene of this.scenes){
            if(this.currentScene != scene)
                scene.visible = false;
        }
        this.currentOverlay = newOverlay;
        newOverlay.visible = true;

        stage.removeChild(trail.rope);
        stage.addChild(trail.rope);
    }
}

class GameScene extends PIXI.Container{
    constructor(stage){
        super();
        this.stage = stage;

        this.currentMode = "";
        this.currentStatus = "";

        //this.layoutType = ["random", "structs"];
        this.layoutType = ["structs"];
        this.symmetryType = ["horizontal", "vertical", "both", "diagonal"];

        this.ui = new UIOverlay();
        this.addChild(this.ui);


        this.levelFailOverlay = new LevelFailOverlay();
        this.levelFailOverlay.visible = false;
        sceneManager.overlays.push(this.levelFailOverlay);

        this.levelClearOverlay = new LevelClearOverlay();
        this.levelClearOverlay.visible = false;
        sceneManager.overlays.push(this.levelClearOverlay);

        this.modeCompleteOverlay = new ModeCompleteOverlay();
        this.modeCompleteOverlay.visible = false;
        sceneManager.overlays.push(this.modeCompleteOverlay);

        this.pauseOverlay = new PauseOverlay();
        this.pauseOverlay.visible = false;
        sceneManager.overlays.push(this.pauseOverlay);
    }

    resetUI(){
        this.ui = new UIOverlay();
        //this.addChild(this.ui);
    }

    startMode(){
        cleanLevel();

        this.currentStatus = "play";
        playerTank.isAlive = true;

        switch(this.currentMode){
            case "random":
                playerTank.maxHealth = 3;
                playerTank.currentHealth = 3;
                break;
            case "tutorial":
                playerTank.maxHealth = 5;
                playerTank.currentHealth = playerTank.maxHealth;
                break;
        }

        levelManager.levelNumber = 1;
        levelManager.symmetryType = this.symmetryType[getRandomInt(0, this.symmetryType.length)];
        levelManager.layoutType = "structs";
        
        levelManager.maxEnemies = 5;
        levelManager.threatLevel = levelManager.levelNumber*10;
        levelManager.createLevel(this.currentMode);

        this.ui.resetDisplay();
    }

    levelFail(){
        this.currentStatus = "paused";
        paused = true;

        switch(this.currentMode){
            case "random":
                //this.stage.addChild(this.levelFailOverlay);
                sceneManager.updateOverlay(this.levelFailOverlay);
                break;
            case "tutorial":
                //this.stage.addChild(this.levelFailOverlay);
                sceneManager.updateOverlay(this.levelFailOverlay);
                break;
        }
    }

    levelClear(){
        this.currentStatus = "paused";
        paused = true;

        //this.stage.addChild(this.levelClearOverlay);
        sceneManager.updateOverlay(this.levelClearOverlay);
    }

    nextLevel(){
        this.currentStatus = "play";
        cleanLevel();

        levelManager.levelNumber++;                
        levelManager.symmetryType = this.symmetryType[getRandomInt(0, this.symmetryType.length)];

        //levelManager.maxEnemies = 3;
        levelManager.threatLevel = levelManager.levelNumber*10;

        //Every 3 levels increase the threat index for enemies
        if(levelManager.levelNumber%5 == 0){
            levelManager.threatIndex++;
        }
        //10th level
        if(levelManager.levelNumber%10 == 0){
            levelManager.layoutDifficulty++;
            levelManager.createLevel(this.currentMode);
        }
        else{
            levelManager.createLevel(this.currentMode);
        }
    }

    retryLevel(){
        this.currentStatus = "play";
        //console.log("retry");

        cleanLevel();

        playerTank.isAlive = true;
        playerTank.maxHealth--;
        playerTank.currentHealth = playerTank.maxHealth;

        switch(this.currentMode){
            case "random":
                //levelManager.levelNumber++;
                waveLabel.text = `Wave ${levelManager.levelNumber}`;
                levelManager.symmetryType = this.symmetryType[getRandomInt(0, this.symmetryType.length)];
                //levelManager.layoutType = this.layoutType[getRandomInt(0, this.layoutType.length)];
                
                levelManager.createLevel(this.currentMode);
                break;
            case "tutorial":
                //levelManager.levelNumber++;
                waveLabel.text = `Wave ${levelManager.levelNumber}`;
                levelManager.createLevel(this.currentMode);
                break;
        }
    }
}