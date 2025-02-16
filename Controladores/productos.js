// API para obtener los productos
async function cargarMenu() {
    try {
        const response = await fetch('http://localhost/Apis/cafeteria.php'); // Cambia esta URL por la URL de tu API de productos
        const productos = await response.json();
        const menuContainer = document.getElementById('menu-container');
        const orderBy = document.getElementById('orderBy');
        
        // Verificamos si el elemento 'orderBy' existe antes de agregarle el evento
        if (orderBy) {
            // Ordenar los productos según la opción seleccionada
            let productosOrdenados = productos.data;

            // Escuchar el cambio en el selector de orden
            orderBy.addEventListener('change', () => {
                const valorOrden = orderBy.value;
                if (valorOrden === 'asc') {
                    productosOrdenados = productos.data.sort((a, b) => a.precio - b.precio);
                } else if (valorOrden === 'desc') {
                    productosOrdenados = productos.data.sort((a, b) => b.precio - a.precio);
                } else if (valorOrden === 'name') {
                    productosOrdenados = productos.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
                }
                mostrarProductos(productosOrdenados);
            });
        } else {
            console.error('El elemento con id "orderBy" no se encuentra en el DOM');
        }

        // Función para mostrar los productos en el DOM
        function mostrarProductos(productos) {
            menuContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar productos
            productos.forEach(producto => {
                // Crear una tarjeta para cada producto
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('bg-white', 'rounded-lg', 'shadow-lg', 'overflow-hidden');

                tarjeta.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-56 object-cover">
                    <div class="p-4">
                        <h3 class="text-xl font-semibold">${producto.nombre}</h3>
                        <p class="text-gray-600 mt-2">${producto.descripcion}</p>
                        <p class="text-xl font-bold mt-4">${producto.precio}$</p>
                        <a href="producto-detalle.html?id=${producto.id}" class="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition block text-center">
                            Ver detalles
                        </a>
                        <button onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', '${producto.descripcion}', ${producto.precio}, '${producto.imagen}')" class="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition">
                            Agregar al carrito
                        </button>
                    </div>
                `;

                // Agregar la tarjeta al contenedor del menú
                menuContainer.appendChild(tarjeta);
            });
        }

        // Mostrar los productos ordenados al inicio
        mostrarProductos(productos.data);

    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

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

// Cargar los productos al cargar la página
window.onload = cargarMenu;
