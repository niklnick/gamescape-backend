import { Exclude } from "class-transformer";
import { Game } from "src/games/entities/game.entity";
import { Material } from "src/materials/entities/material.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enums/role.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Exclude()
    @Column()
    password: string;

    @Exclude()
    @Column('enum', { enum: Role, default: Role.User })
    role: Role;

    @OneToMany(() => Game, (game: Game) => game.author)
    games: Game[];

    @OneToMany(() => Material, (material: Material) => material.author)
    materials: Material[];
}
