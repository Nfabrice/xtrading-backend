import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Seller } from './interfaces/seller.interface';
import { CreateSellerDTO } from './dto/create-seller.dto';

@Injectable()
export class SellerService {
    constructor(@InjectModel('Seller') private readonly sellerModel: Model<Seller>) { }
    // fetch all seller
    async getAllSeller(): Promise<Seller[]> {
        const seller = await this.sellerModel.find().exec();
        return seller;
    }
    // Get a single seller
    async getSeller(customerID): Promise<Seller> {
        const seller = await this.sellerModel.findById(customerID).exec();
        return seller;
    }
    // post a single seller
    async addSeller(createSellerDTO: CreateSellerDTO): Promise<Seller> {
        const newSeller = await new this.sellerModel(createSellerDTO);
        return newSeller.save();
    }
    // Edit seller details
    async updateSeller(sellerID, createSellerDTO: CreateSellerDTO): Promise<Seller> {
        const updatedSeller = await this.sellerModel
            .findByIdAndUpdate(sellerID, createSellerDTO, { new: true });
        return updatedSeller;
    }
    // Delete a seller
    async deleteSeller(sellerID): Promise<any> {
        const deletedSeller = await this.sellerModel.findByIdAndRemove(sellerID);
        return deletedSeller;
    }
}
