document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost/Apis/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
        // Guardar el token en el almacenamiento local
        localStorage.setItem('session_token', data.session_token);

        // Redirigir a la página de inicio
        alert('Inicio de sesión exitoso. Redirigiendo...');
        window.location.href = 'inicio.html';
    } else {
        alert('Error en el inicio de sesión: ' + data.message);
    }
});
//aqui es pa la vista feik