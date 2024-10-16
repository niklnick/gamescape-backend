import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    title: string;
    @IsOptional()
    description?: string | null;
}
