import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserConstant } from "./../constans/user.constant";

@Entity({ name: 'vela_users' })
export class VelaUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    member_id: string;

    @Column()
    host_id: string;

    @Column()
    currency: string;

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date;
}
