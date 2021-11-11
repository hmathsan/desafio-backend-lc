import { v4 as uuid } from 'uuid'
import { Request, Response } from "express";
import { getAllCards, createCard, ICardPayload } from '../repositories'

export type CardsResponse = {
    id: string,
    titulo: string,
    conteudo: string,
    lista: string
}

export default class CardsController {
    public async getCards(): Promise<Array<CardsResponse>> {
        return await getAllCards();
    }

    public async createNewCard(body: ICardPayload): Promise<CardsResponse> {
        return await createCard(body);
    }

    public async updateCard(_id: string): Promise<CardsResponse> {
        return { id: "", titulo: "", conteudo: "", lista: "" }
    }

    public async deleteCard(_id: string) {
        
    }
}