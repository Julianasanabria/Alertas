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
    const particleCount = 100; // Número de partículas
    const particles = [];

    // Colores que complementan el tema actual (tonos azules y morados)
    const colors = [
        'rgba(68, 0, 255, 0.7)',  // Morado
        'rgba(133, 224, 240, 0.7)',  // Azul claro
        'rgba(18, 2, 73, 0.7)',    // Morado oscuro
        'rgba(255, 255, 255, 0.5)'   // Blanco
    ];

    // Clase para crear partículas
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1; // Tamaño entre 1 y 6
            this.speedX = Math.random() * 1 - 0.5; // Velocidad entre -0.5 y 0.5
            this.speedY = Math.random() * 1 - 0.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.5 + 0.3; // Opacidad entre 0.3 y 0.8
        }

        update() {
            // Mover la partícula
            this.x += this.speedX;
            this.y += this.speedY;

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
        }
    }

    // Crear las partículas
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Función para animar las partículas
    function animate() {
        // Limpiar el canvas con un fondo semi-transparente para crear efecto de estela
        ctx.fillStyle = 'rgba(10, 0, 51, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

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
});