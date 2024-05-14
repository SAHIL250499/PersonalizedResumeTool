import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type WorkExpDocument=WorkExp & Document;

@Schema()

export class WorkExp{
    @Prop({required:false})
    jobtitle:string;

    @Prop({required:false})
    companyname:string;

    @Prop({required:false})
    startmonth: string;

    @Prop({required:false})
    startyear: string;

    @Prop({required:false})
    endmonth: string;

    @Prop({required:false})
    endyear: string;

    @Prop([String])
    tasks:string[];


}

export const WorkExpSchema=SchemaFactory.createForClass(WorkExp)