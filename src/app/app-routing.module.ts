import { NgModule } from "@angular/core";
import {Routes , RouterModule} from '@angular/router'
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
 import { SigninComponent } from "./auth/signin/signin.component"
 import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/autoguard";
import { StatisticsComponent } from "./statistics/statistics.component";

const appRoutes:Routes = [
    {path:'', redirectTo: '/recipes', pathMatch: 'full', canActivate: [AuthGuard]},
    {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children:[
        {path: '', component: RecipeStartComponent, canActivate: [AuthGuard]},
        {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard]},
        {path: ':id', component: RecipeDetailComponent, canActivate: [AuthGuard]},
        {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard]}
    ]},
    {path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard]},
    {path: 'signup', component: SignupComponent},
    {path: 'signin', component: SigninComponent},
    {path: 'statistics', component: StatisticsComponent}
    
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

})
export class AppRoutingModule{

}