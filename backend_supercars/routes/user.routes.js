const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Middleware para proteger rutas
const { protect, restrictTo } = require('../middlewares/auth.middlware');

// Ruta para registrar un nuevo usuario
router.post('/register', userController.register);

// Ruta para el inicio de sesión
router.post('/login', userController.login);

// Ruta para actualizar el perfil de usuario
// Asegúrate de que solo usuarios logueados puedan acceder a esta ruta
router.patch('/update/:userId', protect, userController.updateProfile);


// // Ruta para actualizar rol del usuario (solo accesible para administradores)
router.patch('/role/:adminId', protect, restrictTo('admin'), userController.updateUserRole);

// Ruta para obtener información personal del usuario
router.get('/my-info/:id', protect, restrictTo('user', 'admin'), userController.getInfoByUser);

// Ruta para eliminar un usuario (solo admin)
router.delete('/delete/:id', protect, restrictTo('admin'), userController.deleteUser);


// Ruta para obtener todos los usuarios (solo admin)
router.get('/all', protect, restrictTo('admin'), userController.getAllUsers);


module.exports = router;