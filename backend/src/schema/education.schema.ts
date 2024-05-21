
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type EducationDocument=Education & Document;

@Schema()

export class Education{
    @Prop({required:false})
    coursename:string;

    @Prop({required:false})
    schoolname:string;

    @Prop({required:false})
    startmonth: string;

    @Prop({required:false})
    startyear: string;

    @Prop({required:false})
    endmonth: string;

    @Prop({required:false})
    endyear: string;

}

export const EducationSchema=SchemaFactory.createForClass(Education)