import { Component ,OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthGuard } from '../auth/autoguard';
import { WeatherData } from '../shared/weather-data.model';
import { WeatherService } from '../shopping-list/shopping-list-edit/weather.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
    weatherSubscription: Subscription;
    weatherData : WeatherData;

    constructor(public dataStorageService: DataStorageService ,
                 public authguard: AuthGuard,
                 private weatherService: WeatherService){
                    this.weatherData = new WeatherData('');
                 }

    ngOnInit() {
          this.weatherSubscription = this.weatherService.weatherDataSubject
           .subscribe(
              (weatherData : WeatherData) => {
               this.weatherData = weatherData;
            }
          );
         }

    onSaveData(){
        this.dataStorageService.storeRecipes();        
    }

    onFetchFata(){
        this.dataStorageService.getRecipe();
    }

    onLogout(){
        this.authguard.logout();
    }

    onGetWeather() {
        this.weatherService.getWeather();
      }

}