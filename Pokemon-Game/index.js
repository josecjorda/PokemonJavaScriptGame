//don't need ; for js so thats cool

const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")//api context


canvas.width =  1024
canvas.height = 576

//parsing json for collisions, width of 70 tiles on map
const collisionsMap =[]
for(let i = 0;i<collisions.length;i+=70){
    collisionsMap.push(collisions.slice(i,i+70))
}

//object for collisions
class Boundary {
    static width=48
    static height =48
    constructor({position}) {
        this.position = position
        //from 12 by 12 to 48 by 48 since we zoomed in
        this.width = 48
        this.height = 48
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}

const boundaries = []
//i is index for row, j is index for column
collisionsMap.forEach(row, i => {
    row.forEach(symbol, j =>{
        boundaries.push(new Boundary({position:{
            x:j*Boundary.width,
            y:i*Boundary.height
        }
        }))
    })
})
console.log(collisionsMap)
c.fillStyle = "white"
c.fillRect(0, 0, canvas.width,canvas.height)
//Map
const image = new Image()
image.src = "./Images/Pokemon Style Game Map.png"

//Player
const playerImage = new Image()
playerImage.src = "./Images/playerDown.png"

class Sprite{
    constructor({position, velocity,image}) {//when new instance of sprice code in constructor will run,putting brackets around it makes is an object which makes cleaner code
        this.position = position
        this.image = image
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}
//map sprite
const background = new Sprite({
    position: {
        x:-980,
        y:-530
    },
    image: image
})

//holds properties for whether keys are pressed
const keys = {
    w:{
        //can make properties by just typing a word
        pressed: false  
    },
    a:{
        pressed: false
    },
    s:{
        pressed: false
    },
    d:{
        pressed: false
    },
}

//constantly loops image
function animate(){
    window.requestAnimationFrame(animate)//Loops function
    background.draw()
    c.drawImage(
        playerImage,        
        0,                        //Crop positions
        0,
        playerImage.width/4,
        playerImage.height,
        canvas.width/2 - (playerImage.width/4)/2,              //Position in middle of map
        canvas.height/2 - playerImage.height/2,
        playerImage.width/4,
        playerImage.height
    )

    if(keys.w.pressed==true && lastkey == 'w')  background.position.y += 3 
    else if(keys.a.pressed==true && lastkey == 'a')  background.position.x += 3 
    else if(keys.s.pressed==true && lastkey == 's')  background.position.y -= 3 
    else if(keys.d.pressed==true && lastkey == 'd')  background.position.x -= 3 

}
animate()
//Searching for player movement and adjusting sprite accordingly. Checks for keydown
//lastkey checks for lastkey pressed that way direction changes even if another key is being held down
let lastkey = ''
window.addEventListener('keydown', (e) => { 
    switch(e.key){
        case 'w':
            keys.w.pressed = true
            lastkey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastkey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastkey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastkey = 'd'
            break
    }
})
//checks for keyup
window.addEventListener('keyup', (e) => {
    switch(e.key){
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})

