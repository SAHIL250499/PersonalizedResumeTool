import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Header } from "./header.schema";
import { WorkExp } from "./workexp.schema";
import { Education } from "./education.schema";
import { Project } from "./projects.schema";

export type UserDocument=User & Document;

@Schema()
export class User{
    
    @Prop()
    email:string;

    @Prop()
    password:string;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Header'})
    headerid?:Header;

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'WorkExp'}]})
    workexparray?:WorkExp[];

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'Education'}]})
    educationarray?:Education[];

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'Project'}]})
    projectarray?:Project[];

    @Prop([String])
    skills?:string[];

    @Prop([String])
    achievements?:string[];

    @Prop([String])
    languages?:string[];

    @Prop([String])
    interests?:string[];
}

export const UserSchema=SchemaFactory.createForClass(User);