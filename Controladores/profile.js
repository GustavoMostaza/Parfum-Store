document.addEventListener('DOMContentLoaded', async function() {
    const sessionToken = localStorage.getItem('session_token');

    if (!sessionToken) {
        window.location.href = 'login.html';  // Si no hay token, redirigir al login
        return;
    }

    const response = await fetch('http://localhost/Apis/getprofile2.php', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + sessionToken
        }
    });

    const data = await response.json();

    if (data.success) {
        document.getElementById('username').textContent = data.user.username;
        document.getElementById('email').textContent = data.user.email;
        document.getElementById('profilePhoto').src = data.user.profile_photo || 'default_profile.jpeg';
    } else {
        alert('Error al cargar perfil: ' + data.message);
    }

    document.getElementById('logoutButton').addEventListener('click', function() {
        localStorage.removeItem('session_token');
        window.location.href = 'loginfeik.html';  // Cerrar sesión y redirigir al login
    });
});
