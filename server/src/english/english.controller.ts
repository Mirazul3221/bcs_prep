import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
// import { CreateEnglishDto } from './dto/create-english.dto';
import { EnglishService } from './english.service';
import { CreateEnglishDto } from './dto/create-english.dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { AuthGuard } from '@nestjs/passport';

@Controller('english')
export class EnglishController {
  constructor(private readonly englishService: EnglishService) {}

  @Post('/add')
  @FormDataRequest({storage:FileSystemStoredFile})
 async create(@Body() createEnglishDto: CreateEnglishDto) {
  console.log(createEnglishDto)
    return await this.englishService.create(createEnglishDto);
  }

  @Get('/find')
  async findAll() {
    return await this.englishService.findAll();
  }

  // @Get()
  // findAll() {
  //   return this.banglaService.findAll();
  // }

  @Get('find/:id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.englishService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBanglaDto: UpdateBanglaDto) {
  //   return this.banglaService.update(+id, updateBanglaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.banglaService.remove(+id);
  // }
}
