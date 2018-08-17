import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { WeatherData } from '../../shared/weather-data.model';


@Injectable()
export class WeatherService{

    weatherData : WeatherData;
    weatherDataSubject = new Subject<WeatherData>();
    constructor (private http: Http) {
        this.weatherData = new WeatherData('');
    };
    
    getWeather(){
        var url = 'http://api.openweathermap.org/data/2.5/forecast?id=294640&APPID=6a0f2e776cccea51a5cec2d8264f5882&units=metric';
        this.http.get(`${url}`).subscribe((response : Response) => {
            var temp = response.json()['list'][0]['main']['temp'];
            this.weatherData.temp = temp;
            this.weatherDataSubject.next(this.weatherData);
        });
    }
}