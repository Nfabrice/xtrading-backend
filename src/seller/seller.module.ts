import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { sellerSchema } from './schemas/seller.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Seller', schema: sellerSchema }])
  ],
  providers: [SellerService],
  controllers: [SellerController]
})
export class SellerModule {}
