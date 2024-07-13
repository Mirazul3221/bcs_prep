import { Injectable } from '@nestjs/common';
import { CreateAllquestionscollectionDto } from './dto/create-allquestionscollection.dto';
import { UpdateAllquestionscollectionDto } from './dto/update-allquestionscollection.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {
  Allquestionscollection,
  allquestionscollection_model,
} from './schema/allquestionscollection.schema';

@Injectable()
export class AllquestionscollectionService {
  constructor(
    @InjectModel(allquestionscollection_model)
    private allquestionscollection: mongoose.Model<Allquestionscollection>,
  ) {}
  async create(
    createAllquestionscollectionDto: CreateAllquestionscollectionDto,
  ) {
    const createdUser = await new this.allquestionscollection(
      createAllquestionscollectionDto,
    );
    createdUser.save();
    return 'This action adds a new allquestionscollection';
  }

  findAll() {
    return `This action returns all allquestionscollection`;
  }
  //===================Find Documents fields================
  async findBanglaForReader() {
    const bangla = await this.allquestionscollection.find({
      subject: 'Bangla',
    });

    const shuffle = function (array) {
      let randomArr = [];
      let indexArr = [];
      let i = 0;
      while (i < array.length) {
        let randomNumber = Math.floor(Math.random() * array.length);
        if (!indexArr.includes(randomNumber)) {
          randomArr.push(array[randomNumber]);
          indexArr.push(randomNumber);
          i++;
        }
      }
      return randomArr; //
    };

    const randQuestion = shuffle(bangla);
    return randQuestion;
  }
  async findBangla() {
    const bangla = await this.allquestionscollection
      .find({ subject: 'Bangla' })
      .sort({ createdAt: -1 });
    return bangla;
  }

  async findEnglishForReader() {
    const english = await this.allquestionscollection.find({
      subject: 'English',
    });

    const shuffle = function (array) {
      let randomArr = [];
      let indexArr = [];
      let i = 0;
      while (i < array.length) {
        let randomNumber = Math.floor(Math.random() * array.length);
        if (!indexArr.includes(randomNumber)) {
          randomArr.push(array[randomNumber]);
          indexArr.push(randomNumber);
          i++;
        }
      }
      return randomArr; //
    };

    const randQuestion = shuffle(english);
    return randQuestion;
  }

  async findEnglish() {
    const english = await this.allquestionscollection
      .find({ subject: 'English' })
      .sort({ createdAt: -1 });
    return english;
  }

  //==================Update all documents================
  async findEnglishSingleQuestion(id: string) {
    const singleQuestion = await this.allquestionscollection.findById(id);
    return singleQuestion;
  }

  async updateEnglis(id: string, body): Promise<{ msg: string }> {
    await this.allquestionscollection.findByIdAndUpdate(id, body, {
      new: true,
    });
    return await {
      msg: `updates English questin with id no : ${id} (successfully)`,
    };
  }

  async multipleQue(allQuestionsInfo) {
    // const objis = ['6658affe887a446b95f8f1f5','665c8370dd2891bb02503f0d','665cac0dd39bdea364dc6406']
    // console.log(allQuestionsInfo.questionId)
    const falouriteQuestion = await this.allquestionscollection.find({
      _id: allQuestionsInfo.questionId,
    });
    const suckedQue =await falouriteQuestion.filter((newQuestion)=>newQuestion.subject == allQuestionsInfo.subject)
    return suckedQue;
  }

  findOne(id: number) {
    return `This action returns a #${id} allquestionscollection`;
  }

  update(
    id: number,
    updateAllquestionscollectionDto: UpdateAllquestionscollectionDto,
  ) {
    return `This action updates a #${id} allquestionscollection`;
  }

  remove(id: number) {
    return `This action removes a #${id} allquestionscollection`;
  }
  async searchQuestionByQuery(q){
    let option = {}
   if(q){
    option = {
      $or : [
        {subject : new RegExp(q.toLowerCase(),"i")},
        {question : new RegExp(q.toLowerCase(),"i")},
        {otherExamName : new RegExp(q.toLowerCase(),"i")},
      ]
    }
   }

    const data = this.allquestionscollection.find(option)

   return data
  }
}
