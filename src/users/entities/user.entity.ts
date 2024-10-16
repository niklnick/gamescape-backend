import { Exclude } from "class-transformer";
import { Game } from "src/games/entities/game.entity";
import { Material } from "src/materials/entities/material.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Game, (game: Game) => game.author)
    games: Game[];

    @OneToMany(() => Material, (material: Material) => material.author)
    materials: Material[];
}
