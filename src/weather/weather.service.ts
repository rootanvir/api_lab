import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
    private readonly apiKey: string = '858b4c21fec81b2d0bd3c0ec6ed5ed54';
    private readonly baseUrl: string = 'https://api.openweathermap.org/data/2.5';

    constructor(private readonly httpService: HttpService) {}

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
        } catch (error) {
            console.error(
                'Weather API error:',
                error.response?.data || error.message,
            );
            throw new Error('Failed to fetch weather data');
        }
    }
}