import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.modle';
import { WeatherData } from '../../shared/weather-data.model';
import { ShoppingListService } from '../shopping-list.service';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  weatherSubscription: Subscription;
  editMode = false;
  editedItemIndex : number;
  editedItem: Ingredient;
  weatherData : WeatherData;

  constructor(private slService: ShoppingListService,
              private weatherService: WeatherService) { 
                this.weatherData = new WeatherData('');
              }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
    this.weatherSubscription = this.weatherService.weatherDataSubject
      .subscribe(
        (weatherData : WeatherData) => {
          this.weatherData = weatherData;
        }
      );
  }

  onSubmitItem(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex , newIngredient);     
    } else { 
      this.slService.addIngredent(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);  
    this.onClear();
  }

  onGetWeather() {
    this.weatherService.getWeather();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
