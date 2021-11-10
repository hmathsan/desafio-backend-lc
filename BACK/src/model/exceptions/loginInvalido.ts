export class LoginInvalido extends Error {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, LoginInvalido.prototype);
    }
}

export default LoginInvalido