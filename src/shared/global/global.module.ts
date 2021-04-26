
import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { PasswordService } from './password.service';

@Module({
    imports: [],
    controllers: [],
    providers: [
        JwtService,
        PasswordService
    ],
    exports: [
        JwtService,
        PasswordService
    ],
})
export class GlobalModule { }
