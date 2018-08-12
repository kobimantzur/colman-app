import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: String;
  categoriesList;
  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipe = this.recipeService.getCurrentRecipeDetails()
    console.log(this.recipe)
      this.route.params.subscribe(params => {
        this.id = params['id']; // (+) converts string 'id' to a number
        //TODO: call getById
        this.recipeService.getRecipeById(this.id)
        .subscribe(response => {
          this.recipe = response as Recipe;
        })
      });
      const categoriesList = this.recipeService.getCategories()
      .subscribe(categoriesList => {
        this.categoriesList = categoriesList;
      });
  }

  getCategory() {
      const recipeCategory =  this.categoriesList ? this.categoriesList.filter(x=> x._id === this.recipe.categoryId) : [];
      return recipeCategory[0] ? recipeCategory[0].title : ''; 
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);    
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo:this.route});
  }

  onDelete() {
    debugger;
    this.recipeService.deleteRecipe(this.recipe._id);
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

   onLikeRecipe(){
   this.recipeService.onLikePush(this.recipe.categoryId);
   }
}
