import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel:Model<UserDocument>,private jwtService:JwtService){}

    async register(dto:AuthDto):Promise<Tokens>{
        const user=await this.userModel.findOne({email:dto.email});
        if(user) throw new ForbiddenException("Email Already Exist");
        const hash= await this.hashData(dto.password);
        const newUser=await this.userModel.create({
            email:dto.email,
            password: hash,
        });
        const tokens=await this.getTokens(newUser._id,newUser.email);
        await this.updateRtHash(newUser._id,tokens.refresh_token);
        return tokens;
    }

    async login(dto: AuthDto) :Promise<Tokens>{
        const user = await this.userModel.findOne({email:dto.email});
        if(!user) throw new ForbiddenException("Access Denied");
        const passwordMatches = await bcrypt.compare(dto.password,user.password);
        if(!passwordMatches) throw new ForbiddenException("Access Denied");
        const tokens=await this.getTokens(user._id,user.email);
        await this.updateRtHash(user._id,tokens.refresh_token);
        return tokens;
    }

    async logout(userId: number):Promise<boolean>{
        await this.userModel.updateOne({_id:userId,hashedRt:{$ne: null}},{$set:{hashedRt:null}});
        return true;
    }

    async refreshTokens(userId: number,rt : string):Promise<Tokens>{
        const user= await this.userModel.findOne({_id:userId});
        if(!user || !user.hashedRt) throw new ForbiddenException("Access Denied");
        const rtMatches=await bcrypt.compare(rt,user.hashedRt);
        if(!rtMatches) throw new ForbiddenException("Access Denied");
        const tokens=await this.getTokens(user._id,user.email);
        await this.updateRtHash(user._id,tokens.refresh_token);
        return tokens;
    }


    hashData(data:string){
        return bcrypt.hash(data,10);
    }

    async getTokens(userId:number,email:string):Promise<Tokens>{
        const jwtPayload={
            userId,
            email
        }

        const [at,rt]= await Promise.all([
            this.jwtService.signAsync(jwtPayload,{
                secret:process.env.AT_SECRET,
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(jwtPayload,{
                secret:process.env.RT_SECRET,
                expiresIn: '1d',
            })
        ]);
        const decodedRt = this.jwtService.decode(rt) as { exp: number };
        const refreshExpiresIn = new Date(decodedRt.exp * 1000);

        return {
            access_token: at,
            refresh_token: rt,
            refresh_expires_in: refreshExpiresIn
        }
    }

    async updateRtHash(userId : number,rt: string){
        const hash= await this.hashData(rt);
        await this.userModel.updateOne({_id:userId},{$set:{hashedRt: hash}});
    }


}
