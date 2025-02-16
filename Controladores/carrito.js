const API_URL_GUTI = "http://localhost/Apis/carritoGuti.php";  // URL de la API carritoGuti.php
const API_URL_PAL = "http://localhost/Apis/palcarrito.php";    // URL de la API palcarrito.php

// Función para cargar el contenido del carrito desde una de las APIs
async function cargarCarrito(apiUrl) {
    const carritoContainer = document.getElementById("carrito-container");
    try {
        const response = await fetch(`${apiUrl}?action=ver`);  // Llamada a la API con action=ver
        const carrito = await response.json();

        if (carrito.length === 0) {
            carritoContainer.innerHTML = `<p class="text-center text-gray-600">Tu carrito está vacío.</p>`;
        } else {
            carritoContainer.innerHTML = "";  // Limpiar contenido previo
            carrito.forEach((producto) => {
                const productoDiv = document.createElement("div");
                productoDiv.classList.add(
                    "bg-white",
                    "p-6",
                    "rounded-lg",
                    "shadow-xl",
                    "transform",
                    "hover:scale-105",
                    "transition-transform"
                );

                productoDiv.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-48 object-cover rounded-md mb-6">
                    <h3 class="text-xl font-semibold text-gray-800">${producto.nombre}</h3>
                    <p class="text-gray-600 text-sm mt-2">${producto.descripcion || ""}</p>
                    <p class="text-xl font-bold mt-4 text-gray-900">${producto.precio}€</p>
                    <p class="text-sm text-gray-500 mt-2">Cantidad: x${producto.cantidad}</p>
                    <button onclick="eliminarProducto(${producto.producto_id}, '${apiUrl}')" class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none">Eliminar</button>
                `;
                carritoContainer.appendChild(productoDiv);
            });
        }
    } catch (error) {
        console.error("Error al cargar el carrito:", error);
        carritoContainer.innerHTML = '<p class="text-center text-red-600">Error al cargar el carrito.</p>';
    }
}

// Función para eliminar un producto del carrito desde una de las APIs
async function eliminarProducto(productoId, apiUrl) {
    try {
        const response = await fetch(`${apiUrl}?action=eliminar&producto_id=${productoId}`, {
            method: "GET",  // Llamada para eliminar el producto
        });
        const result = await response.json();

        if (result.message) {
            alert(result.message);  // Muestra mensaje de éxito
            cargarCarrito(apiUrl);  // Recargar el carrito después de eliminar
        } else {
            alert("Error al eliminar el producto: " + result.error);  // Muestra mensaje de error
        }
    } catch (error) {
        console.error("Error al eliminar producto:", error);
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    alert("Carrito vaciado con éxito.");
    document.getElementById("carrito-container").innerHTML = `<p class="text-center text-gray-600">Tu carrito está vacío.</p>`;
}

// Función para realizar la compra
function realizarCompra() {
    alert("Compra realizada con éxito. ¡Gracias por tu pedido!");
}

// Cargar el carrito desde la API que prefieras cuando la página se carga
window.onload = function () {
    // Llama a la API que quieras usar
    cargarCarrito(API_URL_GUTI);  // Puedes cambiar esto a API_URL_PAL si prefieres usar la otra API
};
