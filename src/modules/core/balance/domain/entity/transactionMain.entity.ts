import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TransactionEnum } from "../constants/transactionType.constant";

@Entity()
export class TransactionMain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({length:'10'})
  currency_code: string;

  @Column({
    type:"enum",
    enum: TransactionEnum,
  })
  type: TransactionEnum;

  @Column({type:"int"})
  game_provider: number;

  @Column({type:"int"})
  status: number;

  @Column({type:"double"})
  amount: number;

  @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
  transaction_date: Date;

  @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
