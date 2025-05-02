import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import {usuarios} from '../controllers/authentication.js';

dotenv.config();

function soloAdmin(req, res, next){
 const logueado = revisarCookie(req); // Revisa si el usuario está logueado
 if (logueado) return next(); // Si está logueado, continúa con la siguiente función
 return res.redirect('/'); // Si no está logueado, redirige a la página de inicio
}

function soloPublic(req, res, next){
    const logueado = revisarCookie(req); 
 if (!logueado) return next(); 
 return res.redirect('/admin'); 
}

function revisarCookie(req){
    try{
    const cookieJWT = req.headers.cookie.split('; ').find(c => c.startsWith('jwt=')).slice(4); // Obtiene el token JWT de la cookie
    const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    console.log(decodificada); // Muestra el token decodificado en la consola
  
    const usuarioaRevisar = usuarios.find(usuarios => usuarios.usuario === decodificada.usuario); 
    console.log(usuarioaRevisar); // Muestra el usuario a revisar en la consola
    if (!usuarioaRevisar) {
    return false
    }
    return true
    }catch (error) {
        return false; // Si hay un error, devuelve false
    }
}

export const methods = {
    soloAdmin,
    soloPublic
}
 