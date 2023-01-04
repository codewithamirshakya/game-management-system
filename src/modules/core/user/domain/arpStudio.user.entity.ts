import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ArpStudioUser {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'int'})
    user_id: number;

    @Column()
    username: string;

    @Column()
    nickname: string;

    @Column({type:"int",default: 0})
    state: number; // 0 for open, -1 prohibited, -2 locked

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({type: "timestamp"})
    updatedAt: Date;
}
