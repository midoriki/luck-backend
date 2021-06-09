import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { getConnectionOptions, Connection } from 'typeorm';
import { UserController } from './user/user.controller';
import { LotteryModule } from './lottery/lottery.module';
import { LotteryController } from './lottery/lottery.controller';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    AuthModule,
    UserModule,
    UserModule,
    LotteryModule,
    CaslModule,
  ],
  controllers: [AppController, UserController, LotteryController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
