import { IsString, IsNotEmpty } from "class-validator";

export class CardRequest {
    @IsString()
    @IsNotEmpty()
    titulo!: string;

    @IsString()
    @IsNotEmpty()
    conteudo!: string;

    @IsString()
    @IsNotEmpty()
    lista!: string;
}

export default CardRequest;