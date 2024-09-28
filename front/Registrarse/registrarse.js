let personas = []
const token = localStorage.getItem('jwt');

function validarUsername(){
    //Obtención de elementos del formulario
    const errorusername = document.getElementById("errorusername");
    const inputusername = document.getElementById("username");

    //Verificar minimo y maximo de username
    if ((username.length < 3)){
        inputusername.style.borderColor = 'red';
        inputusername.style.borderWidth = '1.5px';
        if(username.length == 0){
            errorusername.textContent = "El campo 'username' es obligatorio.";
        }
        else{
            errorusername.textContent = "El username es muy corto.";
        }
        return false;
    }
    if ((username.length > 30)){
        inputusername.style.borderColor = 'red';
        inputusername.style.borderWidth = '1.5px';
        errorusername.textContent = "El 'username' excede el límite de carácteres.";
        return false;
    }

    // Si todas las verificaciones anteriores se pasan, el username es válido.
    inputusername.style.borderColor = 'green';
    inputusername.style.borderWidth = '2px';
    errorusername.textContent = "";
    return true;
}

function validarIsAdmin(){
    //Obtención de elementos del formulario
    const errorusername = document.getElementById("errorAdmin");
    const inputusername = document.getElementById("isAdmin");

    //Verificar minimo y maximo de username
    if ((username.value !== "si" || "no" || "SI" || "NO")){
        inputusername.style.borderColor = 'red';
        inputusername.style.borderWidth = '1.5px';
        if(username.length == 0){
            errorusername.textContent = "El campo 'Elegir tipo de usuario' es obligatorio.";
        }
        return false;
    }

    // Si todas las verificaciones anteriores se pasan, el username es válido.
    inputusername.style.borderColor = 'green';
    inputusername.style.borderWidth = '2px';
    errorusername.textContent = "";
    return true;
}

function validarMail(mail){
    //Obtención de elementos del formulario
    const errorMail = document.getElementById("errorMail");
    const inputMail = document.getElementById("email");

    //Expresión regular de un correo xxxx@xxxx.xx
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    //Chequear si el correo es válido
    if(!emailRegex.test(mail)){
        inputMail.style.borderColor = 'red';
        inputMail.style.borderWidth = '1.5px';
        errorMail.textContent = "El correo electrónico que ingresó no es válido.";
        return false;
    }

    //Chequear que el correo no esta registrado
    const existe = correos.some(usuario => usuario.email === mail);

    if (existe) {
        inputMail.style.borderColor = 'red';
        inputMail.style.borderWidth = '1.5px';
        errorMail.textContent = "El correo ya está registrado.";
        return false;
    }

    // Si las verificación anterior pasa, el correo es válido.
    inputMail.style.borderColor = 'green';
    inputMail.style.borderWidth = '2px';
    errorMail.textContent = "";
    return true;
}


function validarcontrasena(contrasena) {
    //Obtención de elementos del formulario
    const errorContrasena = document.getElementById("errorContrasena");
    const inputContrasena = document.getElementById("contrasena");
    const requerimientos = document.getElementById("requerimientosContrasena");

    //String con los errores
    let errores = "";

    // Verificar si la contraseña tiene más de 8 caracteres
    if (contrasena.length < 8 || contrasena.length > 12) {
        errores += "Su contraseña debe tener entre 8 y 12 dígitos.<br>";
    }

    // Verificar si contiene al menos una letra mayúscula
    if (!/[A-Z]/.test(contrasena)) {
        errores += "Su contraseña debe tener al menos una letra mayúscula.<br>";
    }

    // Verificar si contiene al menos una letra minúscula
    if (!/[a-z]/.test(contrasena)) {
        errores += "Su contraseña debe tener al menos una letra minúscula.<br>";
    }

    // Verificar si contiene al menos un número
    if (!/[0-9]/.test(contrasena)) {
        errores += "Su contraseña debe tener al menos un número.<br>";
    }

    // Verificar si contiene caracteres especiales
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(contrasena)) {
        errores += "Su contraseña debe tener al menos un caracter especial.<br>";
    }

    //Mostrar los errores si hay
    if(errores.length > 0){
        inputContrasena.style.borderColor = 'red';
        inputContrasena.style.borderWidth = '1.5px';
        errorContrasena.innerHTML = errores;
        requerimientos.style.display = "none";
        return false;
    } else{
        // Si pasa todas las verificaciones, la contraseña es válida
        inputContrasena.style.borderColor = 'green';
        inputContrasena.style.borderWidth = '2px';
        errorContrasena.textContent = "";
        return true;
    }    
}

class Usuario {
    constructor(username, email, contrasena, is_admin) {
        this.username = username;
        this.email = email;
        this.contrasena = contrasena;
        this.is_admin = is_admin;
    }

    imprimirinfo() {
        return `username: ${this.username} \nEmail: ${this.email}\ncontrasena: ${this.contrasena}\nis_admin: ${this.is_admin}`;
    }
}

function registrar(){
    const errorRegistrar = document.getElementById("errorBotonRegistro");

    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const contrasena = document.getElementById("contrasena");
    const is_admin = document.getElementById("is_admin");

    if (validarUsername(username.value) && validarMail(email.value) && validarcontrasena(contrasena.value) && validar_isAdmin(is_admin.value))
    {   
        if (is_admin.value === "si" || "SI")
        {
            is_admin.value === true;
        }
        else {
            is_admin.value === false;
        }

        const perfilCreado = new Usuario(username.value, email.value, contrasena.value, is_admin.value)
        return perfilCreado;
    }
    errorRegistrar.style.color = "red";
    errorRegistrar.textContent = "Error. Faltan rellenar campos de manera correcta.";
    return false;
}

async function altaUsuario(nuevoUsuario) {
    const errorRegistrar = document.getElementById("errorBotonRegistro");
    try {
        const responseAlta = await fetch("/back/usuarios", {
            method: "POST",
            body: JSON.stringify(nuevoUsuario),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Verificación de la respuesta
        if (!responseAlta.ok) {
            throw new Error(`Error: ${responseAlta.status} ${responseAlta.statusText}`);
        }

        // Mensaje de éxito y redirección
        errorRegistrar.style.color = "green";
        errorRegistrar.innerHTML = "Se ha registrado correctamente.<br> Redirigiendo al login...";
        setTimeout(function() {
            window.location.href = '../index.html';
        }, 2000);
    } catch (error) {
        console.error('Error:', error);
        errorRegistrar.style.color = "red";
        errorRegistrar.textContent = "Ha surgido un error intentando registrar a esta usuario. Intentelo de nuevo más tarde.";
    }
}


////////////////////////////// EVENTOS //////////////////////////////////////////////////////////////////////////////////////////

//Agregar evento al apretar el boton registrarse
document.getElementById("botonRegistro").addEventListener("click", function() {
    if (registrar()){
        //Hacer POST
        altaUsuario(registrar());      
    }
});

//Agregar evento al apretar el boton volver
document.getElementById("menu").addEventListener("click", function() {
    const fromPage = localStorage.getItem('fromPage');
    console.log(fromPage);
    window.location.href = '../index.html';
});


//Agregar eventos al sacar el foco de un campo
function agregarEventoBlur(idCampo, funcionValidacion) {
    const input = document.getElementById(idCampo);
    input.addEventListener('blur', function() {
        funcionValidacion(input.value);
    });
}

agregarEventoBlur('username', validarUsername);
agregarEventoBlur('email', validarMail);
agregarEventoBlur('contraseña', validarcontrasena);
agregarEventoBlur('is_admin', validarIsAdmin);

document.getElementById('togglePassword').addEventListener('click', function () {
    const campoContrasena = document.getElementById('password');
    const botonMostrarOcultar = document.getElementById('togglePassword');
    
    // Alternar entre el tipo 'password' y 'text'
    if (campoContrasena.type === 'password') {
        campoContrasena.type = 'text';
    } else {
        campoContrasena.type = 'password';
    }
});

document.getElementById('togglerepPassword').addEventListener('click', function () {
    const campoContrasena = document.getElementById('repetirPassword');
    const botonMostrarOcultar = document.getElementById('togglerepPassword');
    
    // Alternar entre el tipo 'password' y 'text'
    if (campoContrasena.type === 'password') {
        campoContrasena.type = 'text';
    } else {
        campoContrasena.type = 'password';
    }
});

// Ejecuta la función al cargar la página
window.onload = adjustPlaceholder;

// Ejecuta la función cada vez que se cambia el tamaño de la ventana
window.onresize = adjustPlaceholder;