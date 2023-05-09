import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserConstant } from "./../constans/user.constant";

@Entity()
export class ArpStudioUser {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    nickname: string;

    @Column('text')
    open_url: string;

    @Column({type:"int",default: 0})
    state: number; // 0 for open, -1 prohibited, -2 locked

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date;
}
