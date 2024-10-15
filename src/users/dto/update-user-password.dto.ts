import { IsNotEmpty } from "class-validator";

export class UpdateUserPasswordDto {
    @IsNotEmpty()
    readonly password: string;
}
