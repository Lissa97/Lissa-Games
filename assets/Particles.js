function startParticle(canvas)
    {
        const speed = 0.3;
         //const canvas = document.getElementById('particle-canvas');
      const ctx = canvas.getContext('2d');
      let width, height;

      // Particle class
      class Particle {
        constructor() {
          this.reset();
        }
        reset() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.size = 2 + Math.random() * 2;
          this.speedX = (Math.random() - 0.5) * speed; // horizontal speed [-0.6,0.6]
          this.speedY = (Math.random() - 0.5) * speed; // vertical speed [-0.6,0.6]
          this.color = 'rgba(247,140,60,0.7)'; // fox orange, semi-transparent
        }
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          // Wrap around edges
          if (this.x > width) this.x = 0;
          else if (this.x < 0) this.x = width;
          if (this.y > height) this.y = 0;
          else if (this.y < 0) this.y = height;
        }
        draw(ctx) {
          ctx.beginPath();
          ctx.fillStyle = this.color;
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 4;
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      let particles = [];

      function init() {
        resize();
        particles = [];
        const particleCount = 40;
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
        animate();
      }

      function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
      }

      function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let p of particles) {
          p.update();
          p.draw(ctx);
        }
        requestAnimationFrame(animate);
      }

      window.addEventListener('resize', () => {
        resize();
      });

      init();
    }