const apiUrl = 'http://localhost:3000/piezas';

function cargarPiezas() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const piezasLista = document.getElementById('piezas-lista');
            piezasLista.innerHTML = data.map(pieza => `
                <tr>
                    <td>${pieza.id}</td>
                    <td>${pieza.nombre}</td>
                    <td>${pieza.descripcion}</td>
                    <td>${pieza.cantidad}</td>
                    <td>${pieza.precio}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editarPieza(${pieza.id})">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="eliminarPieza(${pieza.id})">Eliminar</button>
                    </td>
                </tr>
            `).join('');
        });
}

function guardarPieza() {
    const id = document.getElementById('piezaId').value;
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;

    const pieza = { nombre, descripcion, cantidad, precio };
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pieza)
    })
    .then(() => {
        document.getElementById('formPieza').reset();
        cargarPiezas();
    });
}

function editarPieza(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(pieza => {
            document.getElementById('piezaId').value = pieza.id;
            document.getElementById('nombre').value = pieza.nombre;
            document.getElementById('descripcion').value = pieza.descripcion;
            document.getElementById('cantidad').value = pieza.cantidad;
            document.getElementById('precio').value = pieza.precio;
            new bootstrap.Modal(document.getElementById('modalPieza')).show();
        });
}

function eliminarPieza(id) {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
        .then(() => cargarPiezas());
}

document.addEventListener('DOMContentLoaded', cargarPiezas);