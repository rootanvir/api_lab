import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';        // ← This was missing
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';

@Module({
  imports: [HttpModule],        
  providers: [WeatherService],
  controllers: [WeatherController],
  exports: [WeatherService],    
})
export class WeatherModule {}