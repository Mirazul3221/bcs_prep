import { Module } from '@nestjs/common';
import { AllquestionscollectionService } from './allquestionscollection.service';
import { AllquestionscollectionController } from './allquestionscollection.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { allquestionscollection_model, allquestionscollection_schema } from './schema/allquestionscollection.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
        {name:allquestionscollection_model,
          schema : allquestionscollection_schema
        }
    ]),
    NestjsFormDataModule
  ],
  controllers: [AllquestionscollectionController],
  providers: [AllquestionscollectionService],
})
export class AllquestionscollectionModule {}
