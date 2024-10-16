import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateMaterialDto {
    @IsNotEmpty()
    readonly title: string;
    @IsOptional()
    readonly description?: string | null;
}
