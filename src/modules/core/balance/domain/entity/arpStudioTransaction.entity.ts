import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ArpStudioTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  main_transaction_id: number;

  @Column({type: "int"})
  account_type: number;

  @Column({nullable: true})
  source: string;

  @Column({type:"bigint",nullable: true})
  trade_no: number;

  @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
