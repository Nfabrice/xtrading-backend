import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    /**
     *
     */
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV?.trim().toLowerCase() == 'production'
          ? '.production.env'
          : '.development.env',
    }),
    MongooseModule.forRoot('mongodb://localhost/xtrading-app', { useNewUrlParser: true }),
    AccountModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
