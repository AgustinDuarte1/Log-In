const messageError = document.getElementsByClassName('error')[0]; // Selecciona el primer elemento con la clase 'error'
const mensajeExito = document.getElementsByClassName('exito')[0]; // Selecciona el primer elemento con la clase 'exito'

document.getElementById("register-form").addEventListener("submit",  async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    const usuario = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(usuario, email, password);

    const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuario,
            email,
            password
        })
    });

    if (res.ok) {
        // Mostrar mensaje de éxito
        mensajeExito.classList.remove('oculto');

        // Limpiar los inputs
        document.getElementById('usuario').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';

        // Opcional: ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            mensajeExito.classList.add('oculto');
        }, 3000);
    } else {
        messageError.classList.remove('escondido'); // Mostrar el error si algo salió mal
        return;
    }


    // Si el login fue exitoso, ocultar el mensaje de error:
    messageError.classList.add('escondido'); // <-- Ocultamos el error si todo salió bien
    
    const resJson = await res.json();
    if (resJson.redirect) {
        window.location.href = resJson.redirect; // Redirige al usuario a la página de administración
    }
    
})