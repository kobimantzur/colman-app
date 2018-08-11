import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { finalize, tap } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.modle";
import { Http, Response } from "@angular/http";
import { RequestsService } from '../shared/requests.service';
import { ShoppingListService } from "../shopping-list/shopping-list.service";

// const BASE_API = 'http://localhost:2000/';
const BASE_API = 'https://colman-recipe.herokuapp.com/';
const GET_ALL_RECIPE_URL = BASE_API + 'recipe/getAll';
const ADD_RECIPE_URL = BASE_API + 'recipe/add';
const GET_RECIPE_BY_ID_URL = BASE_API + 'recipe/getRecipeById';
const DELETE_RECIPE_URL = BASE_API + 'recipe/delete';
const GET_CATEGORIES_URL = BASE_API + 'recipe/getCategories';
@Injectable()
export class RecipeService{
    recipeChanged = new Subject<Recipe[]>();
    private currentRecipeDetails:Recipe;
    private recipesList = [];
    public categoriesList = [];
    constructor(private slService: ShoppingListService, public http: Http, public requestsService: RequestsService,private router: Router){
    
    }

    setRecipe(recipes: Recipe[]){
    }

    getRecipe(){
    }

    getCategories() {
        return this.requestsService.getRequest(GET_CATEGORIES_URL, null)
    }
    getrecipe(index: String){
        const filteredRecipes = this.recipesList.filter( x=> x._id === index);
        return filteredRecipes[0];
    }

    getRecipeById(recipeId: String) {
        return this.requestsService.getRequest(GET_RECIPE_BY_ID_URL + '?recipeId=' + recipeId, null);
    }

    getRecipesList() {
        return this.recipesList;
    }

    setCurrentRecipeDetails(recipe) {
        
        this.currentRecipeDetails = recipe;
        this.router.navigate(['/recipes/' + recipe._id])
    }

    getCurrentRecipeDetails() {
        return this.currentRecipeDetails;
    }

    addIngredientToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }
    

    addRecipe(recipe: Recipe) {
        this.requestsService.postRequest(ADD_RECIPE_URL, recipe)
        .subscribe(response =>{
            //Add the response object to the recipes arr
            this.recipesList.push(response);
        });
    }

    getAllRecipes() {
        this.requestsService.getRequest(GET_ALL_RECIPE_URL, null)
        .subscribe(response => {
            
            this.recipesList = response as Recipe[];
        });
    }

    updateRecipe(index: String, newRecipe: Recipe){
        //TODO: call recipe/edit
    }

    deleteRecipe(recipeId: String) {
        //TODO: call recipe/delete
        this.requestsService.postRequest(DELETE_RECIPE_URL, {recipeId})
        .subscribe(response => {
            //TODO: do something
            this.recipesList = this.recipesList ? this.recipesList.filter(x=> x._id != recipeId) : [];
        })
    }
}