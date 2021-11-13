import { getAllCards, createCard, updateCardById, deleteCard } from '../repositories'
import { Route, Post, Get, Put, Path, Delete, Body, Security, Tags, SuccessResponse, Response } from 'tsoa';
import { CardRequest, CardResponse, ErrorResponse, ValidationErrorResponse } from '../model'

@Route('cards')
@Tags('Cards')
export class CardsController {
    @Get()
    @Security('jwt')
    @SuccessResponse('200')
    public async getCards(): Promise<Array<CardResponse>> {
        return await getAllCards();
    }

    @Post()
    @Security('jwt')
    @SuccessResponse('201')
    @Response<ValidationErrorResponse>(400, 'Bad Request')
    public async createNewCard(@Body() body: CardRequest): Promise<CardResponse> {
        return await createCard(body);
    }

    @Put('{cardId}')
    @Security('jwt')
    @Response<ValidationErrorResponse>(400, 'Bad Request')
    @Response<ErrorResponse>(404, 'Not Found')
    public async updateCard(@Path('cardId') id: string, @Body() body: CardRequest): Promise<CardResponse> {
        return await updateCardById({id, ...body})
    }

    @Delete('{cardId}')
    @Security('jwt')
    @Response<ErrorResponse>(404, 'Not Found')
    public async deleteCard(@Path('cardId') id: string): Promise<Array<CardResponse>> {
        return await deleteCard(id);
    }
}

export default CardsController