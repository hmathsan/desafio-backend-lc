import { getRepository } from "typeorm";
import { v4 as uuid} from 'uuid';

import { Card, CardNaoEncontrado, CardRequest } from "../model";

export const getAllCards = async (): Promise<Array<Card>> => {
    const cardRepository = getRepository(Card);
    return await cardRepository.find();
}

export const getCardById = async (id: string): Promise<Card> => {
    const cardRepository = getRepository(Card);
    const card = await cardRepository.findOne(id);
    if(card) {
        return card!;
    } else {
        throw new CardNaoEncontrado("Card de id " + id + " não encontrado.");
    }
}

export const createCard = async (payload: CardRequest): Promise<Card> => {
    const cardRepository = getRepository(Card);
    const card = new Card(
        uuid(),
        payload.titulo,
        payload.conteudo,
        payload.lista
    );
    return await cardRepository.save({ ...card });
}

export const updateCardById = async (card: Card): Promise<Card> => {
    const cardRepository = getRepository(Card);
    const cardById = await cardRepository.findOne(card.id);
    if(cardById) {
        return cardRepository.save({ ...card });
    } else {
        throw new CardNaoEncontrado("Card de id " + card.id + " não encontrado.");
    }
}

export const deleteCard = async (id: string): Promise<Array<Card>> => {
    const cardRepository = getRepository(Card);
    const cardById = await cardRepository.findOne(id);
    if (cardById) {
        await cardRepository.delete(id);
        return await cardRepository.find()
    } else {
        throw new CardNaoEncontrado("Card de id " + id + " não encontrado.")
    }
}