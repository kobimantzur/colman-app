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
  public selectedRecipe: Recipe;

  constructor(public recipeService: RecipeService) {
  }

  ngOnInit() {
    this.getAllRecipes();
  }

  onSelectedRecipe() {
    this.title = this.selectedRecipe.name + "\n" + this.selectedRecipe.address;
    this.lat = Number(this.selectedRecipe.latitude);
    this.lng = Number(this.selectedRecipe.longitude);
  }

  getAllRecipes() {
   this.recipeService.getAllRecipes();
  }

}
