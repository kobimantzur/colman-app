import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable()
export class DataStorageService{
constructor(private http: Http, private recipeService : RecipeService){}

storeRecipes(){ 
    this.http.post('https://colman-recipe.herokuapp.com/recipe/add',this.recipeService.getRecipe());
}

getRecipe(){
    this.http.get('https://colman-recipe.herokuapp.com/recipe/getAll')
        
    .subscribe(
        (response: Response) => {
            const recipes: Recipe[] = response.json();
            this.recipeService.setRecipe(recipes);
        }
    );
}
}