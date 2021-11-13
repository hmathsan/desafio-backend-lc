import express from 'express';

import { LoginInvalido, ErrorResponse, CardNaoEncontrado } from '../model';
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
            return res.status(403).json(response)
        }
        
        const response: ErrorResponse = {message: "Erro desconhecido: " + e}
        res.status(500).json(response)
    }
})

router.get('/cards', authenticate, async (_req, res) => {
    const controller = new CardsController();
    try {
        const response = await controller.getCards();
        return res.json(response)
    } catch(e) {
        const response: ErrorResponse = {message: "Erro desconhecido: " + e}
        res.status(500).json(response)
    }
})

//TODO: Validação dos campos de entrada
router.post('/cards', authenticate, async (req, res) => {
    const controller = new CardsController();
    try {
        const response = await controller.createNewCard(req.body);
        return res.status(201).location('/cards/' + response.id).json(response)
    } catch (e) {
        const response: ErrorResponse = {message: "Erro desconhecido: " + e}
        res.status(500).json(response)
    }
})

router.put('/cards/:cardId', authenticate, async (req, res) => {
    const controller = new CardsController();
    try {
        const response = await controller.updateCard(req.params.cardId, req.body)
        return res.json(response)
    } catch (e) {
        if(e instanceof CardNaoEncontrado) {
            const response: ErrorResponse = {message: e.message}
            return res.status(404).json(response)
        }
        const response: ErrorResponse = {message: "Erro desconhecido: " + e}
        res.status(500).json(response)
    }
})

router.delete('/cards/:cardId', authenticate, async (req, res) => {
    const controller = new CardsController();
    try {
        const response = await controller.deleteCard(req.params.cardId);
        return res.json(response);
    }catch (e) {
        if(e instanceof CardNaoEncontrado) {
            const response: ErrorResponse = {message: e.message}
            return res.status(404).json(response)
        }
        const response: ErrorResponse = {message: "Erro desconhecido: " + e}
        res.status(500).json(response)
    }
})

export default router;