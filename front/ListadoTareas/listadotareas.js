function obtenerIdUsuario() {
    const urlParams = new URLSearchParams(window.location.search);
    const idObtenido = urlParams.get('id');
    return idObtenido;
}

const token = localStorage.getItem('jwt');

const IdUsu = obtenerIdUsuario();

async function obtenerTareas() {
    try {
        // Obtención de los datos de la persona mediante promesa
        const promesaResponse = await fetch(`/back/usuarios/${IdUsu}/tareas`, {  //No supe y no me dio el tiempo de obtener el id de tarea
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
        const usuarios = await promesaResponse.json();
        const datos = JSON.stringify(usuarios);

        // Llamada a la función para cargar los datos de la persona
        cargaUsuario(datos);
    } catch (error) {
        console.error('Error al obtener los datos de la persona:', error);
    }
}


function cargaTareas(datos){
    //Obtener el cuerpo de la tabla del usuario
    const cuerpoTablaUsuarios = document.querySelector("#listaUsuarios tbody");
    //Limpiar el contenido
    cuerpoTablaUsuarios.innerHTML = ''; 
    //De string a array
    const tareas = JSON.parse(datos);
    //Creacion de cada fila de la tabla
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${tareas.id_tarea}</td>
        <td>${tareas.nombre}</td>
        <td>${tareas.duracion}</td>
        <td>${tareas.id_usuario}</td>
        <td><button class="boton-comentario" data-id="${tareas.id_tarea}">Ingresar comentario</button></td>
    `;
        cuerpoTablaUsuarios.appendChild(row);


    // Obtener los botones de editar y eliminar para cada fila
    const botonVer = row.querySelector('.boton-comentario');

    // Eventos para los botones de editar y eliminar
    botonVer.addEventListener('click', function() {
        window.location.href = `../TareaAsignada/tareaAsignada.html?idTarea=${tareas.id_tarea}`; //Acá le pasaría el id de la tarea para poder hacer el resto (ingresar comentario con el post, modificar con el get y eliminar con el delete) el comentario en la tarea de ese id.
    });
};

window.onload = obtenerIdUsuario(IdUsu);
