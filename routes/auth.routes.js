import Router from 'express'
import usersController from '../controllers/users-controller.js'
import {body} from 'express-validator'

const router = Router();

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    usersController.register
)
router.post('/login', usersController.login)
router.post('/logout', usersController.logout)
router.get('/activate/:link', usersController.activate)
router.get('/refresh', usersController.refresh)
router.get('/users', usersController.getUsers)

export default router