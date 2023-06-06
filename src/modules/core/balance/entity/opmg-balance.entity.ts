import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OpmgBalance {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    username: string;

    @Column()
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
