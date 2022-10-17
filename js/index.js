
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// IMAGE-COLLECTION:
const backgrImg = new Image();
backgrImg.src = "/images/finalback.jpg"

let fishImg = new Image();
fishImg.src = "/images/fish-fin.png"

const planBottImg = new Image();
planBottImg.src = "/images/seaweedup1.png"

const planTopImg = new Image();
planTopImg.src = "/images/seaweeddown1.png"

let wormImg = new Image();
wormImg.src = "/images/worm.webp"

const eelImg = new Image ();
eelImg.src = "/images/eel1.png"

const heartImg = new Image ();
heartImg.src = "/images/heart.png"

// OBSTACLE-ARRAYS:

let plantBottomArr = [];
let wormCount = 0;
let score = 0;
let highScore;




window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        document.getElementById('game-container').scrollIntoView();
        startGame();
    };

        function startGame() {

            const background = new Background
            const fish = new Fish
            const worm = new Worm
            const hook = new Hook
            const eel = new Eel
            const life = new Life

            let healthPoints = 10;
            let arrLengthPlant = 4;
            
            // let level = 1;
            // let speed = 1;
            // let arrLengthEel = 1;

            

            document.addEventListener("keydown", (e) => {
                if (e.keyCode === 38){
                  fish.moveUp()
                  fish.draw()
                } else if (e.keyCode === 40){
                  fish.moveDown()
                  fish.draw()
                }
              })
            
            

            const checkCollectionWorm = () => {
            if (fish.contains(worm)){
                if (!worm.trap) {
                worm.x = 0
                worm.y = Math.floor(Math.random() * 130)
                worm.trap = Boolean(Math.round(Math.random()))
                hook.x = 0
                wormCount ++
                score += 200
                } else if (worm.trap == true){
                    fish.getPulledUp()
                    worm.getPulledUp()
                    hook.getPulledUp()
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
                        }
                    } 
                }

            const checkTrap = () => {
                if (worm.trap == false) {
                    wormImg.src = "/images/worm.webp" 
                    return
                } else {
                    wormImg.src = "/images/worm(2).png"
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
                    fishImg.src = "/images/fish-fin.png"
                } else {
                    fishImg.src = "/images/fish-hurt.png"
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
            

            const drawScore = () => {
                ctx.fillStyle = "white"
                ctx.font = "24px Arial"
                ctx.fillText(`Score: ${score}`, 840,40)
            }

            const drawHealth = () => {
                ctx.fillStyle = "white"
                ctx.font = "24px Arial"
                ctx.fillText(`Health: ${healthPoints}`, 680,40)
            }

            const gameOver = () => {
                background.gameStop = true
                fish.gameStop = true
                worm.gameStop = true
                hook.gameStop = true
                eel.gameStop = true
                life.gameStop = true
                plantBottomArr.forEach(el => {
                    el.gameStop = true
                    })
                plantBottomArr = []
            }
            

            const pause = () => {
                background.gameStop = true
                fish.gameStop = true
                worm.gameStop = true
                hook.gameStop = true
            }

            const createSeaweed = () => {
                while (arrLengthPlant > 0) {
                    const plantBottom = new SeaweedBottom
                    const plantTop = new SeaweedTop
                    plantBottomArr.unshift(plantBottom)
                    plantBottomArr.unshift(plantTop)
                    arrLengthPlant --
                    console.log(plantBottomArr)
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
                ctx.clearRect(0,0,canvas.width, canvas.height)
                background.draw()
                background.move()
                fish.draw()
                worm.draw()
                worm.move()
                eel.draw()
                eel.move()
                life.draw()
                life.move()
                drawScore()
                drawHealth()
                checkCollectionWorm()
                checkTrap()
                checkHealth()
                checkWound()
                drawSeaweed()
                // shortenArr()
                checkCollisionPlant()
                checkCollisionsEel()
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
            this.x += 2
        }   if (this.x == 0) {
            this.x = -2000
        }
          }
    }

    class Fish {
        constructor() {
          this.x = 800,
          this.y = 250,
          this.w = 60,
          this.h = 40,

          this.wounded = false,
          this.gameStop = false
        }
        draw() {
          ctx.drawImage(fishImg, this.x, this.y, this.w, this.h)
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
          this.y = (canvas.height - (Math.floor(Math.random() * 100) )),
          this.w = 60,
          this.h = 300,
      
          this.gameStop = false
        }
        draw() {
          ctx.drawImage(planBottImg, this.x, this.y, this.w, this.h)
        }

        move() {
            if (!this.gameStop) {
            this.x += 2
        }   if (this.x > 1000) {
            this.x = 0
            this.y = (canvas.height - (Math.floor(Math.random() * 200) ))
        }
          }
    }

    class SeaweedTop {
        constructor() {
          this.x = -(Math.floor(Math.random() * 2000) ),
          this.y = -10,
          this.w = 60,
          this.h = (Math.floor(Math.random() * 180)+ 70),
      
          this.gameStop = false
        }
        draw() {
          ctx.drawImage(planTopImg, this.x, this.y, this.w, this.h)
        }

        move() {
            if (!this.gameStop) {
            this.x += 2
        }   if (this.x > 1000) {
            this.x = 0
            this.h = (Math.floor(Math.random() * 180)+ 70)
        }
          }
    }

    class Worm {
        constructor() {
          this.x = 0,
          this.y = Math.floor(Math.random() * 350)+ 100,
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
            this.x += 2
        }   if (this.x > 1000) {
            this.x = 0
            this.y = Math.floor(Math.random() * 350)+ 100
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
            this.x += 2
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
          this.x = 0,
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
            this.x += 3.5
        }   if (this.x > 1000) {
            this.x = 0
            this.y = (Math.floor(Math.random() * 400)+ 50 )
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
            this.x += 2
        }   if (this.x > 1000) {
            this.x = -7000
            this.y = Math.floor(Math.random() * 300)+ 100
            }
        }
    }


    function drawGameOver() {
        let text = 'GAME OVER'
        ctx.fillStyle = "black"
        ctx.font = "70px Arial"
        ctx.fillText(text, 40,200)
        }

}
