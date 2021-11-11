import { v4 as uuid } from 'uuid'
import { Request, Response } from "express";

export type CardsResponse = {
    id: string,
    titulo: string,
    conteudo: string,
    lista: string
}

export default class CardsController {
    public async getCards(): Promise<Array<CardsResponse>> {
        return [{ id: uuid(), titulo: "titulo", conteudo: "conteudo", lista: "ToDo"}]
    }
}