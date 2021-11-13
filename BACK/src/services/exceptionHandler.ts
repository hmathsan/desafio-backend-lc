import { Request, Response, NextFunction } from "express";

import { CardNaoEncontrado, ErrorResponse, ValidationException, LoginInvalido, ValidationErrorResponse } from "../model";

export function exceptionHandler(err: any, _req: Request, res: Response, next: NextFunction) {
    let response: ErrorResponse;

    if(err instanceof LoginInvalido) {
        response = {message: err.message}
        return res.status(403).json(response)
    }
    if(err instanceof CardNaoEncontrado) {
        response = {message: err.message}
        return res.status(404).json(response)
    }
    if(err instanceof ValidationException) {
        const validationErrorResponse: ValidationErrorResponse = {message: err.message, fields: err.fields}
        res.status(400).json(validationErrorResponse)
    }
    
    response = {message: "Erro desconhecido: " + err}
    res.status(500).json(response)
}

export default exceptionHandler