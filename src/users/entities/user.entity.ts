import { Exclude } from "class-transformer";
import { Game } from "src/games/entities/game.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => Game, (game: Game) => game.author)
    games: Game[];
}
