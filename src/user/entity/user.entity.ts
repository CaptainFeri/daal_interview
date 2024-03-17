import { Column, Entity } from 'typeorm';
import { myBaseEntity } from '../../common/entity/base.entity';

@Entity('User')
export class UserEntity extends myBaseEntity {
  @Column({
    nullable: false,
  })
  username: string;
}
