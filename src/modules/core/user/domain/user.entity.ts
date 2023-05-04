// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { UserConstant } from "./constants/user.constant";

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({ length: 100 })
//     username: string;

//     @Column({type:"int",default: UserConstant.STATUS_PENDING})
//     status: number;

//     @Column({type:"int"})
//     gameProvider: number;

//     @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
//     createdAt: Date;

//     @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP"})
//     updatedAt: Date;

//     @Column({ length: 100, nullable: true})
//     ipAddress:string;

//     @Column({type: "timestamp",nullable: true})
//     lastLoggedAt?:Date;
// }
