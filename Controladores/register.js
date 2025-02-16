document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Mostrar el spinner de carga
    document.getElementById('loading').style.display = 'block';

    // Obtener los valores del formulario
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Limpiar el mensaje de error antes de enviar la solicitud
    document.getElementById('error-message').style.display = 'none';

    try {
        // Enviar la solicitud POST al servidor
        const response = await fetch('http://localhost/APIS/Register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        // Verificar si la respuesta es exitosa
        const data = await response.json();

        // Ocultar el spinner
        document.getElementById('loading').style.display = 'none';

        if (data.success) {
            // Redirigir a la página de login si el registro fue exitoso
            window.location.href = 'loginfeik.html';
        } else {
            // Mostrar mensaje de error si el registro falló
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = 'Error en el registro: ' + data.message;
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        // En caso de error en la solicitud, ocultar el spinner y mostrar el error
        document.getElementById('loading').style.display = 'none';
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Hubo un error en la solicitud. Intenta nuevamente.';
        errorMessage.style.display = 'block';
    }
});
