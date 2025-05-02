document.getElementsByTagName('button')[0].addEventListener('click', async (e) => {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Elimina la cookie jwt
    document.location.href = '/'; // Redirige al usuario a la página de inicio
})