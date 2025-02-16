// Función para cargar los detalles del producto
async function cargarDetalles() {
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = urlParams.get('id');
    
    if (!productoId) {
        document.getElementById('detalle-producto').innerHTML = '<p class="text-center text-red-500">No se encontró el producto.</p>';
        return;
    }

    try {
        const response = await fetch(`http://localhost/Apis/cafeteria.php?id=${productoId}`); // Suponiendo que tu API soporte un parámetro 'id'
        const producto = await response.json();

        if (producto.success) {
            const detalleProducto = document.getElementById('detalle-producto');
            detalleProducto.innerHTML = `
                <img src="${producto.data.imagen}" alt="${producto.data.nombre}" class="w-full h-64 object-cover mb-6">
                <h3 class="text-2xl font-semibold">${producto.data.nombre}</h3>
                <p class="text-gray-600 mt-4">${producto.data.descripcion}</p>
                <p class="text-xl font-bold mt-6">${producto.data.precio}€</p>
                <button onclick="agregarAlCarrito(${producto.data.id}, '${producto.data.nombre}', '${producto.data.descripcion}', ${producto.data.precio}, '${producto.data.imagen}')" class="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition">Agregar al carrito</button>
            `;
        } else {
            document.getElementById('detalle-producto').innerHTML = '<p class="text-center text-red-500">Producto no encontrado.</p>';
        }
    } catch (error) {
        console.error('Error al cargar los detalles:', error);
        document.getElementById('detalle-producto').innerHTML = '<p class="text-center text-red-500">Hubo un error al cargar los detalles del producto.</p>';
    }
}

// Función para agregar al carrito
async function agregarAlCarrito(id, nombre, descripcion, precio, imagen) {
    const usuario_id = 1; // Cambia este valor según el usuario actual
    
    const producto = {
        producto_id: id,
        nombre,
        descripcion,
        precio,
        imagen,
        cantidad: 1, // Siempre agrega 1 por cada clic
        usuario_id
    };

    try {
        const response = await fetch('http://localhost/Apis/CARRITONOVIEMBRE.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });

        const data = await response.json(); // Esto puede lanzar un error si no es JSON válido

        if (data.success) {
            alert(data.message); // Mostrar mensaje de éxito
        } else {
            console.error("Error del servidor:", data.message);
            alert("Error al agregar al carrito: " + data.message);
        }
    } catch (error) {
        console.error('Error al agregar producto:', error);
        alert("Error al conectar con el servidor o procesar la respuesta.");
    }
}

// Cargar los detalles del producto al cargar la página
window.onload = cargarDetalles;
