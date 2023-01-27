import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Rebate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    username: string;
}
