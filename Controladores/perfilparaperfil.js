window.onload = function () {
    const token = localStorage.getItem("token");
    const usuarioId = localStorage.getItem("usuarioId");

    // Verificar si el token y el usuarioId están presentes
    if (!token || !usuarioId) {
        alert("No se encontró un token de sesión. Por favor, inicia sesión de nuevo.");
        window.location.href = "../VIstas/Registro.html"; // Redirige a la página de login
        return;
    }

    // Cargar información del perfil
    fetch(`http://localhost/Apis/get_profile.php?usuarioId=${usuarioId}`, {
        method: "GET",
        headers: {
            "Authorization": token,
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta del servidor:", data); // Verificar respuesta del servidor
        if (data.success) {
            document.getElementById("profileUsername").textContent = data.username || "Usuario desconocido";
            document.getElementById("profileEmail").textContent = data.email || "Email no disponible";
            document.getElementById("profilePhoto").src = data.profile_photo || "../Roots/default_profile.jpeg";
        } else {
            alert("Error al cargar el perfil: " + data.message);
            window.location.href = "../VIstas/Registro.html";
        }
    })
    .catch(error => {
        console.error("Error al cargar el perfil:", error);
        alert("Hubo un problema al conectarse con el servidor.");
    });

    // Configurar el botón de cierre de sesión
    const logoutButton = document.querySelector("button");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
};

function logout() {
    // Eliminar token y usuarioId del localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioId");
    alert("Sesión cerrada");
    window.location.href = "../VIstas/Registro.html"; // Redirigir al login
}
