import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.config';
import { KeyboardModule } from './keyboard/keyboard.module';
import { KeycapModule } from './keycap/keycap.module';
import { SwitchesModule } from './switches/switches.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    AuthModule,
    UserModule,
    KeyboardModule,
    KeycapModule,
    SwitchesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
