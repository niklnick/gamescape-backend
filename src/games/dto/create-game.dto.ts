import { IsNotEmpty, IsNotEmptyObject } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateGameDto {
    @IsNotEmpty()
    readonly title: string;
    @IsNotEmpty()
    readonly description: string;
    @IsNotEmptyObject()
    readonly user: User;
}
