const API_URL_PAL = "http://localhost/Apis/palcarrito.php"; // URL de la API palcarrito.php

// Función para procesar el pago y guardar la compra
async function procesarPago(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    const nombre = document.getElementById("nombre").value;
    const numeroTarjeta = document.getElementById("numero-tarjeta").value;
    const fechaExpiracion = document.getElementById("fecha-expiracion").value;
    const cvv = document.getElementById("cvv").value;

    // Obtener los productos del carrito
    const carritoResponse = await fetch(`${API_URL_PAL}?action=ver`);
    const carrito = await carritoResponse.json();

    // Crear el array de productos para la compra
    const productos = carrito.map(producto => ({
        id: producto.producto_id,
        cantidad: producto.cantidad,
        precio: producto.precio
    }));

    // Datos de la compra a enviar a la API
    const compraData = {
        user_id: 1,  // Aquí puedes poner el ID del usuario según sea necesario
        nombre_titular: nombre,
        numero_tarjeta: numeroTarjeta,
        fecha_expiracion: fechaExpiracion,
        cvv: cvv,
        productos: productos
    };

    try {
        // Enviar los datos a la API para guardar la compra
        const response = await fetch(API_URL_PAL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(compraData),
        });

        const result = await response.json();

        if (result.status === "success") {
            alert("Compra realizada con éxito. ID de compra: " + result.compra_id);
            vaciarCarrito();  // Vaciar el carrito después de realizar la compra
        } else {
            alert("Error al procesar la compra: " + result.message);
        }
    } catch (error) {
        console.error("Error al procesar el pago:", error);
        alert("Hubo un error al realizar la compra.");
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    alert("Carrito vaciado con éxito.");
    document.getElementById("carrito-container").innerHTML = `<p class="text-center text-gray-600">Tu carrito está vacío.</p>`;
}

// Función para mostrar el modal de pago
function mostrarModal() {
    document.getElementById("modal").classList.remove("hidden");
}

// Función para cerrar el modal de pago
function cerrarModal() {
    document.getElementById("modal").classList.add("hidden");
}

// Asignar el evento de envío del formulario
document.getElementById("form-pago").addEventListener("submit", procesarPago);
