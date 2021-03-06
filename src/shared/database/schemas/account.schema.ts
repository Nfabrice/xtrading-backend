import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type AccountDocument = Account & mongoose.Document;
export type AccountModel = mongoose.Model<AccountDocument>;

@Schema({
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
})
export class Account {

    @Prop({ required: true })
    role!: string;

    @Prop({ required: true })
    first_name: String;

    @Prop({ required: true })
    last_name: String;

    @Prop({ required: true })
    market_name: String;

    @Prop({ required: true })
    email: String;

    @Prop({ required: true })
    value: String;

    @Prop({ required: true })
    value_share: String;

    @Prop({
        type: { hash: String, salt: String },
        required: true,
        select: false,
    })
    password: { hash: string; salt: string };

}

export const AccountSchema = SchemaFactory.createForClass(Account);
