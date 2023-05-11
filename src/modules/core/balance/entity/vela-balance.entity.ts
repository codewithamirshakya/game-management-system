import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VelaBalance {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    host_id: string;

    @Column('text')
    member_id: string;

    @Column('text')
    currency: string;

    @Column('text')
    trans_id: string;

    @Column()
    amount: number;

    @Column()
    withdraw_balance: number;

    @Column()
    available_balance: number;

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
    transaction_date: Date;

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date;
}
