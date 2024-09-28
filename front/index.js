window.addEventListener('DOMContentLoaded', (event) => {
    localStorage.removeItem('fromPage'); 
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();  // Evita el comportamiento predeterminado del formulario.

        // Obtener los valores de email y contraseña
        const username = document.getElementById('usuario').value;
        const contraseña = document.getElementById('contraseña').value;

        try {
            const response = await fetch('http://localhost/back/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    contraseña: contraseña,
                }),
            });

            // Limpiar cualquier mensaje de error anterior
            errorMessage.style.display = 'none';

            // Si la respuesta no es exitosa
            if (!response.ok) {
                if (response.status === 401 || response.status === 404) {  // Contraseña incorrecta o email no encontrado
                    errorMessage.textContent = 'El email o la contraseña son incorrectos.';
                    errorMessage.style.display = 'block';  // Mostrar el mensaje de error
                } else {
                    throw new Error('Error en la autenticación');
                }
                return;
            }

            // Autenticación exitosa: procesar la respuesta y redirigir
            const data = await response.json();
            const token = data.token;
            const admin = data.isAdmin;

            // Almacenar el token en localStorage o sessionStorage
            localStorage.setItem('jwt', token);
            localStorage.setItem('verifyAdmin', admin) //Nose si esta bien (estoy perdido con el tema de la autenticacion de si es admin o no)

            // Redirigir a la página principal
            window.location.href = 'MenuPrincipal/menuPrincipal.html';
        } catch (error) {
            // Mostrar cualquier error inesperado
            console.error('Error durante la autenticación:', error);
            errorMessage.textContent = 'Hubo un problema con la autenticación. Por favor, intenta de nuevo.';
            errorMessage.style.display = 'block';  // Mostrar el mensaje de error
        }
    });
});

document.getElementById("registrarse").addEventListener("click", function() {
    window.location.href = 'Registrarse/registrarse.html';
});

            
    