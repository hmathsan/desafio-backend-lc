import { Request, Response, NextFunction } from "express";

import { CardNaoEncontrado, ErrorResponse, LoginInvalido } from "../model";

export function exceptionHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.log("Exception handler: desconhecido")

    let response: ErrorResponse;

    if(err instanceof LoginInvalido) {
        console.log("instanceof login")
        response = {message: err.message}
        return res.status(403).json(response)
    }
    if(err instanceof CardNaoEncontrado) {
        console.log("instanceof Card")
        response = {message: err.message}
        return res.status(404).json(response)
    }

    //TODO: adicionar tratativa de erro para campos invalidos
    
    console.log(err)
    response = {message: "Erro desconhecido: " + err}
    res.status(500).json(response)
}

export default exceptionHandler