import { Game } from "src/games/entities/game.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    title: string;

    @Column({ nullable: true })
    description?: string | null;

    @ManyToMany(() => Game, (game: Game) => game.categories)
    games: Game[];
}
