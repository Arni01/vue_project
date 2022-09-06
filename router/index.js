const { Router } = require('express');
const userController = require('../controllers/user.controller');

// @ts-ignore
const router = new Router();

// const validation = [
//   check('email', 'Некоректный email').isEmail(),
//   check('password', 'Минимальная длина пароля 6 символов').isLength({
//     min: 6,
//   }),
// ];

// router.post('/registration', userController.registration);
// router.post('/login', userController.login);
// router.post('/logout', userController.logout);
// router.get('/activate/:link', userController.activate);
// router.get('/activate-test/:link', userController.activateTest);
// router.get('/refresh', userController.refresh);
// router.get('/users', userController.getUsers);
router.post('/send', userController.sendMail);

module.exports = router;
