import { Category } from "src/categories/entities/category.entity";
import { Material } from "src/materials/entities/material.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    title: string;

    @Column()
    description: string;

    @ManyToMany(() => Category, (category: Category) => category.games)
    @JoinTable({
        name: 'game_category',
        joinColumn: { name: 'game_id' },
        inverseJoinColumn: { name: 'category_id' }
    })
    categories: Category[];

    @ManyToMany(() => Material, (material: Material) => material.games, { cascade: true })
    @JoinTable({
        name: 'game_material',
        joinColumn: { name: 'game_id' },
        inverseJoinColumn: { name: 'material_id' }
    })
    materials: Material[];

    @ManyToOne(() => User, (user: User) => user.games, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'author_id' })
    author: User;

    @ManyToOne(() => Game, (game: Game) => game.variations, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'base_id' })
    base?: Game | null;

    @OneToMany(() => Game, (game: Game) => game.base)
    variations: Game[];
}
