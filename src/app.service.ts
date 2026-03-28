import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome!I just test my api here.';
  }
  getWeather(){
    
  }
}
