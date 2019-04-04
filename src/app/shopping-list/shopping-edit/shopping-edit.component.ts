import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.action'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy{
  serviceSubcription : Subscription;
  editingMode: boolean = false;
  editedIngredientIndex : number;
  editedIngredient : Ingredient;
  @ViewChild("f") form : NgForm;

  constructor(private shoppingListService: ShoppingListService, 
        private store: Store<{ShoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.serviceSubcription = this.shoppingListService.startedEditingIngredient.subscribe(
      (index: number)=>{
      this.editingMode = true;
      this.editedIngredientIndex = index;
      this.editedIngredient = this.shoppingListService.getIngredientById(index);
      this.form.setValue({
        'name': this.editedIngredient.name,
        'amount': this.editedIngredient.amount
      });
    });
  }

  onSubmit(form: NgForm){
    const value = form.value;
    if(this.editingMode){
      this.shoppingListService.updateIngredient(this.editedIngredientIndex, 
          new Ingredient(value.name, value.amount));
      //  this.store.dispatch(new ShoppingListActions.UpdateIngredient({
      //    index: this.editedIngredientIndex,
      //   ingredient: new Ingredient(value.name, value.amount) 
     // } ))
    }else{
      this.shoppingListService.addIngredient(new Ingredient(value.name, value.amount));/// without ngRx
    //  this.store.dispatch(new ShoppingListActions.AddIngredient(new Ingredient(value.name, value.amount)));

   

    }
    this.editingMode = false;
    form.reset();
  }

  onClear(){
    this.form.reset();
    this.editingMode = false;
  }
  
  onDelete(){
     this.shoppingListService.deleteIngredient(this.editedIngredientIndex);
   // this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedIngredientIndex));
    this.form.reset();
    this.editingMode = false;
   }

  ngOnDestroy(){
    this.serviceSubcription.unsubscribe();
  }
}
