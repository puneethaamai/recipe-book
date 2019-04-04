import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService{
    
    startedEditingIngredient = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient("Red Chilly", 5),
        new Ingredient("Butter", 10)
      ];
    
      //ingredientList = new EventEmitter<Ingredient>();
      constructor() { }
    
    
      addIngredient(ingredients:Ingredient){
         this.ingredients.push(ingredients);
      }

      updateIngredient(index:number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
      }

      deleteIngredient(index:number){
        this.ingredients.splice(index, 1);
      }

      getIngredientById(index:number) {
        return this.ingredients[index];
      }

      getIngredients(){
          return this.ingredients;
      }

      addIngredientToShoppingList(ingredients:Ingredient[]){
        // for(let ingredient of ingredients){
        //     this.ingredients.push(ingredient);
        // } or
         
        this.ingredients.push(...ingredients);
      }

}