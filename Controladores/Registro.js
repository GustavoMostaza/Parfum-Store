function toggleForms() {
    document.getElementById('registerForm').classList.toggle('hidden');
    document.getElementById('loginForm').classList.toggle('hidden');
}



function registerUser() {
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const profilePhoto = document.getElementById('registerPhoto').files[0];

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (profilePhoto) formData.append('profile_photo', profilePhoto);

    fetch('http://localhost/Apis/Register.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            // Si el registro es exitoso, redirige al perfil
            localStorage.setItem("usuarioId", data.userId);  // Asegúrate de que el servidor devuelva el ID del usuario
            window.location.href = "../VIstas/vistafeik.html";  // Redirige a la página de perfil
        }
    })
    .catch(error => {
        alert('Hubo un error al enviar los datos: ' + error.message);
    });
}


























function loginUser() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    fetch("http://localhost/Apis/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        // Verifica si la respuesta es válida JSON
        return response.text().then(text => {
            console.log("Respuesta cruda del servidor:", text); // Imprimir la respuesta cruda
            try {
                return JSON.parse(text); // Intentar convertir la respuesta a JSON
            } catch (e) {
                console.error("Error al analizar el JSON:", e);
                throw new Error('Respuesta no es JSON válida');
            }
        });
    })
    .then(data => {
        if (data.success) {
            alert("Login exitoso");
            localStorage.setItem("usuarioId", data.userId);
            window.location.href = "Inicio.html";
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        alert("Hubo un error en el login: " + error.message);
    });
}


 
function logout() {
    alert("Sesión cerrada");
    localStorage.clear();
    window.location.href = "Inicio.html";
}

async function verificarSesion() {
    const usuarioId = localStorage.getItem("usuarioId");

    if (!usuarioId) {
        window.location.href = "Carrito.html";
    } else {
        try {
            const response = await fetch(`http://localhost/Apis/get_profile.php?usuarioId=${usuarioId}`);
            if (!response.ok) {
                throw new Error(`Error en la respuesta del servidor: ${response.status}`);
            }
            const data = await response.json();

            if (data.success) {
                document.getElementById("perfil-link").textContent = `Hola, ${data.username}`;
                cargarCarrito(usuarioId);
                actualizarCarrito();
            } else {
                localStorage.removeItem("usuarioId");
                alert("Tu sesión ha expirado. Por favor, inicia sesión de nuevo.");
                window.location.href = "Carrito.html";
            }
        } catch (error) {
            console.error("Error al verificar sesión:", error);
        }
    }
}
