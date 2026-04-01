// src/weather/weather.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { WeatherResponse, OpenWeatherData } from './interfaces/weather.interface';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('API_KEY')!;
    this.baseUrl = this.configService.get<string>('BASE_URL')!;

    if (!this.apiKey || !this.baseUrl) {
      throw new Error('Weather API configuration missing in .env');
    }
  }

  async getWeather(city: string = 'Dhaka,BD'): Promise<WeatherResponse> {
    const url = `${this.baseUrl}/weather`;

    const params = {
      q: city,
      appid: this.apiKey,
      units: 'metric',
      lang: 'en',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get<OpenWeatherData>(url, { params }),
      );

      return {
        success: true,
        city: response.data.name,
        country: response.data.sys.country,
        data: response.data,
      };
    } catch (error: any) {
      console.error('Weather API error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch weather for ${city}`);
    }
  }
}