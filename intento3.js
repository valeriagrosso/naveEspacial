'use strict'
import {GAME} from './iniIntento2.js'

// CREACIón del objeto balón
// PROPIEDADES> x, y, vX, vY, r, imagen
// METODOS> dibujarse, moverse
class Planeta {
    constructor(x, y, r, w, imagen)
    {
        this.x = x;
        this.y = y;
        this.r = r;
        this.w = w;//angular velocity
        this.imagen = imagen;
    }

    dibujarse(){
        GAME.drawRotatedImage(this.imagen, this.x, this.y,this.angle, 2*this.r, 2*this.r);
    }
    moverse(){
        this.angle = this.angle + this.w * GAME.dT/1000;
    }
}

class Nave{
    constructor(x, y,speed, width, height, angle)
    {
        this.x = x;
        this.y = y;
        this.vX;
        this.vY;
        this.speed = speed
        this.angle = angle;
        this.width = width;
        this.height = height;
        this.imagen = GAME.images.nave;
        this.enMovimiento = false;
    }

    dibujarse(){
        
        GAME.drawRotatedImage(this.imagen, this.x, this.y, this.angle+90, 100, 100);
    }
    moverse(){
        this.vX = this.speed*Math.cos(this.angle*Math.PI/180);
        this.vY = this.speed*Math.sin(this.angle*Math.PI/180);
        if (this.enMovimiento){
            this.x += this.vX * GAME.dT/300;
            this.y += this.vY * GAME.dT/300;
        }
    }
    }
function crearPlanetas(){//x, y, r, angle, w, imagen
    let mercurio = new Planeta (100, 280, 30, 50, GAME.images.mercurio)
    let venus = new Planeta (250, 120, 43, 50, GAME.images.venus)
    let tierra = new Planeta (500, 60, 40, 50, GAME.images.tierra)
    let marte = new Planeta (750, 60, 60, 50, GAME.images.marte)
    let jupiter = new Planeta (1000, 120, 70, 50, GAME.images.jupiter)
    let saturno = new Planeta (1150, 280, 110, 50, GAME.images.saturno)
    let urano = new Planeta (400, 220, 60, 50, GAME.images.urano)
    let neptuno = new Planeta (840, 220, 70, 50, GAME.images.neptuno)
    let pluton = new Planeta (625, 220, 40, 50, GAME.images.pluton)
    let sol = new Planeta (625, 600, 150, 50, GAME.images.sol)
    GAME.objects.planetas.push(mercurio);
    GAME.objects.planetas.push(venus);
    GAME.objects.planetas.push(tierra);
    GAME.objects.planetas.push(marte);
    GAME.objects.planetas.push(jupiter);
    GAME.objects.planetas.push(saturno);
    GAME.objects.planetas.push(urano);
    GAME.objects.planetas.push(neptuno);
    GAME.objects.planetas.push(pluton);
    GAME.objects.planetas.push(sol);
}

class Meteorito {
    constructor(x, y, vX, vY, r, angle, w)
    {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vX = vX;
        this.vY = vY;
        this.angle = angle;
        this.w = w;//angular velocity
        this.imagen = GAME.images.meteorito;
    }

    dibujarse(){
        // console.log(this.imagen)
        GAME.drawRotatedImage(this.imagen, this.x, this.y, this.angle, 2*this.r, 2*this.r);
    }
    moverse(){
        this.x = this.x + this.vX * GAME.dT/1000;
        this.y = this.y + this.vY * GAME.dT/1000;
        this.angle = this.angle + this.w * GAME.dT/1000;
    }
}

GAME.setup = function(){
    GAME.objects ={meteoritos: [], planetas:[], player: new Nave(625, 435, 30, 30, 50, 0)}
    crearPlanetas()
    GAME.score = 0;
    GAME.nitros = 10;
}

function mostrarPuntaje(){
    GAME.ctx.font = "30px Arial";
    GAME.ctx.fillStyle = "white"
    GAME.ctx.fillText(`Puntaje: ${GAME.score}`, 10, 50);
}

function colisionConNave(planeta){
    let distancia = Math.sqrt(Math.pow(planeta.x - GAME.objects.player.x, 2) + Math.pow(planeta.y - GAME.objects.player.y, 2));
    if (distancia < planeta.r + GAME.objects.player.width/2) return true;
    else return  false;
}
function buscarColisiones()
{
    let colisiones = []
    for (let i=0; i < GAME.objects.planetas.length; i++){
        if(colisionConNave(GAME.objects.planetas[i])) colisiones.push(i);
    }
    return colisiones;
}
function quitarPlanetas(colisiones) {
    for(let pos of colisiones){
        //splice quita elementos de un array.
        GAME.objects.planetas.splice(pos, 1);
    }
}
function colisionConMeteorito(meteorito){
    let distancia2 = Math.sqrt(Math.pow(meteorito.x - GAME.objects.player.x, 2) + Math.pow(meteorito.y - GAME.objects.player.y, 2));
    if (distancia2 < meteorito.r + GAME.objects.player.width/2) return true;
    else return  false;
}
function buscarColisiones2()
{
    let colisiones2 = []
    for (let i=0; i < GAME.objects.meteoritos.length; i++){
        if(colisionConMeteorito(GAME.objects.meteoritos[i])) colisiones2.push(i);
    }
    return colisiones2;
}
function quitarMeteorito(colisiones2) {
    for(let pos of colisiones2){ 
        //splice quita elementos de un array.
        GAME.objects.meteoritos.splice(pos, 1);
    perdida()
    }
    return true
}
function perdida(){
        //muestrar el mensaje de que perdio
    GAME.ctx.font = "100px Arial";
    GAME.ctx.fillStyle = "red"
    GAME.ctx.fillText(`PERDISTE`, 380, 320);
    GAME.pause()
}


function resetSpeed() {
    GAME.objects.player.speed = 15;
}
GAME.draw =  function(){
    GAME.ctx.clearRect(0,0,1250,590);
    if (GAME.score >= 9){
        // detener el juego
        GAME.pause();
        // muestre el mensaje de que ganó
        GAME.ctx.font = "100px Arial";
        GAME.ctx.fillStyle = "green";
        GAME.ctx.fillText(`GANASTE`, 380, 320);
    }
    mostrarPuntaje();
    
    for (let meteorito of GAME.objects.meteoritos){
        meteorito.dibujarse();
        meteorito.moverse();
    }

    for (let planeta of GAME.objects.planetas){
        planeta.dibujarse();
    }
    
    GAME.objects.player.dibujarse();
    GAME.objects.player.moverse();

    // buscar colisiones devuelve una lista con los índices de los balónes con los cuales la nave chocó
    let colisiones = buscarColisiones();
    let colisiones2 = buscarColisiones2();
    // Se quitan los balones de la lista de balones cuando la nave los toca
    quitarPlanetas(colisiones);
    quitarMeteorito(colisiones2);
    // Se suman los puntos correspondientes
    GAME.score += colisiones.length;
}

GAME.start();


function crearParticula(){
    let ang = 2 * Math.PI * Math.random();
    let newX = 50 + 1200 *Math.random()
    let newY = 50 + 540 *Math.random()
    let nuevoMeteorito = new Meteorito(newX, newY,10 * Math.cos(ang), 10 * Math.sin(ang), 15, 0, 360);
    GAME.objects.meteoritos.push(nuevoMeteorito);
}
// Al hacer click se va a ejecutar la función crear partícula
//GAME.canvas.onclick = crearParticula
window.setInterval (crearParticula, 300)

function teclaPresionada(e){
    console.log(e.code)
    if (e.code =='Space')
    {
        console.log(e.shiftKey)
        if(e.shiftKey) GAME.reset();
        else{
            if (GAME.running) GAME.pause();
            else GAME.play();
        }

    }
    if (e.code == 'KeyW')
    {
        GAME.objects.player.enMovimiento = true
        // console.log('arrancar')
    }
    if (e.code == 'KeyE')
    {
        if (GAME.nitros > 0)
        {
            console.log("increasing speed")
            GAME.objects.player.speed = 80;
            GAME.nitros -= 1;
            window.setTimeout(resetSpeed, 1000);
        }
        // console.log('arrancar')
    }
    // console.log(e.code)
}
function teclaLevantada(e)
{
    if (e.code == 'KeyW')
    {
        GAME.objects.player.enMovimiento = false;
        // console.log('detenerse')
    }
    if (e.code == 'KeyS')
    {
        GAME.objects.player.enMovimiento = false;
        GAME.objects.player.enReversa = false;
        // console.log('detener el movimiento hacia atrás')
    }
}
document.onkeydown = teclaPresionada;
document.onkeyup = teclaLevantada;

function mouseMovido(e){
    let newAng = Math.atan((e.offsetY - GAME.objects.player.y)/(e.offsetX - GAME.objects.player.x))* 180/Math.PI;
    if (e.offsetX < GAME.objects.player.x) newAng += 180
    GAME.objects.player.angle = newAng;
    // console.log(newAng)w
}
document.onmousemove = mouseMovido;