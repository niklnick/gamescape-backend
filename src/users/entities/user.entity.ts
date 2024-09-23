import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ name: 'first-name' })
    firstName: string;

    @Column({ name: 'last-name' })
    lastName: string;

    @Column({ select: false })
    password: string;

    @CreateDateColumn({ name: 'create-date' })
    createDate: Date;
}
