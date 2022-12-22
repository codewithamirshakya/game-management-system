import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserConstant } from "./constants/user.constant";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column({ length: 100 })
    fullName: string;

    @Column({ length: 100 })
    email: string;

    @Column()
    password: string;

    @Column({type:"int",default: UserConstant.STATUS_PENDING})
    status: number;

    @Column({type: "timestamp"})
    createdAt: Date;

    @Column({type: "timestamp"})
    updatedAt: Date;

    @Column({ length: 100 })
    address:string;

    @Column({ length: 100, nullable: true})
    ipAddress:string;

    @Column({type: "timestamp",nullable: true})
    lastLoggedAt?:Date;
}
