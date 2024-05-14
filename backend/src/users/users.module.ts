import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { Header, HeaderSchema } from 'src/schema/header.schema';
import { WorkExp, WorkExpSchema } from 'src/schema/workexp.schema';
import { Education, EducationSchema } from 'src/schema/education.schema';
import { Project, ProjectSchema } from 'src/schema/projects.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:User.name,
    schema:UserSchema,
  },{
    name:Header.name,
    schema:HeaderSchema
  },{
    name:WorkExp.name,
    schema:WorkExpSchema
  },{
    name:Education.name,
    schema:EducationSchema
  },{
    name:Project.name,
    schema:ProjectSchema
  }
])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
