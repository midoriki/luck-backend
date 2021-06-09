import { Injectable } from '@nestjs/common';
import { CreateLotteryDto } from './dto/create-lottery.dto';
import { UpdateLotteryDto } from './dto/update-lottery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lottery } from './entities/lottery.entity';

@Injectable()
export class LotteryService {
  constructor(
    @InjectRepository(Lottery)
    private lotteryRepository: Repository<Lottery>,
  ) {}

  create(createLotteryDto: CreateLotteryDto): Promise<Lottery> {
    const lottery = this.lotteryRepository.create(createLotteryDto);
    return this.lotteryRepository.save(lottery);
  }

  findAll(): Promise<Lottery[]> {
    return this.lotteryRepository.find();
  }

  findAllAndCount(param: {
    page: number;
    perPage: number;
  }): Promise<[Lottery[], number]> {
    const { page, perPage } = param;
    const skip = (page - 1) * perPage;
    const take = perPage;
    return this.lotteryRepository.findAndCount({
      skip,
      take,
    });
  }

  findOne(id: number): Promise<Lottery> {
    return this.lotteryRepository.findOne(id);
  }

  async update(
    id: number,
    updateLotteryDto: UpdateLotteryDto,
  ): Promise<Lottery> {
    await this.lotteryRepository.update(id, updateLotteryDto);
    return this.lotteryRepository.findOne(id);
  }

  async remove(id: number): Promise<Lottery> {
    const lottery = await this.lotteryRepository.findOne(id);
    return this.lotteryRepository.remove(lottery);
  }
}
