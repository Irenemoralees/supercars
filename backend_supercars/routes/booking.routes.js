const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

// Middleware para proteger rutas
const { protect, restrictTo, restrictToSelf } = require('../middlewares/auth.middlware');

// Ruta para crear una nueva reserva (accesible solo para usuarios autenticados)
router.post('/', protect, bookingController.createBooking);

// Ruta para obtener todas las reservas de un usuario específico (accesible solo para el usuario correspondiente o administradores)
router.get('/user/:userId', protect, restrictToSelf, restrictTo('admin', 'user'), bookingController.getBookingsByUser);

// Ruta para cancelar una reserva (accesible solo para el usuario correspondiente o administradores)
router.delete('/:userId/:id', protect, restrictToSelf, restrictTo('admin', 'user'), bookingController.cancelBooking);

// Ruta para editar una reserva (accesible solo para el usuario correspondiente o administradores)
router.put('/:userId/:id', protect, restrictToSelf, restrictTo('admin', 'user'), bookingController.editBooking);


// Ruta para cancelar una reserva (accesible solo para user o admin
router.delete('/:id', protect, restrictToSelf, restrictTo('admin', 'user'), bookingController.cancelBooking);

// Nueva ruta para obtener todas las reservas (solo admin)
router.get('/', protect, restrictTo('admin'), bookingController.getAllBookings);


module.exports = router;