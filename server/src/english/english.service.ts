import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateEnglishDto } from './dto/create-english.dto';
import { English, english_model } from './schema/english.schema';

@Injectable()
export class EnglishService {
constructor(@InjectModel(english_model)
private englishQuestionModel: mongoose.Model<English>,){}

 async create(createEnglishDto: CreateEnglishDto) : Promise<{msg:string}> {
    const {subSubject,topic,examName,otherExamName,question,rightAns,option_01,option_02,option_03,option_04,description} = createEnglishDto
    const englishMcq =await this.englishQuestionModel.findOne({examName,topic,question})
    if (englishMcq) {
      throw new ConflictException('Question already exist ! ');
    } else {
      await this.englishQuestionModel.create({
        subject:"English",
        subSubject:subSubject,
        topic:topic,
        examName:examName,
        otherExamName:otherExamName,
        question:question,
        rightAns:rightAns,
        option_01:option_01,
        option_02:option_02,
        option_03:option_03,
        option_04:option_04,
        description:description
      })
    }
     return await {msg:"Question added success"};
  }

  async findAll() {
    return await this.englishQuestionModel.find().sort({createdAt:-1});
  }

  findOne(id: number) {
    return `This action returns a #${id} bangla`;
  }

  // update(id: number, updateBanglaDto:) {
  //   return `This action updates a #${id} bangla`;
  // }

  remove(id: number) {
    return `This action removes a #${id} bangla`;
  }
}
