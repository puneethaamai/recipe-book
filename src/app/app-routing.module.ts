import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {path:'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
    {path: '', component: HomeComponent},
    {path: "shoppingList", component:ShoppingListComponent},
    {path: 'signup', component: SignupComponent}

    //{path: "", redirectTo : "recipes", pathMatch: "full"}
    
  ];
  
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}