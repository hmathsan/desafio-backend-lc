import express from 'express';
import { LoginInvalido, ErrorResponse } from '../model';
import LoginController from './loginController'
import {authenticate} from '../services'
import CardsController from './cardsController';

const router = express.Router();

router.post('/login', async (req, res) => {
    const controller = new LoginController();
    try {
        const response = await controller.login(req.body);
        return res.json(response);
    } catch(e) {
        if (e instanceof LoginInvalido) {
            const response: ErrorResponse = {message: e.message}
            res.status(403).json(response)
        }
        
        const response: ErrorResponse = {message: "Erro desconhecido: " + e}
        res.status(500).json(response)
    }
})

router.get('/cards', authenticate, async (req, res) => {
    const controller = new CardsController();
    try {
        const response = await controller.getCards();
        return res.json(response)
    } catch(e) {
        res.status(500).json(e)
    }
})

export default router;