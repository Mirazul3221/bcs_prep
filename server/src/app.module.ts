import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BanglaModule } from './bangla/bangla.module';
import { EnglishModule } from './english/english.module';
import { MathModule } from './math/math.module';
import { GalleryModule } from './gallery/gallery.module';
import { MyProfileModule } from './userprofile/myprofile.module';
import { SavequestionsModule } from './savequestions/savequestions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.db_uri, {
      dbName: 'MCQReader',
    }),
    AuthModule,
    BanglaModule,
    EnglishModule,
    MathModule,
    GalleryModule,
    MyProfileModule,
    SavequestionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
//
