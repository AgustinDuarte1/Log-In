import express from 'express';
import bcryptjs from 'bcryptjs';
import cookieParser from 'cookie-parser';

//Fix para __dirname 
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authentication } from './controllers/authentication.js'; 
import { methods as authorization } from './middlewares/authorization.js';


// server
const app = express();
app.use(express.json()); // Middleware para parsear el cuerpo de la solicitud como JSON
app.set('port',4000);
app.listen(app.get('port'))
console.log('Servidor corriendo en puerto', app.get('port'));


//Config
app.use(express.static(__dirname + '/public'));
app.use(cookieParser()); // Middleware para parsear las cookies

//rutas
app.get('/', authorization.soloPublic,(req, res) => res.sendFile(__dirname + '/pages/index.html'));
app.get('/register', authorization.soloPublic,(req, res) => res.sendFile(__dirname + '/pages/register.html'));
app.get('/admin', authorization.soloAdmin, (req, res) => res.sendFile(__dirname + '/pages/admin/admin.html'));
app.post('/api/register', authentication.register);
app.post('/api/login', authentication.login);

