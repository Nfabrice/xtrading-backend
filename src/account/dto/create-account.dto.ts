import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export class CreateAccountDTO {
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
}