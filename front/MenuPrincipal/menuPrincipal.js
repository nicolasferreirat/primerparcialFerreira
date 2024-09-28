function obtenerTipoUsuarioDesdeToken() {
    const token = localStorage.getItem('jwt');
    
    if (token) {
        const payloadBase64 = token.split('.')[1]; // El payload es la segunda parte del token
        const payloadDecoded = JSON.parse(atob(payloadBase64));
        const idUsuario = payloadDecoded.id;

        return idUsuario;
    } else {
        console.log("No se encontró ningún token en localStorage.");
        return null; 
    }
}

document.getElementById("verTareas").addEventListener('click', function() {
    const IdUsu = obtenerIdUsuarioDesdeToken();
    console.log(IdUsu);
    window.location.href = `../ListadoTareas/listadoTareas.html?id=${IdUsu}`;   
});

document.getElementById("cerrarSesion").addEventListener('click', function() {
    localStorage.removeItem('jwt'); //Eliminar token de sesion
    window.location.href = `../index.html`;   
});