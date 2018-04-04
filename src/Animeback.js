import React from 'react';
import './Animeback.css';

class Animeback extends React.Component {

    render() {
var canvas, ctx, cw, ch;
var particles = [];
const MIN_VEL = -1,
    MAX_VEL = 1,
    NUM_PARTICLES = 150,
    RADIUS = 1,
    MIN_PARTICLE_DISTANCE = 0.06,
    ISGRAYSCALE = false,
    LINEWIDTH = 0.9,
    FPS = 1000 / 60;

var requestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(callback) { return setTimeout(callback, FPS); };

window.onload = function () {
    canvas = document.getElementById("canvas");
    initCanvas();
    window.onresize=function(){initCanvas()};
    init();
}

function initCanvas(){
    ctx = canvas.getContext("2d");
    cw = window.innerWidth;
    ch = window.innerHeight;
    canvas.width = cw;
    canvas.height = ch;
}

function init() {
    for (var i = 0; i < NUM_PARTICLES; i++) {
        var r = getRandomInt(0, 255);
        var g = r;
        var b = r;
      if(!ISGRAYSCALE) {
        g = getRandomInt(0, 255);
        b = getRandomInt(0, 255);
      }
        
        particles.push(new Particle(rgbToHex(r, g, b), RADIUS, new Point(getRandomInt(1, cw - 1), getRandomInt(1, ch - 1)), new Vector(new Point(), new Point(getRandomNumber(MIN_VEL, MAX_VEL), getRandomNumber(MIN_VEL, MAX_VEL)))));
    }
    animate();
}

function animate() {
    ctx.clearRect(0, 0, cw, ch);
    for (var i = 0; i < particles.length; i++) {
        if (particles[i].position.x >= cw || particles[i].position.x <= 0) invertMovement(i, "x");
        if (particles[i].position.y >= ch || particles[i].position.y <= 0) invertMovement(i, "y");
        particles[i].position = particles[i].distance(particles[i].time);
        drawParticle(particles[i]);
        particles[i].time++;
        for (var j = 0; j < NUM_PARTICLES; j++) {
            if (i !== j) {
                if (particles[i].position.distance(particles[j].position) < cw * MIN_PARTICLE_DISTANCE)
                    lineParticles(particles[i], particles[j]);
            }
        }
    }
    requestAnimationFrame(animate);
}

function invertMovement(index, axis) {
    particles[index].vel = particles[index].vel.inverse(axis);
    particles[index].initPos = particles[index].position.clone();
    particles[index].time = 1;
}

function lineParticles(p1, p2) {
    ctx.beginPath();
    var gradient = ctx.createLinearGradient(p1.position.x, p1.position.y, p2.position.x, p2.position.y);
    gradient.addColorStop("0", p1.color);
    gradient.addColorStop("1.0", p2.color);
    ctx.strokeStyle = gradient;
    ctx.lineWidth=LINEWIDTH;
    ctx.moveTo(p1.position.x, p1.position.y);
    ctx.lineTo(p2.position.x, p2.position.y);
    ctx.stroke();
}

function drawParticle(p) {
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
}



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min + 1) + min;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

//-------- PROTOTYPES --------
//POINT
function Point(x, y, z) {
    this.x = (x == null) ? 0 : x;
    this.y = (y == null) ? 0 : y;
    this.z = (z == null) ? 0 : z;
}
Point.prototype.distance = function (p2) {
    //Euclidean Disctance
    return Math.sqrt(Math.pow(this.x - p2.x, 2) + Math.pow(this.y - p2.y, 2) + Math.pow(this.z - p2.z, 2));
}
Point.prototype.manhatan = function (p1, p2) {
    return (p2.x - p1.x) + (p2.y - p1.y) + (p2.z - p1.z);
}
Point.prototype.clone = function () {
    return new Point(this.x, this.y, this.z);
}

//VECTOR
function Vector(p1, p2, color) {
    this.p1 = (p1 == null) ? (new Point()) : p1;
    this.p2 = (p2 == null) ? (new Point()) : p2;
    this.color = (color == null) ? "#000" : color;
    this.origin = new Point();
}
Vector.prototype.norm = function () {
    return this.p1.distance(this.p2);
}
Vector.prototype.component = function (axis) {// eslint-disable-next-line
    switch (axis.toUpperCase()) {
        
    case "X":
        return this.p2.x - this.p1.x;
      
    case "Y":
        return this.p2.y - this.p1.y;
       
    case "Z":
        return this.p2.z - this.p1.z;
       
    }
}
Vector.prototype.toPoint = function (p) {
    if (p == null) p = new Point();
    var d0x = this.p1.x - p.x;
    var d0y = this.p1.y - p.y;
    var d0z = this.p1.z - p.z;
    var p1n = new Point(this.p1.x - d0x, this.p1.y - d0y, this.p1.z - d0z);
    var p2n = new Point(this.p2.x - d0x, this.p2.y - d0y, this.p2.z - d0z);
    return new Vector(p1n, p2n);
}
Vector.prototype.toOrigin = function () {
    return this.toPoint(this.origin);
}

Vector.prototype.inverse = function (axis) {
    if (axis == null)
        return new Vector(this.p2, this.p1);
    else {
        var v1c = this.toOrigin();
        var v = new Vector();// eslint-disable-next-line
        switch (axis.toUpperCase()) {
        case "X":
            v = new Vector(new Point(), new Point(-v1c.p2.x, v1c.p2.y, v1c.p2.z));
            break;
        case "Y":
            v = new Vector(new Point(), new Point(v1c.p2.x, -v1c.p2.y, v1c.p2.z));
            break;
        case "Z":
            v = new Vector(new Point(), new Point(v1c.p2.x, v1c.p2.y, -v1c.p2.z));
            break;
        }
        return v.toPoint(this.p1);
    }
}


//PARTICLE
function Particle(color, radius, position, velocity, acceleration) {
    this.position = (position == null) ? (new Point()) : position;
    this.initPos = (position == null) ? (new Point()) : position;
    this.vel = (velocity == null) ? (new Vector()) : velocity;
    this.acceleration = (acceleration == null) ? (new Vector()) : acceleration;
    this.color = (color == null) ? "#000" : color;
    this.radius = (radius == null) ? 2 : radius;
    this.time = 0;
}

Particle.prototype.distance = function (t) {
    //s = s0 + v0t + at2/2
    var sx = this.initPos.x + this.vel.component("x") * t + (this.acceleration.component("x") * Math.pow(t, 2)) / 2;
    var sy = this.initPos.y + this.vel.component("y") * t + (this.acceleration.component("y") * Math.pow(t, 2)) / 2;
    var sz = this.initPos.z + this.vel.component("z") * t + (this.acceleration.component("z") * Math.pow(t, 2)) / 2;
    return new Point(sx, sy, sz);
}

Particle.prototype.velocity = function (t) {
    //v = v0 + at
    var vx = this.vel.component("x") + this.acceleration.component("x") * t;
    var vy = this.vel.component("y") + this.acceleration.component("y") * t;
    var vz = this.vel.component("z") + this.acceleration.component("z") * t;
    return new Vector(new Point(), new Point(vx, vy, vz));
}
        return (
<div className="animback">
    <canvas  id="canvas"></canvas>I
</div>
        )
    }
}

export default Animeback;