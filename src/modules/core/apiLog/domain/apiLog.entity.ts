import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ApiLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({type: 'json',nullable: true})
  requestData: string;

  @Column({type: 'json',nullable: true})
  response: string;

  @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
  requestedAt: Date;
}