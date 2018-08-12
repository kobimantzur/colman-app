import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: String;   
  editMode =  false;
  public recipeForm: FormGroup;
  public categoriesList;
  private categoryId = '';
  
  constructor(private router: ActivatedRoute,
              private recipeService: RecipeService,
              fb: FormBuilder,
              private route: Router) {
                this.categoriesList = []
                this.recipeForm = fb.group({
                  'name': ['', Validators.compose([Validators.required])],
                  'description': ['', Validators.compose([Validators.required])],
                  'imagePath': ['', Validators.compose([])],
                  'latitude': ['', Validators.compose([])],
                  'longitude': ['', Validators.compose([])],
                  'address': ['', Validators.compose([])],
                  'categoryId': [''],
                })

               }

  ngOnInit() {
    const categoriesList = this.recipeService.getCategories()
    .subscribe(categoriesList => {
      this.categoriesList = categoriesList;
    });
    this.router.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode  = params['id'] != null;
        this.initForm();
      }
    );
  }

  getCategories() {
    return this.categoriesList || [];
  }

  getRecipeCategory() {
    const selectedCategory = this.categoriesList ? this.categoriesList.filter(x=> x._id === this.categoryId) : [];
    return selectedCategory[0] ? selectedCategory[0].title : '';
  }

  getCategoryId() {
    return this.categoryId;
  }

  onSubmit(formObject){
    const formData = {...formObject.value};

    if(this.editMode){
      this.recipeService.updateRecipe({...this.recipeForm.value, _id: this.id});
    }else{
      this.recipeService.addRecipe(formData);
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )    
  }

  onCancel(){
    this.route.navigate(['../'], {relativeTo:this.router});
  }

  onDeleteUngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm(){

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    let latitude = '';
    let longitude = '';
    let address = '';
    if(this.editMode){
      const recipe = this.recipeService.getrecipe(this.id);
      if (!recipe) return;
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      latitude = recipe.latitude;
      longitude = recipe.longitude;
      address = recipe.address;
      this.categoryId = recipe.categoryId;
      // if(recipe['ingredients']){
      //   for(let ingredient of recipe.ingredients){
      //     recipeIngredients.push(
      //       new FormGroup({
      //         'name': new FormControl(ingredient.name, Validators.required),
      //         'amount': new FormControl(ingredient.amount, [
      //           Validators.required,
      //           Validators.pattern(/^[1-9]+[0-9]*$/)
      //         ])
      //       })
      //     );
      //   }
      // }
    }

    this.recipeForm = new FormGroup({
    'name': new FormControl(recipeName, Validators.required),
    'imagePath': new FormControl(recipeImagePath, Validators.required),
    'description': new FormControl(recipeDescription, Validators.required),
    'ingredients': recipeIngredients,
    'address': new FormControl(address),
    'latitude': new FormControl(latitude),
    'longitude': new FormControl(longitude),
    'categoryId': new FormControl(this.recipeService.categoriesList),
    });
  }

}
