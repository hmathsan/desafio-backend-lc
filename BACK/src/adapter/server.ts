import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import { createConnection } from 'typeorm';
import swaggerUi from 'swagger-ui-express';
import {Express} from 'express-serve-static-core';

import Router from '../controllers/router';
import dbConfig from './dbConfig';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

export async function initServer(): Promise<Express> {
    if(JWT_SECRET === undefined || JWT_SECRET === null) {
        throw new Error("O valor do JWT_SECRET está vazio.")
    }

    const server = express();

    server.use(express.json());
    server.use(express.urlencoded({extended: false}));
    server.use(cors())

    server.use(express.static("public"));

    server.use(morgan('combined'));

    server.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(err.status).json({
            error: {
                message: err.message
            }
        })
    });

    server.use("/docs", swaggerUi.serve, swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json"
        }
    }))

    server.use(Router);

    createConnection(dbConfig)

    return server;
}