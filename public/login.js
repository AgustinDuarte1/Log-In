const messageError = document.getElementsByClassName('error')[0]; // Selecciona el primer elemento con la clase 'error'

document.getElementById("login").addEventListener("submit", async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    console.log(usuario, password);

    const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuario,
            password
        })
    });

    if (!res.ok){
        // Mostrar mensaje de éxito
        messageError.classList.remove('escondido');

        // Limpiar los inputs
        document.getElementById('usuario').value = '';
        document.getElementById('password').value = '';

        // Opcional: ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            messageError.classList.add('escondido');
        }, 1500);
        return ;
    } 
    
    const resJson = await res.json();
    if (resJson.redirect) {
        window.location.href = resJson.redirect; // Redirige al usuario a la página de administración
    }
})

