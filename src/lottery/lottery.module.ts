import { Module } from '@nestjs/common';
import { LotteryService } from './lottery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lottery } from './entities/lottery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lottery])],
  providers: [LotteryService],
  exports: [LotteryService],
})
export class LotteryModule {}
