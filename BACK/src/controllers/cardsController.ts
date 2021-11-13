import { getAllCards, createCard, updateCardById, deleteCard } from '../repositories'
import { Route, Post, Get, Put, Path, Delete, Body, SuccessResponse, Response } from 'tsoa';
import { CardRequest, CardResponse, ErrorResponse } from '../model'

@Route('cards')
export class CardsController {
    @Get()
    @SuccessResponse('200')
    public async getCards(): Promise<Array<CardResponse>> {
        return await getAllCards();
    }

    @Post()
    @SuccessResponse('201')
    @Response<ErrorResponse>(400, 'Bad Request')
    public async createNewCard(@Body() body: CardRequest): Promise<CardResponse> {
        return await createCard(body);
    }

    @Put('{cardId}')
    @Response<ErrorResponse>(400, 'Bad Request')
    @Response<ErrorResponse>(404, 'Not Found')
    public async updateCard(@Path('cardId') id: string, @Body() body: CardRequest): Promise<CardResponse> {
        return await updateCardById({id, ...body})
    }

    @Delete('{cardId}')
    @Response<ErrorResponse>(404, 'Not Found')
    public async deleteCard(@Path('cardId') id: string): Promise<Array<CardResponse>> {
        return await deleteCard(id);
    }
}

export default CardsController