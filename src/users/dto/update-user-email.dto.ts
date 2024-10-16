import { IsEmail } from "class-validator";

export class UpdateUserEmailDto {
    @IsEmail()
    readonly email: string;
}
