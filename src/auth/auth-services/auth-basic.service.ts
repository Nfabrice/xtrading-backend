import { AccountDocument, AccountModel } from '@/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class AuthBasicService {
    constructor(@InjectModel('Account') accountModel: AccountModel) { }
    /**
     * logout from the api
     * @Improve this
     * for now just returns true
     */
    logout() {
        return {
            status: true
        }
    }
}




export class AuthAccountUtil {

    /**
     * Is the account a  admin
     * @param account 
     */
    static isAdminSupervisor(account: AccountDocument) {
        return account.role == "admin"
    }
}