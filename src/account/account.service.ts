import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { AccountDocument, AccountModel } from '@/shared';

@Injectable()
export class AccountService {
    constructor(@InjectModel('Account') private readonly accountModel: AccountModel) { }
    // fetch all accounts
    async getAllAccounts(): Promise<AccountDocument[]> {
        const accounts = await this.accountModel.find().exec();
        return accounts;
    }
    // Get a single account
    async getAccount(accountID): Promise<AccountDocument> {
        const account = await this.accountModel.findById(accountID).exec();
        return account;
    }
    // post a single account
    // async addAccount(CreateAccountDTO: CreateAccountDTO): Promise<AccountDocument> {
    //     const newaccount = await new this.accountModel(CreateAccountDTO).save();
    //     return newaccount.save();
    // }
    // Edit account details
    // async updateAccount(accountID, CreateAccountDTO: CreateAccountDTO): Promise<AccountDocument> {
    //     const updatedaccount = await this.accountModel
    //         .findByIdAndUpdate(accountID, CreateAccountDTO, { new: true });
    //     return updatedaccount;
    // }
    // Delete a account
    async deleteAccount(accountID): Promise<any> {
        const deletedaccount = await this.accountModel.findByIdAndRemove(accountID);
        return deletedaccount;
    }
}
