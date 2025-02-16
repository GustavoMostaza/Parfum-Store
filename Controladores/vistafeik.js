document.addEventListener('DOMContentLoaded', async () => {
    const userInfoDiv = document.getElementById('userInfo');
    const logoutButton = document.getElementById('logoutButton');

    // Obtener el token de sesión almacenado
    const sessionToken = localStorage.getItem('session_token');

    if (!sessionToken) {
        alert('No has iniciado sesión. Redirigiendo al login...');
        window.location.href = 'login.html';
        return;
    }

    try {
        // Solicitar datos del usuario
        const response = await fetch('http://localhost/Apis/getUserInfo.php', {
            method: 'GET',
            headers: {
                'Authorization': sessionToken,
            },
        });

        if (!response.ok) {
            console.error('Error en la respuesta del servidor:', response.status, response.statusText);
            alert('Hubo un problema al conectarse al servidor. Por favor, intenta nuevamente.');
            return;
        }

        const data = await response.json();

        if (data.success) {
            // Mostrar la información del usuario
            const { username, email, profile_photo } = data.user;
            userInfoDiv.innerHTML = `
                <p><strong>Nombre:</strong> ${username}</p>
                <p><strong>Correo electrónico:</strong> ${email}</p>
                <figure class="image is-128x128">
                    <img src="${profile_photo}" alt="Foto de perfil">
                </figure>
            `;
        } else {
            console.error('El servidor devolvió un error:', data.message);
            alert('No se pudo obtener la información del usuario. Redirigiendo al login...');
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        alert('Error inesperado al conectar con el servidor. Por favor, intenta más tarde.');
    }

    // Manejar el cierre de sesión
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('session_token'); // Eliminar el token
        alert('Has cerrado sesión.');
        window.location.href = 'loginfeik.html';
    });
});
