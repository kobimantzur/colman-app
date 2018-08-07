import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.modle";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService{
    recipeChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe' ,
         'This is simply test' ,
          'https://upload.wikimedia.org/wikipedia/commons/d/d3/Supreme_pizza.jpg',
        [
            new Ingredient('cheez' , 2),
            new Ingredient('bread', 2)
        ] )
      ];  

    constructor(private slService: ShoppingListService){}

    getRecipe(){
        return this.recipes.slice();
    }
    getrecipe(index: number){
        return this.recipes[index];
    }

    addIngredientToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}