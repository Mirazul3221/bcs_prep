import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSavequestionDto } from './dto/create-savequestion.dto';
import { UpdateSavequestionDto } from './dto/update-savequestion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SaveQuestions, savequestion_model } from './schema/savequestions.schems';
import mongoose from 'mongoose';

@Injectable()
export class SavequestionsService {
  constructor(    @InjectModel(savequestion_model)
  private saveQuestions: mongoose.Model<SaveQuestions>,){}
 async create(createSavequestionDto: CreateSavequestionDto,req) {
    const {question_id} = createSavequestionDto
    const existQuestion = await this.saveQuestions.findOne({question_id:question_id})
    if (existQuestion) {
      throw new ConflictException('Question already exist ');
    } else {
      await this.saveQuestions.create({
        reader_id:req.user._id,
        question_id: question_id
      })
    }
    return 'This action adds a new savequestion';
  }

  findAll(req) {
    const findAllQuestions = this.saveQuestions.find({reader_id:req.user._id})
    return findAllQuestions;
  }

  findOne(id: number) {
    return `This action returns a #${id} savequestion`;
  }

  update(id: number, updateSavequestionDto: UpdateSavequestionDto) {
    return `This action updates a #${id} savequestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} savequestion`;
  }
}
