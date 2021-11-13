import { Route, Post, Response, Body } from 'tsoa';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { LoginRequest, LoginInvalido, LoginResponse, ErrorResponse } from "../model";

dotenv.config();

const LOGIN = process.env.DEFAULT_LOGIN
const SENHA = process.env.DEFAULT_SENHA

const TOKEN_TEMPO = process.env.TOKEN_TEMPO || '30000'
const SECRET = process.env.JWT_SECRET

@Route("login")
export class LoginController {
    @Post()
    @Response<ErrorResponse>(403, 'Forbidden')
    public async login(@Body() loginReq: LoginRequest): Promise<LoginResponse> {
        if(loginReq.login == LOGIN && loginReq.senha == SENHA) {
            const token = jwt.sign(loginReq, SECRET!, { expiresIn: TOKEN_TEMPO });
            const expiresIn = new Date(Date.now() + Number(TOKEN_TEMPO))

            return {
                token: token,
                expiresIn: expiresIn.toUTCString()
            };
        } else {
            throw new LoginInvalido("Login '" + loginReq.login + "' não encontrado, ou a senha está incorreta.");
        }
    }
}

export default LoginController