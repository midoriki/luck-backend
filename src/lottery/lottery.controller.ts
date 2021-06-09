import { LinkHeaderInterceptor } from '@algoan/nestjs-pagination';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Res,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import { LotteryService } from './lottery.service';
import { CreateLotteryDto } from './dto/create-lottery.dto';
import { UpdateLotteryDto } from './dto/update-lottery.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseInterceptors } from '@nestjs/common';
import { Lottery } from './entities/lottery.entity';
import { Roles } from '../role/role.decorator';
import { Role } from 'src/role/role.enum';
import { RoleGuard } from '../role/role.guard';

@Controller('lottery')
export class LotteryController {
  constructor(private readonly lotteryService: LotteryService) {}

  @Roles(Role.Admin)
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createLotteryDto: CreateLotteryDto,
    @Res() res: Response
  ) {
    try {
      return await this.lotteryService.create(createLotteryDto);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        return res.status(HttpStatus.BAD_REQUEST).send({
          code: e.code,
          error: 'Duplicate lottery result'
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @UseInterceptors(new LinkHeaderInterceptor({ resource: 'data' }))
  @Roles(Role.Admin)
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('page') page,
    @Query('per_page') perPage
  ): Promise<{ totalDocs: number; resource: Lottery[] }> {
    const [data, count] = await this.lotteryService.findAllAndCount({
      page,
      perPage
    });
    return {
      totalDocs: count,
      resource: data
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lotteryService.findOne(+id);
  }

  @UseGuards(RoleGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateLotteryDto: UpdateLotteryDto) {
    return this.lotteryService.update(+id, updateLotteryDto);
  }

  @UseGuards(RoleGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.lotteryService.remove(+id);
  }
}
