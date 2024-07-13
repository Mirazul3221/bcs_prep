import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, Req } from '@nestjs/common';
import { AllquestionscollectionService } from './allquestionscollection.service';
import { CreateAllquestionscollectionDto } from './dto/create-allquestionscollection.dto';
import { UpdateAllquestionscollectionDto } from './dto/update-allquestionscollection.dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
@Controller('allquestionscollection')
export class AllquestionscollectionController {
  constructor(private readonly allquestionscollectionService: AllquestionscollectionService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  @FormDataRequest({storage:FileSystemStoredFile})
  create(@Body() createAllquestionscollectionDto : CreateAllquestionscollectionDto) {
    return this.allquestionscollectionService.create(createAllquestionscollectionDto);
  }

  @Get("find")
  findAll() {
    return this.allquestionscollectionService.findAll();
  }
  //============BANGLA================
  @Get("banglaforeader")
  findBanglaQuestionsFoReader() {
    return this.allquestionscollectionService.findBanglaForReader();
  }
  @Get("bangla")
  findBanglaQuestions() {
    return this.allquestionscollectionService.findBangla();
  }
  //============ENGLISH================

  @Get("englishforeader")
  findEnglishQuestionsFoReader() {
    return this.allquestionscollectionService.findEnglishForReader();
  }
  @Get("english")
  findEnglishQuestions() {
    return this.allquestionscollectionService.findEnglish();
  }

  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.allquestionscollectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAllquestionscollectionDto: UpdateAllquestionscollectionDto) {
    return this.allquestionscollectionService.update(+id, updateAllquestionscollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.allquestionscollectionService.remove(+id);
  }

  //=================UPDATE DOCUMEN=========================
  @Get('english/find/:id')
  // @UseGuards(AuthGuard())
  async findEnglishSingleQuestion(@Param('id') id: string) {
    return await this.allquestionscollectionService.findEnglishSingleQuestion(id);
  }

  @Patch('updatenglish/:id')//
  async updateEnglish(@Param('id') id: string, @Body() body) : Promise<{msg:string}> {
    console.log(id,body)
    return await this.allquestionscollectionService.updateEnglis(id, body);
  }

  //========================================//
  //==========FAVOURITE-QUESTIONS============//
  //=========================================//
  @Post('myallfavouritequestions')
  multipleQue(@Body() allQuestionsInfo) {
    return this.allquestionscollectionService.multipleQue(allQuestionsInfo);
  }
  
  @Get('api/search/:value')
 async searchQuestionByQuery(@Param("value") param){
     return this.allquestionscollectionService.searchQuestionByQuery(param)
  } 
}
