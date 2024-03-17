import { BaseEntity } from '../../common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('Wallet')
export class WalletEntity extends BaseEntity {
  @Column({
    nullable: false,
    default: 0,
  })
  balance: number;

  @Column({
    nullable: false,
  })
  userId: number;
}
