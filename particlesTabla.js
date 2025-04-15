document.addEventListener('DOMContentLoaded', () => {
    // Crear el elemento canvas para las partículas
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    document.body.insertBefore(canvas, document.body.firstChild); // Insertar al inicio del body

    // Establecer estilos del canvas para que cubra toda la pantalla como fondo
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1'; // Detrás de todo el contenido
    canvas.style.pointerEvents = 'none'; // Permite que los clics pasen a través del canvas

    // Obtener el contexto 2D del canvas
    const ctx = canvas.getContext('2d');

    // Ajustar el tamaño del canvas al tamaño de la ventana
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Llamar a resizeCanvas inicialmente y cuando cambie el tamaño de la ventana
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Configuración de las partículas
    const particleCount = 150; // Aumentado el número de partículas
    const particles = [];
    const connections = []; // Para almacenar conexiones entre partículas

    // Colores que complementan el tema actual (tonos azules y morados)
    const colors = [
        'rgba(106, 61, 232, 0.8)',  // Morado brillante
        'rgba(133, 224, 240, 0.8)',  // Azul claro
        'rgba(255, 255, 255, 0.6)',  // Blanco
        'rgba(180, 120, 255, 0.7)',  // Lavanda
        'rgba(0, 210, 255, 0.7)'     // Azul cian
    ];

    // Clase para crear partículas
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 1; // Tamaño entre 1 y 5
            this.baseSize = this.size; // Tamaño base para animación de pulso
            this.speedX = Math.random() * 1 - 0.5; // Velocidad entre -0.5 y 0.5
            this.speedY = Math.random() * 1 - 0.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.5 + 0.3; // Opacidad entre 0.3 y 0.8
            this.pulseSpeed = Math.random() * 0.02 + 0.01; // Velocidad de pulso
            this.pulseDirection = 1; // Dirección inicial del pulso (creciendo)
            this.pulseAmount = 0; // Cantidad actual de pulso
        }

        update() {
            // Mover la partícula
            this.x += this.speedX;
            this.y += this.speedY;

            // Efecto de pulso (crecimiento y reducción cíclica)
            this.pulseAmount += this.pulseSpeed * this.pulseDirection;
            if (this.pulseAmount > 0.5) this.pulseDirection = -1;
            if (this.pulseAmount < -0.3) this.pulseDirection = 1;
            
            this.size = this.baseSize + this.pulseAmount;
            if (this.size < 0.5) this.size = 0.5;

            // Si la partícula sale de la pantalla, resetearla
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();

            // Añadir un brillo alrededor de la partícula
            const gradient = ctx.createRadialGradient(
                this.x, this.y, this.size * 0.5,
                this.x, this.y, this.size * 2
            );
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }

    // Crear las partículas
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Función para dibujar conexiones entre partículas cercanas
    function drawConnections() {
        const maxDistance = 150; // Distancia máxima para conectar partículas
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    // Calcular opacidad basada en la distancia (más cercanas = más opacas)
                    const opacity = 1 - (distance / maxDistance);
                    
                    // Mezclar los colores de ambas partículas
                    const color1 = particles[i].color;
                    const color2 = particles[j].color;
                    
                    // Dibujar la línea con gradiente
                    const gradient = ctx.createLinearGradient(
                        particles[i].x, particles[i].y,
                        particles[j].x, particles[j].y
                    );
                    gradient.addColorStop(0, color1);
                    gradient.addColorStop(1, color2);
                    
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = opacity * 2;
                    ctx.stroke();
                }
            }
        }
    }

    // Función para animar las partículas
    function animate() {
        // Limpiar el canvas con un fondo semi-transparente para crear efecto de estela
        ctx.fillStyle = 'rgba(10, 0, 51, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dibujar conexiones entre partículas
        drawConnections();

        // Actualizar y dibujar cada partícula
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Solicitar el siguiente frame de animación
        requestAnimationFrame(animate);
    }

    // Iniciar la animación
    animate();

    // Añadir interactividad con el movimiento del ratón
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    let mouseTimeout;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;
        
        // Resetear el timeout cada vez que el ratón se mueve
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            isMouseMoving = false;
        }, 100);

        // Crear un efecto de ondas cuando el ratón se mueve
        if (Math.random() > 0.8) { // Solo crear partículas ocasionalmente
            const particle = new Particle();
            particle.x = mouseX;
            particle.y = mouseY;
            particle.size = Math.random() * 5 + 3;
            particle.baseSize = particle.size;
            particle.speedX = (Math.random() - 0.5) * 2;
            particle.speedY = (Math.random() - 0.5) * 2;
            particles.push(particle);
            
            // Mantener el número de partículas controlado
            if (particles.length > particleCount + 20) {
                particles.shift();
            }
        }
    });
});