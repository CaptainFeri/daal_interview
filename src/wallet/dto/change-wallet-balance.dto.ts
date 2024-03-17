import { ApiProperty } from '@nestjs/swagger';

export class ChangeWalletBalanceDTO {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  amount: number;
}
