import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from "express";

import { ValidationException } from '../model/exceptions'
import { Field } from '../model';

export function validateInput<_T>(type: any): RequestHandler {
    return (req, _res, next) => {
        const body = plainToClass(type, req.body);
        validate(body)
            .then((errors: ValidationError[]) => {
                if(errors.length > 0) {
                    const errorMap = errors.map((error: ValidationError) => new Field(error.property, error.constraints!))
                    next(new ValidationException("Os seguintes campos não foram informados corretamente", errorMap));
                } else {
                    next();
                }
            })
    }
}