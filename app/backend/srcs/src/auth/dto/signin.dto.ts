import { IsAlphanumeric } from "class-validator";

export class SignInDto {

    @IsAlphanumeric()
    username: string;

    password: string;
}