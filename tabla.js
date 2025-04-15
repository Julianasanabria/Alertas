const form = document.getElementById('registro-form');
const tabla = document.getElementById('tabla-datos').querySelector('tbody');

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
        alert('Por favor, complete todos los campos.');
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

    form.reset();
});
