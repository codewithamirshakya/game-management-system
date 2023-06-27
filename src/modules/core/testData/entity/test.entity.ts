import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tests' })
export class Tests {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'text', nullable: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    email: string;

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date;
}