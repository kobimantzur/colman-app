import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription
  public searchForm: FormGroup;
  public query = '';
  constructor(public recipeService: RecipeService,
              private router:Router,
              private route: ActivatedRoute) { 

                this.searchForm = new FormGroup({
                  'query': new FormControl(this.query, Validators.required),
                  });
              }

  ngOnInit() { 
     this.recipeService.getAllRecipes();

      this.subscription =  this.recipeService.recipeChanged
        .subscribe(
          (recipes: Recipe[]) =>{
            this.recipes = recipes;
          }
        )
      this.recipes = this.recipeService.getRecipe();
  }

  onSearch() {
    this.recipeService.getResults(this.searchForm.value.query)
    // .subscribe(response => {
    //   this.recipes = response as any[];
    // })
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo:this.route});
  }

  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }

  onItemClick(item) {
  }
}
