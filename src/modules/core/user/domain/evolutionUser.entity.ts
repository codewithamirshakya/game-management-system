import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import {User} from "./user.entity";

@Entity()
export class EvolutionUser {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne((type) => User, (user) => user.id)
    @JoinColumn()
    user: User; // this can be refereed euid or main id of main user table

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

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updatedAt: Date;
}