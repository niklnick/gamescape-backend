import { IsArray, IsNotEmpty, IsNotEmptyObject, IsOptional } from "class-validator";
import { Category } from "src/categories/entities/category.entity";
import { Material } from "src/materials/entities/material.entity";
import { Game } from "../entities/game.entity";

export class CreateGameDto {
    @IsNotEmpty()
    readonly title: string;
    @IsNotEmpty()
    readonly description: string;
    @IsArray()
    readonly categories: Category[];
    @IsArray()
    readonly materials: Material[];
    @IsOptional()
    @IsNotEmptyObject({ nullable: true })
    readonly base?: Game | null;
}
