import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EvolutionBalance {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    username: string;

    @Column('text')
    trans_id: string;

    @Column()
    amount: number;

    @Column()
    withdraw_balance: number;

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
    transaction_date: Date;

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date;
}
