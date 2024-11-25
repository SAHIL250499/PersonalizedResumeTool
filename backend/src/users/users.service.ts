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

    
    async updateHeader(userId:number,updateUserDto:any){
       const isHeaderExists=await this.userModel.findOne({_id:userId,headerid:{$ne:null}});
       if(!isHeaderExists){ 
       const header=new this.headerModel(updateUserDto);
       const savedHeader=await header.save();
       const userUpdate=await this.userModel.findByIdAndUpdate(userId,{headerid:savedHeader._id},{new:true});
       return userUpdate
       }
       else{
        const userUpdate=await this.headerModel.findByIdAndUpdate(isHeaderExists.headerid,updateUserDto,{new:true});
        return userUpdate
       }
    }

    async updateSocial(userId:number,updateSocialDto:any){
        const isHeaderExists=await this.userModel.findOne({_id:userId,headerid:{$ne:null}});
        if(!isHeaderExists){ 
            const header=await this.headerModel.create({
                socialLink:updateSocialDto
            });
            const userUpdate=await this.userModel.findByIdAndUpdate(userId,{headerid:header._id},{new:true});
            return userUpdate
            }
        else{
                const userUpdate=await this.headerModel.findByIdAndUpdate(isHeaderExists.headerid,{$set:{socialLink:updateSocialDto}},{new:true});
                return userUpdate
        }
    }

    async updateWorkExp(userId:number,workid:any,updateWorkExpDto:any){
        const isworkExpExists=await this.userModel.findOne({_id:userId,workexparray:{$ne:null}});
        if(!isworkExpExists){
        const workExp=new this.workexpModel(updateWorkExpDto);
        const savedworkExp=await workExp.save();
        const userUpdate=await this.userModel.findByIdAndUpdate(userId,{workexparray:savedworkExp._id},{new:true});
        return userUpdate;
        }
        if(workid<isworkExpExists.workexparray.length){
            const userUpdate=await this.workexpModel.findByIdAndUpdate(isworkExpExists.workexparray[workid],updateWorkExpDto,{new:true});
            return userUpdate;
        }else{
            const workExp=new this.workexpModel(updateWorkExpDto);
            const savedworkExp=await workExp.save();
            const userUpdate=await this.userModel.findByIdAndUpdate(userId,{$push:{workexparray:savedworkExp._id}},{new:true});
            return userUpdate;
        }   
    }

    async updateEducation(userId:number,educationid:any,updateEducationDto:any){
        const iseducationExists=await this.userModel.findOne({_id:userId,educationarray:{$ne:null}});
        if(!iseducationExists){
            const education=new this.educationModel(updateEducationDto);
            const savededucation=await education.save();
            const userUpdate=await this.userModel.findByIdAndUpdate(userId,{educationarray:savededucation._id},{new:true});
            return userUpdate;
        }
        if(educationid<iseducationExists.educationarray.length){
            const userUpdate=await this.educationModel.findByIdAndUpdate(iseducationExists.educationarray[educationid],updateEducationDto,{new:true});
            return userUpdate;
        }
        else{
            const education=new this.educationModel(updateEducationDto);
            const savededucation=await education.save();
            const userUpdate=await this.userModel.findByIdAndUpdate(userId,{$push:{educationarray:savededucation._id}},{new:true});
            return userUpdate;
        }

    }

    async updateProject(userId:number,projectid:any,updateProjectDto:any){
        const isprojectExists=await this.userModel.findOne({_id:userId,projectarray:{$ne:null}});
        if(!isprojectExists){
            const project=new this.projectModel(updateProjectDto);
            const savedproject=await project.save();
            const userUpdate=await this.userModel.findByIdAndUpdate(userId,{projectarray:savedproject._id},{new:true});
            return userUpdate;
        }
        if(projectid<isprojectExists.projectarray.length){
            const userUpdate=await this.projectModel.findByIdAndUpdate(isprojectExists.projectarray[projectid],updateProjectDto,{new:true});
            return userUpdate;
        }else{
            const project=new this.projectModel(updateProjectDto);
            const savedproject=await project.save();
            const userUpdate=await this.userModel.findByIdAndUpdate(userId,{$push:{projectarray:savedproject._id}},{new:true});
            return userUpdate;
        } 
    }

    async updateSkills(userId:number,skillid:any,updateSkillDto:any){
        const isupdateSkills=await this.userModel.findOne({_id:userId,skills:{$ne:null}});
        if(!isupdateSkills){
            const skill=await this.userModel.findByIdAndUpdate(userId,{skills:updateSkillDto.skills},{new:true});
            return skill;
        }
        if(skillid<isupdateSkills.skills.length){
            const userUpdate=await this.userModel.findByIdAndUpdate(userId,{$set:{[`skills.${skillid}`]:updateSkillDto.skills[0]}},{new:true});
            return userUpdate;
        }else{
            const userUpdate=await this.userModel.findByIdAndUpdate(userId,{$push:{skills:updateSkillDto.skills[0]}},{new:true});
            return userUpdate;
        }
    }

    async updateAchievement(userId:number,achievementid:any,updateAchievementDto:any){
        const isupdateAchievements=await this.userModel.findOne({_id:userId,achievements:{$ne:null}});
        if(!isupdateAchievements){
            const achievement=await this.userModel.findByIdAndUpdate(userId,{achievements:updateAchievementDto.achievements},{new:true});
            return achievement;
        }
        if(achievementid<isupdateAchievements.achievements.length){
            const userUpdate=await this.userModel.findByIdAndUpdate(userId,{$set:{[`achievements.${achievementid}`]:updateAchievementDto.achievements[0]}},{new:true});
            return userUpdate;
        }else{
            const userUpdate=await this.userModel.findByIdAndUpdate(userId,{$push:{achievements:updateAchievementDto.achievements[0]}},{new:true});
            return userUpdate;
        }
    }

    async updateLanguage(userId:number,languageid:any,updateLanguageDto:any){
        const isupdateLanguages=await this.userModel.findOne({_id:userId,languages:{$ne:null}});
        if(!isupdateLanguages){
            const language=await this.userModel.findByIdAndUpdate(userId,{languages:updateLanguageDto.languages},{new:true});
            return language;
        }
        if(languageid<isupdateLanguages.languages.length){
            const userUpdate=await this.userModel.findByIdAndUpdate(userId,{$set:{[`languages.${languageid}`]:updateLanguageDto.languages[0]}},{new:true});
            return userUpdate;
        }else{
            const userUpdate=await this.userModel.findByIdAndUpdate(userId,{$push:{languages:updateLanguageDto.languages[0]}},{new:true});
            return userUpdate;
        }
    }

    async updateInterest(userId:number,interestid:any,updateInterestDto:any){
        const isupdateInterests=await this.userModel.findOne({_id:userId,interests:{$ne:null}});
        if(!isupdateInterests){
            const interest=await this.userModel.findByIdAndUpdate(userId,{interests:updateInterestDto.interests},{new:true});
            return interest;
        }
        if(interestid<isupdateInterests.interests.length){
            const userUpdate=await this.userModel.findByIdAndUpdate(userId,{$set:{[`interests.${interestid}`]:updateInterestDto.interests[0]}},{new:true});
            return userUpdate;
        }else{
            const userUpdate=await this.userModel.findByIdAndUpdate(userId,{$push:{interests:updateInterestDto.interests[0]}},{new:true});
            return userUpdate;
        }
    }

    async getAllDetails(userId: number){
        const allDetailsList = await this.userModel.findOne({_id: userId}).select({_id: 0,email: 0,password: 0,hashedRt: 0,__v: 0}).populate('headerid').populate('workexparray').populate('educationarray').populate('projectarray');
        return allDetailsList;
    }


    async deleteLastWorkExp(userId:number){
        const isworkExpExists=await this.userModel.findOne({_id:userId,workexparray:{$ne:null}});
        if(!isworkExpExists) throw new HttpException('No WorkExp Details to Delete',400);
        const workExpList=(await this.userModel.findOne({_id:userId},{workexparray:1})).workexparray;
        if(workExpList.length>1){
         const workExpLastid=workExpList.pop();
        const deleteworkExprecord=await this.workexpModel.findByIdAndDelete(workExpLastid);
        const deleteLast=await this.userModel.updateOne({_id:userId},{$pop:{workexparray:1}});
        }
        return 'Deleted Successfully'
    }

    async deleteLastEducation(userId:number){
        const iseducationExists=await this.userModel.findOne({_id:userId,educationarray:{$ne:null}});
        if(!iseducationExists) throw new HttpException('No Education Details to Delete',400);
        const educationList=(await this.userModel.findOne({_id:userId},{educationarray:1})).educationarray;
        if(educationList.length>1){
            const educationLastid=educationList.pop();
            const deleteeducationrecord=await this.educationModel.findByIdAndDelete(educationLastid);
            const deleteLast=await this.userModel.updateOne({_id:userId},{$pop:{educationarray:1}});
        }
        return 'Deleted Successfully'
    }

    async deleteLastProject(userId:number){
        const isprojectExists=await this.userModel.findOne({_id:userId,projectarray:{$ne:null}});
        if(!isprojectExists) throw new HttpException('No Project Details to Delete',400);
        const projectList=(await this.userModel.findOne({_id:userId},{projectarray:1})).projectarray;
        if(projectList.length>1){
            const projectLastid=projectList.pop();
           const deleteprojectrecord=await this.projectModel.findByIdAndDelete(projectLastid);
           const deleteLast=await this.userModel.updateOne({_id:userId},{$pop:{projectarray:1}});
           }
        return 'Deleted Successfully'
    }

    async deleteLastSkills(userId:number){
        const isupdateSkills=await this.userModel.findOne({_id:userId,skills:{$ne:null}});
        if(!isupdateSkills) throw new HttpException('No Skills Details to Delete',400);
        const skillList=(await this.userModel.findOne({_id:userId},{skills:1})).skills;
        if(skillList.length>1){
            const deleteLast=await this.userModel.updateOne({_id:userId},{$pop:{skills:1}});
        }
        return 'Deleted Successfully'
    }

    async deleteLastAchievements(userId:number){
        const isupdateAchievements=await this.userModel.findOne({_id:userId,achievements:{$ne:null}});
        if(!isupdateAchievements) throw new HttpException('No Achievements Details to Delete',400);
        const achievementList=(await this.userModel.findOne({_id:userId},{achievements:1})).achievements;
        if(achievementList.length>1){
            const deleteLast=await this.userModel.updateOne({_id:userId},{$pop:{achievements:1}});
        }
        return 'Deleted Successfully'
    }

    async deleteLastLanguages(userId:number){
        const isupdateLanguages=await this.userModel.findOne({_id:userId,languages:{$ne:null}});
        if(!isupdateLanguages) throw new HttpException('No Language Details to Delete',400);
        const languageList=(await this.userModel.findOne({_id:userId},{languages:1})).languages;
        if(languageList.length>1){
            const deleteLast=await this.userModel.updateOne({_id:userId},{$pop:{languages:1}});
        }
        return 'Deleted Successfully'
    }

    async deleteLastInterests(userId:number){
        const isupdateInterests=await this.userModel.findOne({_id:userId,interests:{$ne:null}});
        if(!isupdateInterests) throw new HttpException('No Interest Details to Delete',400);
        const interestList=(await this.userModel.findOne({_id:userId},{interests:1})).interests;
        if(interestList.length>1){
            const deleteLast=await this.userModel.updateOne({_id:userId},{$pop:{interests:1}});
        }
        return 'Deleted Successfully'
    }


}
