import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ArpStudioBalance {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    account_type: number;

    @Column('text')
    source: string;

    @Column('text')
    currency: string;

    @Column()
    amount: number;

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
    transaction_date: Date;

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date;
}
