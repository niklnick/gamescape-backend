import { IsNotEmpty, IsNotEmptyObject, IsOptional } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateMaterialDto {
    @IsNotEmpty()
    readonly title: string;
    @IsOptional()
    readonly description?: string | null;
    @IsNotEmptyObject()
    readonly author: User;
}
