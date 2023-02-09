import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EvolutionTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  main_transaction_id: number;

  @Column({type:"double"})
  available_balance: number;

  @Column({nullable: false})
  trans_id: string;

  @Column()
  e_transaction_id: string;

  @Column({type: "timestamp"})
  e_transaction_time: Date;

  @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
