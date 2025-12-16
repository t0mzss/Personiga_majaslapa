// Smooth scroll for navigation
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Light/Dark Mode Toggle
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Animate skill bars on scroll
const skills = document.querySelectorAll('.skill-bar div');
window.addEventListener('scroll', () => {
  const trigger = window.innerHeight * 0.85;
  skills.forEach(skill => {
    const skillTop = skill.getBoundingClientRect().top;
    if(skillTop < trigger){
      skill.style.width = skill.dataset.skill;
    }
  });
});

// Particle background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
class Particle {
  constructor(x, y, size, speedX, speedY){
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if(this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }
  draw(){
    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }
}

function initParticles(){
  particlesArray = [];
  for(let i=0;i<100;i++){
    let size = Math.random()*3 + 1;
    let x = Math.random()*canvas.width;
    let y = Math.random()*canvas.height;
    let speedX = (Math.random()-0.5)*0.5;
    let speedY = (Math.random()-0.5)*0.5;
    particlesArray.push(new Particle(x, y, size, speedX, speedY));
  }
}
function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animateParticles();
