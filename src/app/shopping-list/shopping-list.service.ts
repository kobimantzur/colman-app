import { Ingredient } from "../shared/ingredient.modle";
import { Subject } from 'rxjs/Subject';

export class ShoppingListService{
    ingerdientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatos', 10)
      ];

    getIngrident(){
        return this.ingredients.slice(); 
    }
    getIngredient(index: number){
        return this.ingredients[index];
    }

    addIngredent(ingredient: Ingredient){
        this.ingredients.push(ingredient);     
        this.ingerdientChanged.next(this.ingredients.slice());   
    }

    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingerdientChanged.next(this.ingredients.slice());       

    }

    updateIngredient(index: number , editingredient: Ingredient){
        this.ingredients[index] = editingredient;
        this.ingerdientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingerdientChanged.next(this.ingredients.slice());
    }
}