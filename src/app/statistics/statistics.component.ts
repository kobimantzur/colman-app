import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  public recipes: Recipe[];

  public lat: Number;
  public lng: Number;
  public title: String;
  public selectedOption: Recipe;

  constructor(public recipeService: RecipeService) {
  }

  ngOnInit() {
    this.getAllRecipes();
  }

  onSelectedRecipe() {
    this.title = this.selectedOption.name + "\n" + this.selectedOption.address;
    this.lat = Number(this.selectedOption.latitude);
    this.lng = Number(this.selectedOption.longitude);
  }

  getAllRecipes() {
   this.recipeService.getAllRecipes();
  }

}
