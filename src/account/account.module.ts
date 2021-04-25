import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { DatabaseModule } from 'src/shared';
import { AccountService } from './account.service';

@Module({
  imports:[
    DatabaseModule
  ],
  providers: [AccountService]
})
export class AccountModule {}
