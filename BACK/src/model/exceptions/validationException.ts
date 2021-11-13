import { Field } from "..";

export class ValidationException extends Error {
    message: string;
    fields: Field[];
    constructor(msg: string, fields: Field[]) {
        super(msg);
        this.message = msg;
        this.fields = fields;

        Object.setPrototypeOf(this, ValidationException.prototype);
    }
}

export default ValidationException