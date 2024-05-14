import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Education, EducationDocument } from 'src/schema/education.schema';
import { Header, HeaderDocument } from 'src/schema/header.schema';
import { Project, ProjectDocument } from 'src/schema/projects.schema';
import { User, UserDocument } from 'src/schema/user.schema';
import { WorkExp, WorkExpDocument } from 'src/schema/workexp.schema';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel:Model<UserDocument>,@InjectModel(Header.name) private headerModel:Model<HeaderDocument>,
    @InjectModel(WorkExp.name) private workexpModel:Model<WorkExpDocument>,@InjectModel(Education.name) private educationModel:Model<EducationDocument>,
    @InjectModel(Project.name) private projectModel:Model<ProjectDocument>
    ){}

    
    async updateHeader(body:any,updateUserDto:any){
       const isHeaderExists=await this.userModel.findOne({_id:body._id,headerid:{$ne:null}});
       if(!isHeaderExists){ 
       const header=new this.headerModel(updateUserDto);
       const savedHeader=await header.save();
       const userUpdate=await this.userModel.findByIdAndUpdate(body._id,{headerid:savedHeader._id},{new:true});
       return userUpdate
       }
       else{
        const userUpdate=await this.headerModel.findByIdAndUpdate(isHeaderExists.headerid,updateUserDto,{new:true});
        return userUpdate
       }
    }

    async updateWorkExp(body:any,workid:any,updateWorkExpDto:any){
        const isworkExpExists=await this.userModel.findOne({_id:body._id,workexparray:{$ne:null}});
        if(!isworkExpExists){
        const workExp=new this.workexpModel(updateWorkExpDto);
        const savedworkExp=await workExp.save();
        const userUpdate=await this.userModel.findByIdAndUpdate(body._id,{workexparray:savedworkExp._id},{new:true});
        return userUpdate;
        }
        if(workid<isworkExpExists.workexparray.length){
            const userUpdate=await this.workexpModel.findByIdAndUpdate(isworkExpExists.workexparray[workid],updateWorkExpDto,{new:true});
            return userUpdate;
        }else{
            const workExp=new this.workexpModel(updateWorkExpDto);
            const savedworkExp=await workExp.save();
            const userUpdate=await this.userModel.findByIdAndUpdate(body._id,{$push:{workexparray:savedworkExp._id}},{new:true});
            return userUpdate;
        }   
    }

    async updateEducation(body:any,educationid:any,updateEducationDto:any){
        const iseducationExists=await this.userModel.findOne({_id:body._id,educationarray:{$ne:null}});
        if(!iseducationExists){
            const education=new this.educationModel(updateEducationDto);
            const savededucation=await education.save();
            const userUpdate=await this.userModel.findByIdAndUpdate(body._id,{educationarray:savededucation._id},{new:true});
            return userUpdate;
        }
        if(educationid<iseducationExists.educationarray.length){
            const userUpdate=await this.educationModel.findByIdAndUpdate(iseducationExists.educationarray[educationid],updateEducationDto,{new:true});
            return userUpdate;
        }
        else{
            const education=new this.educationModel(updateEducationDto);
            const savededucation=await education.save();
            const userUpdate=await this.userModel.findByIdAndUpdate(body._id,{$push:{educationarray:savededucation._id}},{new:true});
            return userUpdate;
        }

    }

    async updateProject(body:any,projectid:any,updateProjectDto:any){
        const isprojectExists=await this.userModel.findOne({_id:body._id,projectarray:{$ne:null}});
        if(!isprojectExists){
            const project=new this.projectModel(updateProjectDto);
            const savedproject=await project.save();
            const userUpdate=await this.userModel.findByIdAndUpdate(body._id,{projectarray:savedproject._id},{new:true});
            return userUpdate;
        }
        if(projectid<isprojectExists.projectarray.length){
            const userUpdate=await this.projectModel.findByIdAndUpdate(isprojectExists.projectarray[projectid],updateProjectDto,{new:true});
            return userUpdate;
        }else{
            const project=new this.projectModel(updateProjectDto);
            const savedproject=await project.save();
            const userUpdate=await this.userModel.findByIdAndUpdate(body._id,{$push:{projectarray:savedproject._id}},{new:true});
            return userUpdate;
        } 
    }

    async updateSkills(body:any,skillid:any,updateSkillDto:any){
        const isupdateSkills=await this.userModel.findOne({_id:body._id,skills:{$ne:null}});
        if(!isupdateSkills){
            const skill=await this.userModel.findByIdAndUpdate(body._id,{skills:updateSkillDto.skills},{new:true});
            return skill;
        }
        if(skillid<isupdateSkills.skills.length){
            const userUpdate=await this.userModel.findByIdAndUpdate(body._id,{$set:{[`skills.${skillid}`]:updateSkillDto.skills[0]}},{new:true});
            return userUpdate;
        }else{
            const userUpdate=await this.userModel.findByIdAndUpdate(body._id,{$push:{skills:updateSkillDto.skills[0]}},{new:true});
            return userUpdate;
        }
    }

    async updateAchievement(body:any,achievementid:any,updateAchievementDto:any){
        const isupdateAchievements=await this.userModel.findOne({_id:body._id,achievements:{$ne:null}});
        if(!isupdateAchievements){
            const achievement=await this.userModel.findByIdAndUpdate(body._id,{achievements:updateAchievementDto.achievements},{new:true});
            return achievement;
        }
        if(achievementid<isupdateAchievements.achievements.length){
            const userUpdate=await this.userModel.findByIdAndUpdate(body._id,{$set:{[`achievements.${achievementid}`]:updateAchievementDto.achievements[0]}},{new:true});
            return userUpdate;
        }else{
            const userUpdate=await this.userModel.findByIdAndUpdate(body._id,{$push:{achievements:updateAchievementDto.achievements[0]}},{new:true});
            return userUpdate;
        }
    }

    async updateLanguage(body:any,languageid:any,updateLanguageDto:any){
        const isupdateLanguages=await this.userModel.findOne({_id:body._id,languages:{$ne:null}});
        if(!isupdateLanguages){
            const language=await this.userModel.findByIdAndUpdate(body._id,{languages:updateLanguageDto.languages},{new:true});
            return language;
        }
        if(languageid<isupdateLanguages.languages.length){
            const userUpdate=await this.userModel.findByIdAndUpdate(body._id,{$set:{[`languages.${languageid}`]:updateLanguageDto.languages[0]}},{new:true});
            return userUpdate;
        }else{
            const userUpdate=await this.userModel.findByIdAndUpdate(body._id,{$push:{languages:updateLanguageDto.languages[0]}},{new:true});
            return userUpdate;
        }
    }

    async updateInterest(body:any,interestid:any,updateInterestDto:any){
        const isupdateInterests=await this.userModel.findOne({_id:body._id,interests:{$ne:null}});
        if(!isupdateInterests){
            const interest=await this.userModel.findByIdAndUpdate(body._id,{interests:updateInterestDto.interests},{new:true});
            return interest;
        }
        if(interestid<isupdateInterests.interests.length){
            const userUpdate=await this.userModel.findByIdAndUpdate(body._id,{$set:{[`interests.${interestid}`]:updateInterestDto.interests[0]}},{new:true});
            return userUpdate;
        }else{
            const userUpdate=await this.userModel.findByIdAndUpdate(body._id,{$push:{interests:updateInterestDto.interests[0]}},{new:true});
            return userUpdate;
        }
    }






    async getHeader(body:any){
        const isHeaderExists=await this.userModel.findOne({_id:body._id,headerid:{$ne:null}});
        if(!isHeaderExists) throw new HttpException('No Header Details',400);
        const getHeaderDetails=await this.headerModel.findById(isHeaderExists.headerid);
        return getHeaderDetails
    }

    async getWorkExp(body:any){
        const isworkExpExists=await this.userModel.findOne({_id:body._id,workexparray:{$ne:null}});
        if(!isworkExpExists) throw new HttpException('No WorkExp Details',400);
        const workExpList=(await this.userModel.findOne({_id:body._id},{workexparray:1}).populate('workexparray'));
        return workExpList.workexparray
    }


    async getEducation(body:any){
        const iseducationExists=await this.userModel.findOne({_id:body._id,educationarray:{$ne:null}});
        if(!iseducationExists) throw new HttpException('No Education Details',400);
        const educationList=await this.userModel.findOne({_id:body._id},{educationarray:1}).populate('educationarray');
        return educationList.educationarray
    }

    async getProject(body:any){
        const isprojectExists=await this.userModel.findOne({_id:body._id,projectarray:{$ne:null}});
        if(!isprojectExists) throw new HttpException('No Project Details',400);
        const projectList=await this.userModel.findOne({_id:body._id},{projectarray:1}).populate('projectarray');
        return projectList.projectarray;
    }

    async getSkills(body:any){
        const isupdateSkills=await this.userModel.findOne({_id:body._id,skills:{$ne:null}});
        if(!isupdateSkills) throw new HttpException('No Skills Details',400);
        const skillList=await this.userModel.findOne({_id:body._id},{skills:1});
        return skillList.skills;
    }

    async getAchievements(body:any){
        const isupdateAchievements=await this.userModel.findOne({_id:body._id,achievements:{$ne:null}});
        if(!isupdateAchievements) throw new HttpException('No Achievements Details',400);
        const achievementList=await this.userModel.findOne({_id:body._id},{achievements:1});
        return achievementList.achievements;
    }

    async getLanguages(body:any){
        const isupdateLanguages=await this.userModel.findOne({_id:body._id,languages:{$ne:null}});
        if(!isupdateLanguages) throw new HttpException('No Languages Details',400);
        const languageList=await this.userModel.findOne({_id:body._id},{languages:1});
        return languageList.languages;
    }

    async getInterests(body:any){
        const isupdateInterests=await this.userModel.findOne({_id:body._id,interests:{$ne:null}});
        if(!isupdateInterests) throw new HttpException('No Interests Details',400);
        const interestList=await this.userModel.findOne({_id:body._id},{interests:1});
        return interestList.interests;
    }

    




    async deleteLastWorkExp(body:any){
        const isworkExpExists=await this.userModel.findOne({_id:body._id,workexparray:{$ne:null}});
        if(!isworkExpExists) throw new HttpException('No WorkExp Details to Delete',400);
        const workExpList=(await this.userModel.findOne({_id:body._id},{workexparray:1})).workexparray;
        if(workExpList.length>1){
         const workExpLastid=workExpList.pop();
        const deleteworkExprecord=await this.workexpModel.findByIdAndDelete(workExpLastid);
        const deleteLast=await this.userModel.updateOne({_id:body._id},{$pop:{workexparray:1}});
        }
        return 'Deleted Successfully'
    }

    async deleteLastEducation(body:any){
        const iseducationExists=await this.userModel.findOne({_id:body._id,educationarray:{$ne:null}});
        if(!iseducationExists) throw new HttpException('No Education Details to Delete',400);
        const educationList=(await this.userModel.findOne({_id:body._id},{educationarray:1})).educationarray;
        if(educationList.length>1){
            const educationLastid=educationList.pop();
            const deleteeducationrecord=await this.educationModel.findByIdAndDelete(educationLastid);
            const deleteLast=await this.userModel.updateOne({_id:body._id},{$pop:{educationarray:1}});
        }
        return 'Deleted Successfully'
    }

    async deleteLastProject(body:any){
        const isprojectExists=await this.userModel.findOne({_id:body._id,projectarray:{$ne:null}});
        if(!isprojectExists) throw new HttpException('No Project Details to Delete',400);
        const projectList=(await this.userModel.findOne({_id:body._id},{projectarray:1})).projectarray;
        if(projectList.length>1){
            const projectLastid=projectList.pop();
           const deleteprojectrecord=await this.projectModel.findByIdAndDelete(projectLastid);
           const deleteLast=await this.userModel.updateOne({_id:body._id},{$pop:{projectarray:1}});
           }
        return 'Deleted Successfully'
    }

    async deleteLastSkills(body:any){
        const isupdateSkills=await this.userModel.findOne({_id:body._id,skills:{$ne:null}});
        if(!isupdateSkills) throw new HttpException('No Skills Details to Delete',400);
        const skillList=(await this.userModel.findOne({_id:body._id},{skills:1})).skills;
        if(skillList.length>1){
            const deleteLast=await this.userModel.updateOne({_id:body._id},{$pop:{skills:1}});
        }
        return 'Deleted Successfully'
    }

    async deleteLastAchievements(body:any){
        const isupdateAchievements=await this.userModel.findOne({_id:body._id,achievements:{$ne:null}});
        if(!isupdateAchievements) throw new HttpException('No Achievements Details to Delete',400);
        const achievementList=(await this.userModel.findOne({_id:body._id},{achievements:1})).achievements;
        if(achievementList.length>1){
            const deleteLast=await this.userModel.updateOne({_id:body._id},{$pop:{achievements:1}});
        }
        return 'Deleted Successfully'
    }

    async deleteLastLanguages(body:any){
        const isupdateLanguages=await this.userModel.findOne({_id:body._id,languages:{$ne:null}});
        if(!isupdateLanguages) throw new HttpException('No Language Details to Delete',400);
        const languageList=(await this.userModel.findOne({_id:body._id},{languages:1})).languages;
        if(languageList.length>1){
            const deleteLast=await this.userModel.updateOne({_id:body._id},{$pop:{languages:1}});
        }
        return 'Deleted Successfully'
    }

    async deleteLastInterests(body:any){
        const isupdateInterests=await this.userModel.findOne({_id:body._id,interests:{$ne:null}});
        if(!isupdateInterests) throw new HttpException('No Interest Details to Delete',400);
        const interestList=(await this.userModel.findOne({_id:body._id},{interests:1})).interests;
        if(interestList.length>1){
            const deleteLast=await this.userModel.updateOne({_id:body._id},{$pop:{interests:1}});
        }
        return 'Deleted Successfully'
    }


}
