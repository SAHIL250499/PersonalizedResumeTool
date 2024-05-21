import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { GetCurrentUserId } from 'src/auth/common/decorators';

@Controller('users')
export class UsersController {

    constructor(private usersService:UsersService){}
    
    @Patch('updateHeader')
    updateHeader(@GetCurrentUserId() userId:number,@Body() updateUserDto:any){
        return this.usersService.updateHeader(userId,updateUserDto);
    }

    @Patch('updateSocials')
    updateSocial(@GetCurrentUserId() userId:number,@Body() updateSocialDto: any){
        return this.usersService.updateSocial(userId,updateSocialDto);
    }

    @Get('getHeader')
    getHeader(@GetCurrentUserId() userId:number){
        return this.usersService.getHeader(userId);
    }

    @Patch('/workid/:workid/updateWorkExp')
    updateWorkExp(@GetCurrentUserId() userId:number,@Param() param:any,@Body() updateWorkExpDto:any){
        return this.usersService.updateWorkExp(userId,param.workid,updateWorkExpDto);
    }

    @Patch('/educationid/:educationid/updateEducation')
    updateEducation(@GetCurrentUserId() userId:number,@Param() param:any,@Body() updateEducationDto:any){
        return this.usersService.updateEducation(userId,param.educationid,updateEducationDto);
    }

    @Patch('/projectid/:projectid/updateProject')
    updateProject(@GetCurrentUserId() userId:number,@Param() param:any,@Body() updateProjectDto:any){
        return this.usersService.updateProject(userId,param.projectid,updateProjectDto);
    }

    @Patch('/skillid/:skillid/updateSkill')
    updateSkill(@GetCurrentUserId() userId:number,@Param() param:any,@Body() updateSkillDto:any){
        return this.usersService.updateSkills(userId,param.skillid,updateSkillDto);
    }

    @Patch('/achievementid/:achievementid/updateAchievement')
    updateAchievement(@GetCurrentUserId() userId:number,@Param() param:any,@Body() updateAchievementDto:any){
        return this.usersService.updateAchievement(userId,param.achievementid,updateAchievementDto);
    }

    @Patch('/languageid/:languageid/updateLanguage')
    updateLanguage(@GetCurrentUserId() userId:number,@Param() param:any,@Body() updateLanguageDto:any){
        return this.usersService.updateLanguage(userId,param.languageid,updateLanguageDto);
    }

    @Patch('/interestid/:interestid/updateInterest')
    updateInterest(@GetCurrentUserId() userId:number,@Param() param:any,@Body() updateInterestDto:any){
        return this.usersService.updateInterest(userId,param.interestid,updateInterestDto);
    }


    @Get('getWorkExp')
    getWorkExp(@GetCurrentUserId() userId:number){
        return this.usersService.getWorkExp(userId);
    }

    @Get('getEducation')
    getEducation(@GetCurrentUserId() userId:number){
        return this.usersService.getEducation(userId);
    }

    @Get('getProject')
    getProject(@GetCurrentUserId() userId:number){
        return this.usersService.getProject(userId);
    }

    @Get('getSkills')
    getSkills(@GetCurrentUserId() userId:number){
        return this.usersService.getSkills(userId);
    }

    @Get('getAchievements')
    getAchievements(@GetCurrentUserId() userId:number){
        return this.usersService.getAchievements(userId);
    }

    @Get('getLanguages')
    getLanguages(@GetCurrentUserId() userId:number){
        return this.usersService.getLanguages(userId);
    }

    @Get('getInterests')
    getInterests(@GetCurrentUserId() userId:number){
        return this.usersService.getInterests(userId);
    }





    @Delete('deleteLastWorkExp')
    deleteLastWorkExp(@GetCurrentUserId() userId:number){
        return this.usersService.deleteLastWorkExp(userId);
    }

    @Delete('deleteLastEducation')
    deleteLastEducation(@GetCurrentUserId() userId:number){
        return this.usersService.deleteLastEducation(userId);
    }

    @Delete('deleteLastProject')
    deleteLastProject(@GetCurrentUserId() userId:number){
        return this.usersService.deleteLastProject(userId);
    }

    @Delete('deleteLastSkills')
    deleteLastSkills(@GetCurrentUserId() userId:number){
        return this.usersService.deleteLastSkills(userId);
    }

    @Delete('deleteLastAchievements')
    deleteLastAchievements(@GetCurrentUserId() userId:number){
        return this.usersService.deleteLastAchievements(userId);
    }

    @Delete('deleteLastLanguages')
    deleteLastLanguages(@GetCurrentUserId() userId:number){
        return this.usersService.deleteLastLanguages(userId);
    }

    @Delete('deleteLastInterests')
    deleteLastInterests(@GetCurrentUserId() userId:number){
        return this.usersService.deleteLastInterests(userId);
    }


}
