import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel:Model<UserDocument>,private jwtService:JwtService){}

    async validateUser({email,password}:any){
        console.log(`[AuthService] validateUser: email=${email}, password=${password}`)
        const user=(await this.userModel.findOne({email:email})).toObject();
        if (user && user.password===password) {
            console.log('[UsersService] validateUser: found user', user);
            const {password,...result}=user;
            return {access_token:this.jwtService.sign(result),email:user.email}
        }
        return null;
    }


    async register(user:any){
        console.log(`[AuthService] register: user=${JSON.stringify(user)}`);
        const findUser=await this.userModel.findOne({email:user.email});
        console.log(findUser);
        if(findUser) return null;
        const newUser=new this.userModel(user);
        const {password,...result}=newUser.toObject();
        await newUser.save();
        return{
            access_token:this.jwtService.sign(result),
            email:user.email
        }
    }






}
