
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const selectionModal =document.getElementById('selection-modal');
const closeModalBtn = document.getElementById('close-selection-modal');

const gameModal =document.getElementById('game-container');
const closeGameBtn = document.getElementById('close-game-modal');

const startGameBtn = document.getElementById('play-button')


const choseLexBtn = document.getElementById('lex');
const choseNemoBtn = document.getElementById('nemo');
const choseCroBtn = document.getElementById('cro');
const choseFinnBtn = document.getElementById('finn');

const drawGameOver = () => {
    let text = 'GAME OVER'
    ctx.fillStyle = "white"
    ctx.font = "70px Arial"
    ctx.fillText(text, 40,200)
    setTimeout(function() {
        gameOverSound.play()
        }, 2000);
    setTimeout(function() {
        gameUpdateStop = true
        }, 1000);
    }

// IMAGE-COLLECTION:
const backgrImg = new Image();
backgrImg.src = "../images/finalback.jpg"

let fishImg = new Image();
fishImg.src = "../images/fish-fin.png"
let fishImgHurt = new Image();
fishImgHurt.src = "../images/fish-hurt.png"

let clownImg = new Image();
clownImg.src = "../images/clown-fish.png"
let clownImgHurt = new Image();
clownImgHurt.src = "../images/clownfish-hurt.png"

let lexImg = new Image();
lexImg.src = "../images/yellow-fish.png"
let lexImgHurt = new Image();
lexImgHurt.src =  "../images/yellow-fish-hurt.png"

let pinkImg = new Image();
pinkImg.src = "../images/pink-fish.png"
let pinkImgHurt = new Image();
pinkImgHurt.src = "../images/pink-fish-hurt.png"

const planBottImg = new Image();
planBottImg.src = "../images/seaweedup1.png"

const planTopImg = new Image();
planTopImg.src = "../images/seaweeddown1.png"

let wormImg = new Image();
wormImg.src = "../images/worm.webp"

const eelImg = new Image();
eelImg.src = "../images/eel1.png"

const krakenImg = new Image();
krakenImg.src = "../images/kraken2.png"

const heartImg = new Image();
heartImg.src = "../images/heart.png"

const singleBubble = new Image();
singleBubble.scr = "../images/bubbles-original.png"

// SOUND-COLLECTION:
let hurtSound = new Audio('../sounds/hurt-sound.wav');
hurtSound.volume = 0.2;

let collectHeartSound = new Audio('../sounds/collectHeart.wav');
collectHeartSound.volume = 0.2;

let collectWormSound = new Audio('../sounds/collectWorm.wav');
collectWormSound.volume = 0.2;

let gameOverSound = new Audio('../sounds/gameOver.wav');
gameOverSound.volume = 0.2;

let levelUpSound = new Audio('../sounds/levelUp.wav');
levelUpSound.volume = 0.2;

let getCoughtSound = new Audio('../sounds/fishingLine.wav');
getCoughtSound.volume = 0.2;

// OBSTACLE-ARRAYS:

let plantBottomArr = [];
let wormCount = 0;
let score = 0;
let highScore;
let speed = 1;
let player; // lex, nemo, cro, finn
let playerImg;
let gameUpdateStop = false;




window.onload = () => {

    document.getElementById('start-button').onclick = () => {
        document.getElementById("selection-modal").classList.remove("hidden")
    } 
  
    closeModalBtn.addEventListener('click', () => {
        selectionModal.classList.add('hidden')
    })
    
    choseLexBtn.addEventListener('click', () => {
        selectionModal.classList.add('hidden')
        gameModal.classList.remove('hidden')
        playerImg = lexImg
        player = 'lex'
    })
    
    choseNemoBtn.addEventListener('click', () => {
        selectionModal.classList.add('hidden')
        gameModal.classList.remove('hidden')
        playerImg = fishImg
        player = 'nemo'
    })
    
    choseCroBtn.addEventListener('click', () => {
        selectionModal.classList.add('hidden')
        gameModal.classList.remove('hidden')
        playerImg = clownImg
        player = 'cro'
    })
    
    choseFinnBtn.addEventListener('click', () => {
        selectionModal.classList.add('hidden')
        gameModal.classList.remove('hidden')
        playerImg = pinkImg
        player = 'finn'
    })
    

    startGameBtn.onclick = () => {
        startGameBtn.id = 'pause-button'
        startGameBtn.innerText = 'PAUSE'
        console.log(startGameBtn)
        startGame();
    }
   

    function startGame() {
        console.log('Game started')

        const background = new Background
        const fish = new Fish
        const worm = new Worm
        const hook = new Hook
        const eel = new Eel
        const kraken = new Kraken
        const life = new Life
        const bubbles = new Bubble
        console.log(bubbles)

        let healthPoints = 10;
        let arrLengthPlant = 4;
        
        let level = 1;
        
        // let arrLengthEel = 1;

        startGameBtn.onclick = () => { 
            if (startGameBtn.id === 'pause-button') {
            pauseGame()
            startGameBtn.innerText = 'CONTINUE'
            startGameBtn.id = 'continue-button'}
            else {
                continueGame()
                startGameBtn.id = 'pause-button'
                startGameBtn.innerText = 'PAUSE'
            }
            console.log(startGameBtn.innerText)
        }
        

        document.addEventListener("keydown", (e) => {
            if (e.keyCode === 37){
                fish.moveForward()
                fish.draw()
            } else if (e.keyCode === 38){
                fish.moveUp()
                fish.draw()
            } else if (e.keyCode === 39){
                fish.moveBack()
                fish.draw()
            } else if (e.keyCode === 40){
                fish.moveDown()
                fish.draw()
            }
            })

        const levelUp = () => {
            console.log('levelUp')
            level ++
            speed += 0.3
            levelUpSound.play()
        }
        
        

        const checkCollectionWorm = () => {
        if (fish.contains(worm)){
            if (!worm.trap) {
            worm.x = 0
            worm.y = Math.floor(Math.random() * 130)
            worm.trap = Boolean(Math.round(Math.random()))
            hook.x = 0
            wormCount ++
            score += 200
            collectWormSound.play()
                if (score % 1000=== 0) {
                    levelUp()
                }
            } else if (worm.trap == true){
                fish.getPulledUp()
                worm.getPulledUp()
                hook.getPulledUp()
                getCoughtSound.play()
                gameOver()
                }
            } 
        }

        const checkCollectionLife = () => {
            if (fish.contains(life)){
                life.x = - 10000
                life.y = Math.floor(Math.random() * 300)+ 100
                if (healthPoints < 10) {
                    healthPoints ++
                    collectHeartSound.play()
                    }
                } 
            }

        const checkTrap = () => {
            if (worm.trap == false) {
                wormImg.src = "../images/worm.webp" 
                return
            } else {
                wormImg.src = "../images/worm(3).png"
                hook.h = worm.y
                hook.draw()
                hook.move()
            }
        }
        
        const checkCollisionPlant = () => {
            for (element of plantBottomArr) {
                if (fish.contains(element) && !fish.wounded){
                    healthPoints -= 1
                    fish.wounded = true
                    setTimeout(function(){
                            fish.wounded = false
                        }, 1000);
                    }
                }
        }
        const checkWound = () => {
                if (!fish.wounded) {
                switch(player) {
                    case 'nemo':
                        playerImg = fishImg
                        break;
                    case 'cro':
                        playerImg = clownImg
                        break;
                    case 'lex':
                        playerImg = lexImg
                        break;
                    case 'finn':
                        playerImg = pinkImg
                        break;
                    }
                } else {
                    hurtSound.play()
                    switch(player) {
                        case 'nemo':
                            playerImg = fishImgHurt
                            break;
                        case 'cro':
                            playerImg  = clownImgHurt
                            break;
                        case 'lex':
                            playerImg  = lexImgHurt
                            break;
                        case 'finn':
                            playerImg  = pinkImgHurt
                            break;
                        }
                }     
            } 

        const checkCollisionsEel = () => {
        if (fish.contains(eel) && !fish.wounded && !fish.gameStop) {
            healthPoints -= 2
            fish.wounded = true
                setTimeout(function(){
                        fish.wounded = false
                    }, 700);
                }
        }

        const checkCollisionsKraken = () => {
            if (fish.contains(kraken) && !fish.wounded && !fish.gameStop) {
                healthPoints -= 2
                fish.wounded = true
                    setTimeout(function(){
                            fish.wounded = false
                        }, 1000);
                    }
            }
        

        const drawScore = () => {
            ctx.fillStyle = "white"
            ctx.font = "24px Arial"
            ctx.fillText(`Score: ${score}`, 840,40)
        }

        const drawHealth = () => {
            ctx.fillStyle = "white"
            ctx.font = "24px Arial"
            ctx.fillText(`Health: ${healthPoints}`, 440,40)
        }

        const drawLevel = () => {
            ctx.fillStyle = "white"
            ctx.font = "24px Arial"
            ctx.fillText(`Level ${level}`, 640,40)
        }


        const gameOver = () => {
            background.gameStop = true
            fish.gameStop = true
            worm.gameStop = true
            hook.gameStop = true
            eel.gameStop = true
            life.gameStop = true
            kraken.gameStop = true
            bubbles.gameStop = true
            plantBottomArr.forEach(el => {
                el.gameStop = true
                })
            plantBottomArr = []
            startGameBtn.classList.add("hidden")
        }
        

        const pauseGame = () => {
            background.gameStop = true
            fish.gameStop = true
            worm.gameStop = true
            hook.gameStop = true
            eel.gameStop = true
            life.gameStop = true
            kraken.gameStop = true
            bubbles.gameStop = true
            plantBottomArr.forEach(el => {
                el.gameStop = true
                })
        }

        const continueGame= () => {
            background.gameStop = false
            fish.gameStop = false
            worm.gameStop = false
            hook.gameStop = false
            eel.gameStop = false
            life.gameStop = false
            kraken.gameStop = false
            bubbles.gameStop = false
            plantBottomArr.forEach(el => {
                el.gameStop = false
                })
        }

        const createSeaweed = () => {
            while (arrLengthPlant > 0) {
                const plantBottom = new SeaweedBottom
                const plantTop = new SeaweedTop
                plantBottomArr.unshift(plantBottom)
                plantBottomArr.unshift(plantTop)
                arrLengthPlant --
            }
        }
        createSeaweed()

        const drawSeaweed = () => {
        plantBottomArr.forEach(el => { 
            if (!el.gameStop) {
            el.draw()
            el.move() }
            })
        }

        checkHealth = () => {
            if (healthPoints > 0) {
                return
            }   gameOver()
                drawGameOver()
        } 



        const update = () => {
            if (gameUpdateStop) {
                return
            }
            ctx.clearRect(0,0,canvas.width, canvas.height)
            background.draw()
            background.move()
            fish.draw()
            worm.draw()
            worm.move()
            eel.draw()
            eel.move()
            kraken.draw()
            kraken.move()
            life.draw()
            life.move()
            bubbles.draw()
            bubbles.move()
            console.log(bubbles)
            drawScore()
            drawHealth()
            drawLevel()
            checkCollectionWorm()
            checkTrap()
            checkHealth()
            checkWound()
            drawSeaweed()
            checkCollisionPlant()
            checkCollisionsEel()
            checkCollisionsKraken()
            checkCollectionLife()
            requestAnimationFrame(update)
            }
            requestAnimationFrame(update)

        }
        
    
    class Background {
        constructor() {
          this.x = -2000,
          this.y = 0,
          this.w = 3000,
          this.h = 500,
      
          this.gameStop = false
        }
        draw() {
          ctx.drawImage(backgrImg, this.x, this.y, this.w, this.h)
        }

        move() {
            if (!this.gameStop) {
            this.x += 2*speed
        }   if (this.x > 0) {
            this.x = -2000
        }
          }
    }

    class Fish {
        constructor() {
          this.x = 800,
          this.y = 250,
          this.w = 60,
          this.h = 50,

          this.wounded = false,
          this.gameStop = false
        }
        draw() {
          ctx.drawImage(playerImg, this.x, this.y, this.w, this.h)
        }
        moveUp() {
        if (this.y <= 0 || this.gameStop == true) {
            return
        } this.y -= 30
        }
        moveDown() {
        if (this.y >= (canvas.height - 20) || this.gameStop == true) {
            return
        } this.y += 30
        }
        moveForward() {
        if (this.x <= 600 || this.gameStop == true) {
            return
        } this.x -= 15
        }
        moveBack() {
        if (this.x >= 900 || this.gameStop == true) {
            return
        } this.x += 15  
        }
        getPulledUp() {
            if (this.y > 0) {
                this.y -= 1
              } drawGameOver()
        }
        contains(b){
            return (this.x < b.x + b.w) &&
              (this.x + this.w > b.x) &&
              (this.y < b.y + b.h) &&
              (this.y + this.h > b.y)
        }

    }

    class SeaweedBottom {
        constructor() {
          this.x = -(Math.floor(Math.random() * 2000) ),
          this.y = (canvas.height - (Math.floor(Math.random() * 140) + 70)),
          this.w = 40,
          this.h = 350,
      
          this.gameStop = false
        }
        draw() {
          ctx.drawImage(planBottImg, this.x, this.y, this.w, this.h)
        }

        move() {
            if (!this.gameStop) {
            this.x += 2*speed
        }   if (this.x > 1000) {
            this.x = 0
            this.y = (canvas.height - (Math.floor(Math.random() * 140) + 70))
        }
          }
    }

    class SeaweedTop {
        constructor() {
          this.x = -(Math.floor(Math.random() * 2000) ),
          this.y = -10,
          this.w = 40,
          this.h = (Math.floor(Math.random() * 130)+ 70),
      
          this.gameStop = false
        }
        draw() {
          ctx.drawImage(planTopImg, this.x, this.y, this.w, this.h)
        }

        move() {
            if (!this.gameStop) {
            this.x += 2*speed
        }   if (this.x > 1000) {
            this.x = 0
            this.h = (Math.floor(Math.random() * 130)+ 70)
        }
          }
    }

    class Worm {
        constructor() {
          this.x = 0,
          this.y = Math.floor(Math.random() * 350)+ 50,
          this.w = 30,
          this.h = 30,
      
          this.gameStop = false,
          this.trap = false
        }
        draw() {
          ctx.drawImage(wormImg, this.x, this.y, this.w, this.h)
        }
        move() {
            if (!this.gameStop) {
            this.x += 2*speed
        }   if (this.x > 1000) {
            this.x = 0
            this.y = Math.floor(Math.random() * 350)+ 50
            this.trap = Boolean(Math.round(Math.random()))
        }
          }
        getPulledUp() {
        if (this.y > 0) {
            this.y -= 1
            }
        }
    }

    class Hook {
        constructor() {
          this.x = 0,
          this.y = 0,
          this.w = 1,
          this.h = 0,
          this.color = 'black',
      
          this.gameStop = false
        }
        draw() {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.w, this.h)
        }
        move() {
            if (!this.gameStop) {
            this.x += 2*speed
        }   if (this.x > 1000) {
            this.x = 0
          }
        }
        getPulledUp() {
            if (this.y > 0) {
                this.y -= 1
                }
            }
    }

    class Eel {
        constructor() {
          this.x = -780,
          this.y = (Math.floor(Math.random() * 400)+ 50 ),
          this.w = 180,
          this.h = 40,
      
          this.gameStop = false
        }
        draw() {
            ctx.drawImage(eelImg, this.x, this.y, this.w, this.h)
        }
        move() {
            if (!this.gameStop) {
            this.x += 3.5*speed
        }   if (this.x > 1000) {
            this.x = 0
            this.y = (Math.floor(Math.random() * 400)+ 50 )
          }
        }
    }
    class Kraken {
        constructor() {
          this.x = -5000,
          this.y = (Math.floor(Math.random() * 500)+ 70 ),
          this.w = 200,
          this.h = 170,

          this.direction = 'up'
      
          this.gameStop = false
        }
        draw() {
            ctx.drawImage(krakenImg, this.x, this.y, this.w, this.h)
        }
        move() {

          if (this.y > -15 && this.y < 0) {
            this.direction = 'down'
          } 
          if (this.y > 450 && this.y < 465)  {
            this.direction = 'up'
          }

          if (!this.gameStop && this.direction ==='up') {
            this.x += 1.8*speed
            this.y -= 1.2*speed
          }else if ((!this.gameStop && this.direction ==='down')) {
            this.x += 1.8*speed
            this.y += 1.2*speed
          }

          if (this.x > 1000) { 
            this.x = -(Math.floor(Math.random() * 8000) )
            this.y = (Math.floor(Math.random() * 500) )
            }   
        }  
    }

    class Life {
        constructor() {
          this.x = -10000,
          this.y = Math.floor(Math.random() * 300)+ 100,
          this.w = 40,
          this.h = 35,
      
          this.gameStop = false
        }
        draw() {
          ctx.drawImage(heartImg, this.x, this.y, this.w, this.h)
        }
        move() {
            if (!this.gameStop) {
            this.x += 2*speed
        }   if (this.x > 1000) {
            this.x = -7000
            this.y = Math.floor(Math.random() * 300)+ 100
            }
        }
    }

    class Bubble {
        constructor() {
          this.x = 300,
          this.y = 300,
          this.w = 300,
          this.h = 300,
      
          this.gameStop = false
        }
        draw() {
          ctx.drawImage(singleBubble, this.x, this.y, this.w, this.h)
          console.log('drawn')
        }
        move() {
            if (!this.gameStop) {
            this.y -= 1*speed
        }   if (this.y < 0) {
            this.x = 300
            this.y = 300
            }
        }
    }

}
