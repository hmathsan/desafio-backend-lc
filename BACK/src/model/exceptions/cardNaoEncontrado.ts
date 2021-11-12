export class CardNaoEncontrado extends Error {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, CardNaoEncontrado.prototype);
    }
}

export default CardNaoEncontrado