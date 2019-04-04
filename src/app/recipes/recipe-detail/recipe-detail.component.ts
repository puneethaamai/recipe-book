import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.action';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 recipe: Recipe;
 recipeId: number;
  
  constructor(private recipeService: RecipeService, 
    private route: ActivatedRoute, private router: Router,
    private store : Store<{ShoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    const id  = this.route.params.subscribe(
      (params: Params) => {
      this.recipeId = +params['id'];
      this.recipe = this.recipeService.getRecipeById(this.recipeId);
    });
  }

  addToShoppingList(){
    this.recipeService.addIngedientToShoppingList(this.recipe.ingredients); // without ngrx;
   //this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
   this.router.navigate(['/shoppingList']);

  }

  onEditRecipe(){
    
    this.router.navigate(['edit'], {relativeTo: this.route});
   // this.router.navigate(['../', this.recipeId, 'edit'],{ relativeTo: this.route})
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
