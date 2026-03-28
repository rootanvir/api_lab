import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,            
      envFilePath: 'key',    
    }),
    HttpModule,
    WeatherModule,
  ],
})
export class AppModule {}