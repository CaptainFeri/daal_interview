import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChangeWalletBalanceDTO } from './dto/change-wallet-balance.dto';
import { WalletService } from './wallet.service';

@Controller()
@ApiTags('Wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('money')
  async changeWalletBalance(
    @Body() changeWalletBalance: ChangeWalletBalanceDTO,
  ) {
    return {
      data: await this.walletService.changeWalletBalance(changeWalletBalance),
    };
  }

  @Get('balance/:id')
  async getWalletByUserId(@Param('id') id: number) {
    return {
      data: await this.walletService.getWalletByUserId(id),
    };
  }
}
