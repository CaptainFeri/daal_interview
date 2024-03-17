import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { WalletTransactionEntity } from './entity/wallet-transaction.entity';
import { WalletEntity } from './entity/wallet.entity';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WalletEntity,
      UserEntity,
      WalletTransactionEntity,
    ]),
  ],
  providers: [WalletService, UserService],
  controllers: [WalletController],
})
export class WalletModule {}
