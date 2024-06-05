
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Reader extends Document {
  @Prop({required:false})
  role:string
  @Prop({ required: true })
  name: string;
  @Prop({ unique: [true, 'Email already exist'] })
  email: string;
  @Prop({ required: true, select: false })
  password: string;
  @Prop({ required: false })
  title?:string
  @Prop({ required: false })
  description?:string
  @Prop({ required: false })
  living_place?:string
  @Prop({ required: false })
  profile?:string
  @Prop({ required: false })
  otp?:number
}

export const user_schema = SchemaFactory.createForClass(Reader);
export const user_model = Reader.name;