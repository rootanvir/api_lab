import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

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
            throw new Error('Missing weather API configuration in .env file');
        }
    }

    async getWeather(city: string = 'Dhaka,BD') {
        const url = `${this.baseUrl}/weather`;

        const params = {
            q: city,
            appid: this.apiKey,
            units: 'metric',
            lang: 'en',
        };

        try {
            const response = await firstValueFrom(
                this.httpService.get(url, { params }),
            );
            return response.data;
        } catch (error: any) {
            console.error(
                'Weather API error:',
                error.response?.data || error.message,
            );
            throw new Error(`Failed to fetch weather data for ${city}`);
        }
    }
}