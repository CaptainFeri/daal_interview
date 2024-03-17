import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';

@Entity('User')
export class UserEntity extends BaseEntity {
  @Column({
    nullable: false,
  })
  username: string;
}
