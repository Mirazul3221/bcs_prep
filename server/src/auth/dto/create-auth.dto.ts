import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @IsOptional()
    role?:string
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please Provide valid email' })
    readonly email: string;
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
    @IsString()
    @IsOptional()
    title?:string
    @IsString()
    @IsOptional()
    description?:string
    @IsString()
    @IsOptional()
    living_place?:string
    @IsString()
    @IsOptional()
    profile:string
    @IsNumber()
    @IsOptional()
    otp:number

    
}
