import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService:UsersService){}
    
    @Patch('updateHeader')
    @UseGuards(JwtAuthGuard)
    updateHeader(@Req() req:Request,@Body() updateUserDto:any){
        return this.usersService.updateHeader(req.user,updateUserDto);
    }

    @Get('getHeader')
    @UseGuards(JwtAuthGuard)
    getHeader(@Req() req:Request){
        return this.usersService.getHeader(req.user);
    }

    @Patch('/workid/:workid/updateWorkExp')
    @UseGuards(JwtAuthGuard)
    updateWorkExp(@Req() req:Request,@Param() param:any,@Body() updateWorkExpDto:any){
        return this.usersService.updateWorkExp(req.user,param.workid,updateWorkExpDto);
    }

    @Patch('/educationid/:educationid/updateEducation')
    @UseGuards(JwtAuthGuard)
    updateEducation(@Req() req:Request,@Param() param:any,@Body() updateEducationDto:any){
        return this.usersService.updateEducation(req.user,param.educationid,updateEducationDto);
    }

    @Patch('/projectid/:projectid/updateProject')
    @UseGuards(JwtAuthGuard)
    updateProject(@Req() req:Request,@Param() param:any,@Body() updateProjectDto:any){
        return this.usersService.updateProject(req.user,param.projectid,updateProjectDto);
    }

    @Patch('/skillid/:skillid/updateSkill')
    @UseGuards(JwtAuthGuard)
    updateSkill(@Req() req:Request,@Param() param:any,@Body() updateSkillDto:any){
        return this.usersService.updateSkills(req.user,param.skillid,updateSkillDto);
    }

    @Patch('/achievementid/:achievementid/updateAchievement')
    @UseGuards(JwtAuthGuard)
    updateAchievement(@Req() req:Request,@Param() param:any,@Body() updateAchievementDto:any){
        return this.usersService.updateAchievement(req.user,param.achievementid,updateAchievementDto);
    }

    @Patch('/languageid/:languageid/updateLanguage')
    @UseGuards(JwtAuthGuard)
    updateLanguage(@Req() req:Request,@Param() param:any,@Body() updateLanguageDto:any){
        return this.usersService.updateLanguage(req.user,param.languageid,updateLanguageDto);
    }

    @Patch('/interestid/:interestid/updateInterest')
    @UseGuards(JwtAuthGuard)
    updateInterest(@Req() req:Request,@Param() param:any,@Body() updateInterestDto:any){
        return this.usersService.updateInterest(req.user,param.interestid,updateInterestDto);
    }


    @Get('getWorkExp')
    @UseGuards(JwtAuthGuard)
    getWorkExp(@Req() req:Request){
        return this.usersService.getWorkExp(req.user);
    }

    @Get('getEducation')
    @UseGuards(JwtAuthGuard)
    getEducation(@Req() req:Request){
        return this.usersService.getEducation(req.user);
    }

    @Get('getProject')
    @UseGuards(JwtAuthGuard)
    getProject(@Req() req:Request){
        return this.usersService.getProject(req.user);
    }

    @Get('getSkills')
    @UseGuards(JwtAuthGuard)
    getSkills(@Req() req: Request){
        return this.usersService.getSkills(req.user);
    }

    @Get('getAchievements')
    @UseGuards(JwtAuthGuard)
    getAchievements(@Req() req: Request){
        return this.usersService.getAchievements(req.user);
    }

    @Get('getLanguages')
    @UseGuards(JwtAuthGuard)
    getLanguages(@Req() req: Request){
        return this.usersService.getLanguages(req.user);
    }

    @Get('getInterests')
    @UseGuards(JwtAuthGuard)
    getInterests(@Req() req: Request){
        return this.usersService.getInterests(req.user);
    }





    @Delete('deleteLastWorkExp')
    @UseGuards(JwtAuthGuard)
    deleteLastWorkExp(@Req() req:Request){
        return this.usersService.deleteLastWorkExp(req.user);
    }

    @Delete('deleteLastEducation')
    @UseGuards(JwtAuthGuard)
    deleteLastEducation(@Req() req:Request){
        return this.usersService.deleteLastEducation(req.user);
    }

    @Delete('deleteLastProject')
    @UseGuards(JwtAuthGuard)
    deleteLastProject(@Req() req:Request){
        return this.usersService.deleteLastProject(req.user);
    }

    @Delete('deleteLastSkills')
    @UseGuards(JwtAuthGuard)
    deleteLastSkills(@Req() req:Request){
        return this.usersService.deleteLastSkills(req.user);
    }

    @Delete('deleteLastAchievements')
    @UseGuards(JwtAuthGuard)
    deleteLastAchievements(@Req() req:Request){
        return this.usersService.deleteLastAchievements(req.user);
    }

    @Delete('deleteLastLanguages')
    @UseGuards(JwtAuthGuard)
    deleteLastLanguages(@Req() req:Request){
        return this.usersService.deleteLastLanguages(req.user);
    }

    @Delete('deleteLastInterests')
    @UseGuards(JwtAuthGuard)
    deleteLastInterests(@Req() req:Request){
        return this.usersService.deleteLastInterests(req.user);
    }


}
