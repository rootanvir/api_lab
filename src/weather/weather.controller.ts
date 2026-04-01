// src/weather/weather.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherResponse } from './interfaces/weather.interface';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query('city') city?: string): Promise<WeatherResponse> {
    const weatherData = await this.weatherService.getWeather(city);

    return weatherData;   // ← Just return it directly (no need to rebuild)
  }
}