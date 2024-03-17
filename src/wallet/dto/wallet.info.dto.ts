import { WalletTransactionEntity } from "../entity/wallet-transaction.entity";

export class WalletInfoDto {
  username: string;
  balance: number;
  updatedAt: Date;
  userId: number;
  transactions: WalletTransactionEntity[];
}
