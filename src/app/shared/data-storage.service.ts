import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map } from "rxjs/operators";
import 'rxjs/add/operator/map';
import { Router } from "@angular/router";
@Injectable()
export class DataStorageService{
    map = map;
constructor(private http: Http,
            private recipeService : RecipeService ,
            private router: Router ){}

storeRecipes() { 
    this.http.post('https://colman-recipe.herokuapp.com/recipe/add',this.recipeService.getRecipe());
}

getRecipe() {
    // this.http.get('https://colman-recipe.herokuapp.com/recipe/getAll')
    // .map(
    //     (response: Response) =>{
    //         const recipes: Recipe[] = response.json();
    //         for(let recipe of recipes){
    //             if (!recipe['ingredients']){
    //                 recipe['ingredients'] = [];
    //             }
    //         }
    //     }
    // )
    // .subscribe(
    //     (recipes: Recipe[]) => {
    //         this.recipeService.setRecipe(recipes);
    //     }
    // );
}



checkUaer(Email: string, Password: string){
  this.http.post('https://colman-recipe.herokuapp.com/auth/login', { email: Email, password: Password})
    .map(req => req.json())
    .subscribe(
      // We're assuming the response will be an object
      // with the JWT on an id_token key
         data => {localStorage.setItem('id_token', JSON.stringify(data));
            //console.log(data);
            //debugger;
            if(data){this.router.navigate(['/recipes']);}
            else alert("Invalid email or password , please try again1");
           return data;
              
          },
          error => alert(error)

      
    );
  
}

register(firstName: string, lastName: string, email: string, password: string) {
    this.http.post('https://colman-recipe.herokuapp.com/auth/register', {firstName: firstName, lastName: lastName, email: email, password: password})
      .map(res => res.json())
      .subscribe(
        // We're assuming the response will be an object
        // with the JWT on an id_token key
        data1 => {localStorage.setItem('id_token', JSON.stringify(data1));
                this.router.navigate(['/signin']);
            },
        error => console.log(error)
      );
  }
  
}