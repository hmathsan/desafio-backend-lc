import express from 'express';

import { LoginInvalido, ErrorResponse, CardNaoEncontrado } from '../model';
import { LoginController, CardsController } from '../controllers'
import {authenticate} from '../services'

export const router = express.Router();

router.post('/login', async (req, res, next) => {
    try {
        const controller = new LoginController();
        const response = await controller.login(req.body);
        return res.json(response);    
    }catch(err) {
        next(err)
    }
})

router.get('/cards', authenticate, async (_req, res, next) => {
    const controller = new CardsController();
    try {
        const response = await controller.getCards();
        return res.json(response)
    } catch(err) {
        next(err)
    }
})

//TODO: Validação dos campos de entrada
router.post('/cards', authenticate, async (req, res, next) => {
    const controller = new CardsController();
    try {
        const response = await controller.createNewCard(req.body);
        return res.status(201).location('/cards/' + response.id).json(response)
    } catch (err) {
        next(err)
    }
})

router.put('/cards/:cardId', authenticate, async (req, res, next) => {
    const controller = new CardsController();
    try {
        const response = await controller.updateCard(req.params.cardId, req.body)
        return res.json(response)
    } catch (err) {
        console.log(err)
        next(err)
    }
})

router.delete('/cards/:cardId', authenticate, async (req, res, next) => {
    const controller = new CardsController();
    try {
        const response = await controller.deleteCard(req.params.cardId);
        return res.json(response);
    }catch (err) {
        next(err)
    }
})

export default router;