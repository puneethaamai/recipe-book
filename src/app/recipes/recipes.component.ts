import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import { Subscription } from 'rxjs';

@Component({
  // selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})

export class RecipesComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;
  subcription: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
     this.subcription = this.recipeService.recipeSelected
     .subscribe(
       (recipe:Recipe)=> {this.selectedRecipe = recipe;}
       );
  }

ngOnDestroy(){
  this.subcription.unsubscribe();
}
}
