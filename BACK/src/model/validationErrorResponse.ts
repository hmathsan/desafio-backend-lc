export class ValidationErrorResponse {
    message: string;
    fields: Field[];

    constructor(message: string, fields: Field[]) {
        this.message = message;
        this.fields = fields;
    }
}

export class Field {
    field: string;
    constraints: {[type: string]: string;}

    constructor(field: string, constraints: {[type: string]: string;}) {
        this.field = field;
        this.constraints = constraints;
    }
}

export default ValidationErrorResponse