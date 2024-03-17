import { BaseEntity } from '../../common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('Wallet-Transaction')
export class WalletTransactionEntity extends BaseEntity {
  @Column()
  transactionTypeId: number;

  @Column()
  userId: number;

  @Column()
  amount: number;
}
