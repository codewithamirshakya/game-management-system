import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserConstant } from "./../constans/user.constant";

@Entity({ name: 'evolution_users' })
export class EvolutionUser {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    uid: string;

    @Column()
    country: string;

    @Column()
    currency: string;

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date;
}
