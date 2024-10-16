import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => User, (user: User) => user.games, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'author_id' })
    author: User;

    @ManyToOne(() => Game, (game: Game) => game.variations, { onDelete: 'CASCADE' })
    base?: Game | null;

    @OneToMany(() => Game, (game: Game) => game.base)
    variations: Game[];
}
