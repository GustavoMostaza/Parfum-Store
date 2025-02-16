document.addEventListener('DOMContentLoaded', async () => {
    const userInfoDiv = document.getElementById('userInfo');
    const editButton = document.getElementById('editButton');
    const editForm = document.getElementById('editForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const profilePhotoInput = document.getElementById('profilePhoto');
    const saveChangesButton = document.getElementById('saveChanges');

    // Obtener el token de sesión almacenado
    const sessionToken = localStorage.getItem('session_token');

    if (!sessionToken) {
        alert('No has iniciado sesión. Redirigiendo al login...');
        window.location.href = 'loginfeik.html';
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

            // Pre-cargar los datos en el formulario de edición
            usernameInput.value = username;
            emailInput.value = email;
            profilePhotoInput.value = profile_photo;

        } else {
            console.error('Error al obtener los datos del usuario:', data.message);
            alert('No se pudo obtener la información del usuario.');
        }
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        alert('Error inesperado al conectar con el servidor.');
    }

    // Mostrar el formulario de edición de perfil
    editButton.addEventListener('click', () => {
        editForm.style.display = 'block';
    });

    // Guardar los cambios
    saveChangesButton.addEventListener('click', async () => {
        const newUsername = usernameInput.value.trim();
        const newEmail = emailInput.value.trim();
        const newProfilePhoto = profilePhotoInput.value.trim();

        if (newUsername === '' || newEmail === '') {
            alert('Todos los campos son obligatorios.');
            return;
        }

        try {
            // Enviar los nuevos datos al servidor
            const updateResponse = await fetch('http://localhost/Apis/updateUser.php', {
                method: 'POST',
                headers: {
                    'Authorization': sessionToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: newUsername,
                    email: newEmail,
                    profile_photo: newProfilePhoto
                }),
            });

            const updateData = await updateResponse.json();

            if (updateData.success) {
                alert('Datos actualizados correctamente');
                location.reload(); // Recargar la página para mostrar los cambios
            } else {
                alert('Error al actualizar los datos: ' + updateData.message);
            }
        } catch (error) {
            console.error('Error al enviar los nuevos datos:', error);
            alert('Hubo un problema al actualizar los datos. Intenta nuevamente.');
        }
    });
});
