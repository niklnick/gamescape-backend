import { IsEmail, IsNotEmpty } from "class-validator";

export class SignUpDto {
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    readonly firstName: string;
    @IsNotEmpty()
    readonly lastName: string;
    @IsNotEmpty()
    readonly password: string;
}
