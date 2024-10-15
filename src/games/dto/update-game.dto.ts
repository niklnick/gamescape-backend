import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateGameDto } from './create-game.dto';

export class UpdateGameDto extends PartialType(OmitType(CreateGameDto, ['user'] as const)) { }
