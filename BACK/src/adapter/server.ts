import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import express, { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import swaggerUi from 'swagger-ui-express';
import {Express} from 'express-serve-static-core';
import method_override from 'method-override';
import moment from 'moment';

import { router } from '../controllers'
import { exceptionHandler } from '../services'
import dbConfig from './dbConfig';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

export async function initServer(): Promise<Express> {
    if(JWT_SECRET === undefined || JWT_SECRET === null) {
        throw new Error("O valor do JWT_SECRET está vazio.")
    }

    const server = express();

    server.use(express.urlencoded({extended: false}));
    server.use(express.json());
    server.use(method_override());
    
    server.use(cors())
    
    server.use(express.static("public"));
    
    morgan.token('localDate', () => moment().format('DD/MM/YYYY HH:mm:SS'))
    morgan.token('cardId', (req: Request, _res: Response) => req.url.split('/')[2])
    morgan.token('cardTitulo', (req: Request, _res: Response) => req.body.titulo)
    morgan.token('remAlt', function(req: Request, res: Response) {
        if(req.method == 'PUT') {
            return 'Alterar'
        } else if (req.method == 'DELETE') {
            return 'Remover'
        }

        return ''
    })

    server.use(morgan(
        ':localDate - Card :cardId - :cardTitulo - :remAlt', {
        skip: (req, _res) => !(req.method == 'PUT' || req.method == 'DELETE')
    }));
    
    server.use("/docs", swaggerUi.serve, swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json"
        }
    }))
    
    server.use(router);
    
    createConnection(dbConfig)
    
    server.use(exceptionHandler);

    return server;
}