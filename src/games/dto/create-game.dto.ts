import { IsNotEmpty, IsNotEmptyObject, IsOptional } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Game } from "../entities/game.entity";

export class CreateGameDto {
    @IsNotEmpty()
    readonly title: string;
    @IsNotEmpty()
    readonly description: string;
    @IsNotEmptyObject()
    readonly author: User;
    @IsOptional()
    @IsNotEmptyObject({ nullable: true })
    readonly base?: Game | null;
}
