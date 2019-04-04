import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  // selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']

})
export class ShoppingListComponent implements OnInit {
  
 ingredients: Ingredient[];
 //shoppingListState: Observable<{ingredients: Ingredient[]}>;

  constructor(private shopingService:ShoppingListService, 
      private store: Store<{ShoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
  this.ingredients = this.shopingService.getIngredients();
  //this.shoppingListState = this.store.select('ShoppingList');
  
 
  }

  onEditIngredient(index:number) {
    this.shopingService.startedEditingIngredient.next(index);
  }
}
