import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UsePipes, ValidationPipe, UseGuards, HttpException, HttpStatus, UseInterceptors, Bind, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from './dto/create-user-dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateAuthProfileDto } from './dto/update-auth.dto';
import { Request } from 'express';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/user/register')
  @UsePipes(ValidationPipe)
  async register(
    @Body() createUserDto: CreateAuthDto,
  ): Promise <{msg:string}> {
    console.log(createUserDto);
    return await this.authService.register_user(createUserDto);
  }

  @Post('/user/login')
  @UsePipes(ValidationPipe)
 async login( @Body() userDto:CreateUserDto) : Promise<{ token: string; message: string }> {
    return await this.authService.loginInfo(userDto);
  }
  @Post("getmyprofile")
  async requestedData(@Body() userEmail){
    // console.log(userEmail.email)
     return await this.authService.findMyProfile(userEmail)
  }
  @Post("updatemytitle")
  @UseGuards(AuthGuard())
  async requestedTitleData(@Body() title, @Req() req){
    // console.log(userEmail.email)
     return await this.authService.requestedTitleData(title,req)
  }

//========
  //GET
  //==============================
  @Get("/find")
  @UseGuards(AuthGuard())
 async findSingleUser(@Req() req){
  // const findUser = 
  // if(!findUser) throw new HttpException("User not found",404)
    return await this.authService.findSingleUser(req.user._id)
 }

 //PATCH
 //=====================
 @Patch("/updateProfile")
 @UseGuards(AuthGuard())
 @FormDataRequest({storage:FileSystemStoredFile})
 async updateUser(@Body() updateAuthDto:UpdateAuthProfileDto,@Req() req){

  return this.authService.updateAuthinticUserProfile(req.user._id,updateAuthDto) 
 }

//  //===========upload files==============
//  @Post('upload')
//  @UseInterceptors(FileInterceptor("file",{
//   storage:diskStorage({destination:"../userprofile",filename:(req,file,cb)=>{
//     cb(null,`${file.originalname}`)
//   }})
//  }))
//  public async uploadFile(@UploadedFile() file : Express.Multer.File) {
//   console.log(file.path)
//    return "success";
//  }
//======================================
@Get('user/profile')
async profile (){
  return await this.authService.profile()
}
 //======================================
 //======================================
 //======LOGIN WITH FACEBOOK
 //======================================
 //======================================
 @Get("/login/facebook")
 @UseGuards(AuthGuard("facebook"))
 async facebookLogin(): Promise<any> {
   return HttpStatus.OK;
 }

 @Get("/facebook/redirect")
 @UseGuards(AuthGuard("facebook"))
 async facebookLoginRedirect(@Req() req: Request): Promise<any> {
   return {
     statusCode: HttpStatus.OK,
     data: req.user,
   };
 }
 //======================================
 //======================================
 //======LOGIN WITH Google
 //======================================
 //======================================

 @Get("/login/google")
 @UseGuards(AuthGuard("google"))
 async googleAuth(@Req() req) {
  return "ffghd"
 }

 @Get('google-redirect')
 @UseGuards(AuthGuard("google"))
 googleAuthRedirect(@Req() req) {
  if (!req.user) {
    return 'No user from google';
  }

  return {
    message: 'User information from google',
    user: req.user,
  };
 }

//===========================================
//===========================================
//===========================================
@Post('sendmail')
 async sendMail(@Body() user) : Promise <{msg:string}> {
 return await this.authService.sendMail(user.email)
 }


@Post('updateotp')
 async updateotp(@Body() otp) {
 return await this.authService.updateotp(otp)
 }
@Post('updatepass')
 async updatePass(@Body() body) {
  // console.log(body)
 return await this.authService.updatePass(body)
 }

 @Post('recovery-user')
 async findUserForUpdatePass(@Body() user){
  return await this.authService.findUserForUpdatePass(user)
 }

}
///