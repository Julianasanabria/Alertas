const form = document.getElementById('registro-form');
const tabla = document.getElementById('tabla-datos').querySelector('tbody');
const alerta = document.getElementById('alerta');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombres = document.getElementById('nombres').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const opcion = document.getElementById('opcion').value;
    const documento = document.getElementById('documento').value.trim();
    const email = document.getElementById('email').value.trim();
    const fecha = document.getElementById('fecha').value;
    const genero = document.querySelector('input[name="genero"]:checked')?.value || 'No especificado';

    if (!nombres || !apellidos || !opcion || !documento || !email || !fecha) {
        mostrarAlerta('<strong>Error:</strong> Por favor, complete todos los campos.', 'error');
        return;
    }

    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${nombres}</td>
        <td>${apellidos}</td>
        <td>${opcion}</td>
        <td>${documento}</td>
        <td>${email}</td>
        <td>${fecha}</td>
        <td>${genero}</td>
    `;

    // Insertar la fila al principio de la tabla
    tabla.prepend(fila);

    // Guardar los datos en la consola
    const datosUsuario = {
        nombres,
        apellidos,
        tipoDocumento: opcion,
        numeroDocumento: documento,
        email,
        fechaNacimiento: fecha,
        genero
    };
    
    console.log('Datos guardados:');
    console.log(datosUsuario);

    mostrarAlerta('<strong>Éxito:</strong> Datos agregados correctamente.', 'exito');
    form.reset();
});

function mostrarAlerta(mensaje, tipo) {
    alerta.innerHTML = mensaje; // Usar innerHTML para contenido personalizado
    alerta.className = `alerta ${tipo} visible`;

    // Ocultar la alerta después de 3 segundos con animación de salida
    setTimeout(() => {
        alerta.className = `alerta ${tipo} oculto`;
    }, 3000);
}
