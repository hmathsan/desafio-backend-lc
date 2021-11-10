import express from 'express';
import { LoginInvalido, ErrorResponse } from '../model';
import LoginController from './login'

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

export default router;