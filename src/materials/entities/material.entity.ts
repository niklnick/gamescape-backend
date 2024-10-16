import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Material {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description?: string | null;

    @ManyToOne(() => User, (user: User) => user.materials, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'author_id' })
    author: User;
}
