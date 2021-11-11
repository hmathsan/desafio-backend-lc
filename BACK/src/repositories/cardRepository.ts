import { getRepository } from "typeorm";
import { Card } from "../model";
import { v4 as uuid} from 'uuid';

export interface ICardPayload {
    titulo: string,
    conteudo: string,
    lista: string
}

export const getAllCards = async (): Promise<Array<Card>> => {
    const cardRepository = getRepository(Card);
    return cardRepository.find();
}

export const createCard = async (payload: ICardPayload): Promise<Card> => {
    const cardRepository = getRepository(Card);
    const card = new Card(
        uuid(),
        payload.titulo,
        payload.conteudo,
        payload.lista
    );
    return cardRepository.save({ ...card });
}

export const updateCard = async (card: Card): Promise<Card> => {
    const cardRepository = getRepository(Card);
    return cardRepository.save({ ...card });
}

export const deleteCard = async (card: Card) => {
    const cardRepository = getRepository(Card);
    cardRepository.delete(card);
}