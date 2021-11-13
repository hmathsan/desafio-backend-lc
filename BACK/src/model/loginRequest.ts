import { IsString, IsNotEmpty } from 'class-validator'

export class LoginRequest {
    @IsString()
    @IsNotEmpty()
    login!: string;

    @IsString()
    @IsNotEmpty()
    senha!: string;
}

export default LoginRequest