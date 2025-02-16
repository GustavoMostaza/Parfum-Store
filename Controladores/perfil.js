// Redirigir al perfil cuando se haga clic en la sección del perfil
document.getElementById('user-profile').addEventListener('click', function() {
    // Mostrar la página del perfil y ocultar la sección inicial
    document.getElementById('user-profile').classList.add('hidden');
    document.getElementById('profile-page').classList.remove('hidden');
    // Llamar a la función para cargar los datos del perfil desde la API
    loadUserProfile();
});

// Función para cerrar sesión (simulación)
function logout() {
    alert('Sesión cerrada');
    window.location.href = 'login.html';  // Redirige a la página de login
}

// Cargar los datos del perfil desde la API
function loadUserProfile() {
    // Obtén el nombre de usuario que debe estar en la sesión actual o almacenado
    let username = "usuario"; // Reemplaza esto con el nombre de usuario real de la sesión

    fetch(`http://localhost/get_profile?username=${username}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Actualiza el perfil con los datos obtenidos
                document.getElementById('profile-username').textContent = data.username;
                document.getElementById('profile-email').textContent = data.email;
                document.getElementById('profile-page-photo').src = data.profile_photo || '../Roots/default_profile.jpeg';
                
                // Actualiza la sección del perfil (icono en la esquina)
                document.getElementById('username').textContent = data.username;
                document.getElementById('profile-photo').src = data.profile_photo || '../Roots/default_profile.jpeg';
            } else {
                alert('Error al cargar el perfil: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error al cargar el perfil:', error);
        });
}

// Simulación de carga de datos inicial (por ejemplo, después de login)
window.onload = function() {
    loadUserProfile();
}
