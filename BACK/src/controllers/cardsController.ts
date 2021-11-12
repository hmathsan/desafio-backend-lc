import { getAllCards, createCard, updateCardById, deleteCard, ICardPayload } from '../repositories'

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

    public async updateCard(id: string, body: ICardPayload): Promise<CardsResponse> {
        return await updateCardById({id, ...body})
    }

    public async deleteCard(id: string) {
        return await deleteCard(id);
    }
}