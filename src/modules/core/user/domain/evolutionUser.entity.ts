import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EvolutionUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    user_id: number; // this is euid

    @Column()
    uid: string;

    @Column()
    country_code: string;

    @Column()
    currency: string;

    @Column({type:"int",default: 0})
    state: number; // 0 for open, -1 prohibited, -2 locked

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}
