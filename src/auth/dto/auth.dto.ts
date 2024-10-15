import { IsJWT, IsNotEmptyObject } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class AuthDto {
    @IsNotEmptyObject()
    readonly user: User;
    @IsJWT()
    readonly accessToken: string;
    @IsJWT()
    readonly refreshToken: string;
}
