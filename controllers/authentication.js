import bcryptjs from 'bcryptjs'; // Importa bcryptjs para el hash de contraseñas
import jsonwebtoken from 'jsonwebtoken'; // Importa jsonwebtoken para la creación de tokens JWT
import dotenv from 'dotenv'; // Importa dotenv para manejar variables de entorno

dotenv.config();


export const usuarios = []; // Array para almacenar los usuarios registrados

 async function  login(req, res) {
    console.log(req.body);
    const password = req.body.password;
    const usuario = req.body.usuario;
    if (!usuario || !password){
        return res.status(400).json({ message: 'Por favor, completa todos los campos.' }); // Responde con un error si algún campo está vacío
    }

    const usuarioaRevisar = usuarios.find(usuarios => usuarios.usuario === usuario); // Busca si el usuario existe
    if (!usuarioaRevisar) {
        return res.status(400).json({ message: 'Error durante el login' }); // Responde con un error si el usuario no existe
    }

    const passwordCorrecta = await bcryptjs.compare(password, usuarioaRevisar.password); // Compara la contraseña ingresada con la almacenada
    if (!passwordCorrecta) {
        return res.status(400).json({ message: 'Error durante el login' }); // Responde con un error si la contraseña no coincide
    }
    const token = jsonwebtoken.sign({ usuario: usuarioaRevisar.usuario}, 
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES_IN} // Crea un token JWT con el usuario y la clave secreta); 
    );
    
    const cookieOptions = {
        expires: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        path: '/',
    }
    res.cookie('jwt', token, cookieOptions); // Establece la cookie con el token JWT
    res.send({status:"ok", message:"Login correcto", redirect: '/admin'}); // Responde con un mensaje de éxito y redirige al usuario a la página de administración
 }

 async function register(req, res) {
    console.log(req.body); // Muestra el cuerpo de la solicitud en la consola
    const usuario = req.body.usuario;
    const email = req.body.email;
    const password = req.body.password;
    if (!usuario || !email || !password) {
        messageError.textContent = 'Por favor, completa todos los campos.';
        messageError.classList.remove('escondido');
        return; // Detiene la ejecución si algún campo está vacío
    }

    const usuarioaRevisar = usuarios.find(usuarios => usuarios.usuario === usuario); // Busca si el usuario ya existe
    if (usuarioaRevisar) {
        return res.status(400).json({ message: 'El usuario ya existe' }); // Responde con un error si el usuario ya existe
    }

    if (typeof password !== 'string'){
       return res.status(400).json({ message: 'La contraseña debe ser un texto' }); 
    }

    const salt = await bcryptjs.genSalt(5); // Genera un salt para el hash
    const hashPassword = await bcryptjs.hash(password, salt); // Hashea la contraseña
    const nuevoUsuario = {
      usuario, email, password: hashPassword 
    }
    usuarios.push(nuevoUsuario);
    console.log(usuarios); // Muestra el array de usuarios en la consola
    res.status(201).json({ message: 'Usuario registrado' }); // Responde con un mensaje de éxito
}

export const methods = {
    login,
    register
}
 
