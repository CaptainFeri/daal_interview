import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { ChangeWalletBalanceDTO } from './dto/change-wallet-balance.dto';
import { WalletInfoDto } from './dto/wallet.info.dto';
import { WalletTransactionEntity } from './entity/wallet-transaction.entity';
import { WalletEntity } from './entity/wallet.entity';
import { TransactionTypeEnum } from './types/transaction.enum';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletRepo: Repository<WalletEntity>,
    @InjectRepository(WalletTransactionEntity)
    private readonly walletTransactionRepo: Repository<WalletTransactionEntity>,
    private readonly userService: UserService,
  ) {}

  async changeWalletBalance(
    changeWalletBalance: ChangeWalletBalanceDTO,
  ): Promise<WalletInfoDto> {
    const { amount, userId } = changeWalletBalance;
    const userWallet = await this.getWalletByUserId(userId);
    const wallet = await this.walletRepo.findOne({ where: { userId } });
    let newBalance = 0;
    if (amount < 0) {
      newBalance = wallet.balance + amount;
      await this.createWalletTransaction(
        changeWalletBalance,
        TransactionTypeEnum.decrease,
      );
    } else if (amount > 0) {
      newBalance = wallet.balance + amount;
      await this.createWalletTransaction(
        changeWalletBalance,
        TransactionTypeEnum.increase,
      );
    } else throw new BadRequestException('BAD_REQUEST');
    wallet.balance = newBalance;
    await this.walletRepo.save(wallet);
    return await this.getWalletByUserId(userId);
  }

  async getWalletByUserId(userId: number): Promise<WalletInfoDto> {
    const user = await this.userService.getUser(userId);
    const wallet = await this.walletRepo.findOne({
      where: { userId: user.id },
    });
    if (!wallet) throw new BadRequestException('WALLET.NOT_FOUND');
    const walletTransactions = await this.walletTransactionRepo.find({
      where: { userId },
      order: { createAt: 'DESC' },
    });
    const walletInfo = new WalletInfoDto();
    walletInfo.balance = wallet.balance;
    walletInfo.updatedAt = user.updateAt;
    walletInfo.userId = user.id;
    walletInfo.username = user.username;
    walletInfo.transactions = walletTransactions;
    return walletInfo;
  }

  async createWalletTransaction(
    changeWalletBalance: ChangeWalletBalanceDTO,
    type: number,
  ) {
    const { amount, userId } = changeWalletBalance;
    const walletTransaction = new WalletTransactionEntity();
    walletTransaction.amount = amount;
    walletTransaction.userId = userId;
    if (type == TransactionTypeEnum.decrease)
      walletTransaction.transactionTypeId = TransactionTypeEnum.decrease;
    else if (type == TransactionTypeEnum.increase)
      walletTransaction.transactionTypeId = TransactionTypeEnum.increase;
    else throw new BadRequestException('BAD_REQUEST');
    return await this.walletTransactionRepo.save(walletTransaction);
  }
}
