import { Controller, Query, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {

    constructor (private readonly weatherService: WeatherService){}

    @Get()
    async getCurrentWeather(@Query('city') city?: string){
        const weatherData = await this.weatherService.getWeather(city);
        return{
            success: true,
            city: weatherData.name,
            country: weatherData.sys.country,
            data: weatherData,
        }
    }
}
