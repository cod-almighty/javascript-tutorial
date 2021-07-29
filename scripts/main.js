alert("I'm Working!");
const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.myCanvas
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

ctx.fillStyle = 'rgb(255,255,255)';
ctx.fillRect(0,0, width, height);
ctx.strokeStyle = 'rgb(255,255,255)';
ctx.strokeRect(25,25,100,500);