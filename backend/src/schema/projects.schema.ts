import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type ProjectDocument=Project & Document;

@Schema()

export class Project{
    @Prop({required:false})
    projectname:string;

    @Prop([String])
    projects:string[];

}

export const ProjectSchema=SchemaFactory.createForClass(Project)