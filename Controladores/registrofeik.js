document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const profilePhoto = document.getElementById('profilePhoto').value;

    // Validación de URL para la foto de perfil
    if (!profilePhoto.startsWith('http')) {
        alert('Por favor, ingresa una URL válida para la foto de perfil.');
        return;
    }

    try {
        // Realizar la solicitud POST para registrar al usuario
        const response = await fetch('http://localhost/Apis/Register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, profile_photo: profilePhoto }),
        });

        const data = await response.json();

        // Comprobar la respuesta del servidor
        if (data.success) {
            alert('Usuario registrado con éxito.');

            // Redirigir al login después de un registro exitoso
            window.location.href = 'loginfeik.html'; // Cambia la ruta según lo necesites
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        alert('Hubo un problema al intentar registrarte.');
    }
});
