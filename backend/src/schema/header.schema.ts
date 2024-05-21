import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";


export type HeaderDocument=Header & Document;

@Schema()

export class Header{
    @Prop({required:false})
    name:string;

    @Prop({required:false})
    title:string;

    @Prop({required:false})
    desc:string;

    @Prop({type:Object})
    socialLink: object;

}

export const HeaderSchema=SchemaFactory.createForClass(Header);