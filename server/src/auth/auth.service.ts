import { ConflictException, HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Reader, user_model } from './schema/auth.schema';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateAuthProfileDto } from './dto/update-auth.dto';
import { setTimeout } from 'timers/promises';
import {v2 as cloudinary} from 'cloudinary'
import { ConfigService } from '@nestjs/config';
const nodemailer = require('nodemailer');

@Injectable()
export class AuthService {
  constructor(@InjectModel(user_model)
  private userModel: mongoose.Model<Reader>,
  private jwtService: JwtService,
  private readonly ConfigService: ConfigService){}
  async register_user(
    createUserDto : CreateAuthDto,
  ) : Promise <{msg:string}> {
    const { name, email, password,role } = createUserDto;
    const userInfo = await this.userModel.findOne({ email });
    if (userInfo) {
      throw new ConflictException('User already exist ! ');
    } else {
      const new_user = this.userModel.create({
        role:role,
        name: name,
        email: email,
        password: await bcrypt.hash(password, 9),
        title:"Untitled User",
        description:"",
        living_place:"Menton the place where you was born",
        profile:'https://res.cloudinary.com/dqwino0wb/image/upload/v1717135070/Screenshot_12_ttrkc9.png',
        otp:''
      });
      return {msg:"User register success"};
      //{ token, message: `Hey ${userName}, Welcome To My Plateform` }
    }
  }




//===============Login API===============
  async loginInfo(userDto:CreateUserDto) : Promise<{ token: string; message: string }> {
    const {email, password } = userDto;
    const loginInfo = await this.userModel.findOne({ email }).select("+password");

    if (loginInfo) {
      const check_password =await bcrypt.compare(password,loginInfo.password)
     if (check_password) {
      const token = await this.jwtService.sign({
        id: (await loginInfo).id,
        name: (await loginInfo).name,
        role:(await loginInfo).role
      });
      return { token, message: 'User login success' };
     } else {
        throw new UnauthorizedException("Invalied password !")
     }

    }else {
       throw new NotFoundException("User not found !")
    }
  }



//================================
  findSingleUser(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if(!isValid) throw new HttpException("Invalid User!",404)
    return  this.userModel.findById({_id:id})
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  //==================
  async updateAuthinticUserProfile(id:string,updateAuthDto:UpdateAuthProfileDto){
    cloudinary.config({
      cloud_name: this.ConfigService.get('cloud_name'),
      api_key: this.ConfigService.get('Api_key'),
      api_secret: this.ConfigService.get('Api_secret')
    })
    const {old_profile,new_profile} = updateAuthDto;
  // const {url} = await cloudinary.uploader.upload(new_prof.path,{folder:"mcq_reader_profile"})
  
    // const {url} = await cloudinary.uploader.upload(profile.path,{folder:"mcq_reader_profile"})
    // const isValid = mongoose.Types.ObjectId.isValid(id)
    // if(!isValid) throw new HttpException("Invalid User!",404)
    //   const user = await this.userModel.findOne({_id:id})

let url = ""
  try {
    if (new_profile) {
      const devide = old_profile.split("/")
      const lastPart = devide[devide.length-1]
       const finalPart = lastPart.split(".")
       await cloudinary.uploader.destroy(finalPart[0])
        const data = await cloudinary.uploader.upload(new_profile.path, {
          public_id: `${Date.now()}`, 
          resource_type: "auto"
      })
      url= data.url
   } else {
     url = old_profile
   }
// await this.userModel.findByIdAndUpdate({_id:new mongoose.mongo.ObjectId(id)},{
//      profile:url
//    })
  } catch (error) {
    console.log(error)
  }
     await this.userModel.findByIdAndUpdate(id,{
      profile:url,
     },{new:true})
    //  console.log(new_profile)
  //  return this.userModel.findByIdAndUpdate(id,updateAuthDto,{new:true})
  console.log(url)
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  //find all register user
  async findMyProfile(emailObj){
    const {email} = emailObj
   const me = await this.userModel.findOne({email})
    return {profile:me.profile,name:me.name}
  }

  async requestedTitleData (title , req){
     console.log(req,title)
  }
  //========profile update=============
async profile (){
    return "Profile Update Done"
}

async sendMail(email) : Promise <{msg:string}>{
const otp =await Math.floor(100000 + Math.random() * 900000);
const user =await this.userModel.findOne({email:email})
if (user) {
  // /===================================================================
  const fullName = user.name.split(" ")
  const firstName = fullName[0]
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bdmirazul906@gmail.com',
      pass: 'acco zbcl qzxu whzq'
    }
  });
  var mailOptions = {
    from: 'bdmirazul906@gmail.com',
    to: email,
    subject: 'Password recovery',
    html: `  <div style="width: 400px; padding: 30px; background: #fff4f4;">
    <div style="position: relative; border-bottom: 2px solid rgb(92, 92, 92);"><img style="width: 80px;position: absolute; right: 10px; top: 10px;" src="https://res.cloudinary.com/df5rvx2id/image/upload/v1716576582/ujdocgrqsgr2fhpljbiy.png" alt="bcs logo"></div>
    <h2 style="font-weight: bolder;font-size: 26;">Hi ${firstName}</h2>
   <p style="font-size: 20px">We received a request to reset your password.
   Enter the following password reset code:</p>
   <h3 style="padding-top: 10px; font-size: 30px;"><span style="border:1px solid rgb(235, 9, 133);padding-left: 20px; padding-right: 20px;font-weight: bold; background: #ffd7e8; border-radius: 4px;padding-top: 10px;padding-bottom: 10px;color: rgb(50, 51, 51); font-size:30px;">${otp}</span></h3>
<h4 style="font-weight: bolder;font-size: 22px;">thank you</h4>
</div>`
  };
  await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  await this.userModel.findByIdAndUpdate(user._id,{otp:await otp},{new:true})
  return {msg:"Check your email box"}//
} else {
  throw new NotFoundException("Email does not exist!")
}
}

updateotp(otp){

}
async updatePass(body){
 const {email,password} = body
  const user =await this.userModel.findOne({email:email})
  const strongPass = await bcrypt.hash(password, 9)
  await this.userModel.findByIdAndUpdate(user._id,{password:strongPass},{new:true})
}


async findUserForUpdatePass(user){
 const reader = await this.userModel.findOne({email:user.email})
 return reader
}
}

