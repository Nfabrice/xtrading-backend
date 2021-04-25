import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountModule } from '@/account/account.module';
import { DatabaseModule } from '@/shared';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
