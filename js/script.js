const score=document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea=document.querySelector('.gameArea');

let player={speed:5,score:0};
let keys={ArrowUp:false,ArrowDown:false,ArrowRight:false,ArrowLeft:false}

document.addEventListener('keydown',keyDown)
document.addEventListener('keyup',keyUp)

startScreen.addEventListener('click',start)
function keyDown(e){
    e.preventDefault();
    // console.log(keys)
    keys[e.key]=true;
    // console.log(e.key)
}

function isCollide(a,b){
    arect=a.getBoundingClientRect();
    brect=b.getBoundingClientRect();
    return!((arect.bottom<brect.top)||(arect.top>brect.bottom)||(arect.right<brect.left)||(arect.left>brect.right))
}
function keyUp(e){
    e.preventDefault();
    // console.log(keys)
    keys[e.key]=false;

    // console.log(e.key)
}
function gamePlay(){
    
    let car=document.querySelector('.car');
    let road=gameArea.getBoundingClientRect();
    // console.log(road)
    if(player.start){
        movelines();
        moveOtherCar(car);
        if(keys.ArrowUp && player.y>100){player.y-=player.speed};
        if(keys.ArrowDown &&player.y<(road.bottom-70)){player.y+=player.speed};
        if(keys.ArrowLeft && player.x>0){player.x-=player.speed};
        if(keys.ArrowRight && player.x<350){player.x+=player.speed};

        car.style.top=player.y+"px";
        car.style.left=player.x+"px";

        window.requestAnimationFrame(gamePlay);
        console.log(player.score++)
        player.score++;
        let ps =player.score-2;
        score.innerHTML="Score : "+ps;
        
    }

}
function movelines(){
    let  lines=document.querySelectorAll('.line')
    lines.forEach(function(item){
        if(item.y>=700)
        {
            item.y-=750;
        }
        item.y+=player.speed;
        item.style.top=item.y+"px"

    })
}

function endGame(){
    player.start=false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML="GAME OVER:<br> Your Score : "+player.score+"<br>Click here to start again"
    var audio = new Audio('/image/audio.wav');
       audio.play();
}
function moveOtherCar(car){
    let  other=document.querySelectorAll('.other')
    other.forEach(function(item){
        if(isCollide(car,item)){
            endGame();
        }
        if(item.y>=750)
        {
            item.y=-300;
        item.style.left=Math.floor(Math.random()*350)+"px";

        }
        item.y+=player.speed;
        item.style.top=item.y+"px"

    })
}
function start(){

    
    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML="";
    player.start=true;
    player.score=0;
    window.requestAnimationFrame(gamePlay);


    let car=document.createElement('div');
    car.setAttribute('class','car');
    gameArea.appendChild(car);
    player.y =car.offsetTop;
    player.x=car.offsetLeft;

    for(let x=0;x<5;x++){

        let roadLine=document.createElement('div');

        roadLine.setAttribute('class','line');
        roadLine.y=(x*150)
        roadLine.style.top=roadLine.y+"px"
        gameArea.appendChild(roadLine);
    }


    const otherArr=['/image/car11.png','/image/car21.png','/image/car31.png','/image/car41.png','/image/car51.png',]

    for(let x=0;x<3;x++){

        let othercar=document.createElement('div');

        othercar.setAttribute('class','other');
        othercar.y=((x+1)*350)*-1;;
        othercar.style.top=othercar.y+"px"
        othercar.style.backgroundImage=`url(${otherArr[Math.floor(Math.random()*5)]})`;
        othercar.style.left=Math.floor(Math.random()*350)+"px";
        gameArea.appendChild(othercar);
    }

}
