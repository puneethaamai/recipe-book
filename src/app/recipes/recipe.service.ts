
import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService{
   recipeSelected = new EventEmitter<Recipe>();
   recipeChanged = new Subject();

   constructor(private shoppingListService: ShoppingListService){}
  
    private recipes: Recipe[] = [
        new Recipe("Chicken curry", 
        "This is an easy recipe for Chicken Tikka Masala--chicken marinated in yogurt and spices"+ 
        " and then served in a tomato cream sauce. Serve with rice or warm pita bread.", 
        
        "https://www.seriouseats.com/recipes/images/2011/12/20111227-indian-curry-610.jpg",
        
        [ 
            new Ingredient("Chicken", 2),
            new Ingredient("Chicken Masala", 2),

        ]
        
        ),
      
        new Recipe("Butter Chicken",
         "Butter Chicken! The name alone can make you want to enjoy this ever-so-popular Indian dish. Butter Chicken "+
         "continues to be hit amongst Indians and foreigners alike."+
          "This recipe of Butter Chicken from Moti Mahal is easy to follow and makes for an instant conversation-starter! Marinated overnight, "+
          "A perfect dinner party recipe, this North-Indian style chicken recipe is made throughout the country.", 
        
          "https://i.ndtvimg.com/i/2015-01/butter-chicken_625x350_71421325695.jpg",
          
          [ 
              new Ingredient("Chicken", 2),
              new Ingredient("Butter", 6),
            ]
          ),
          
        
        new Recipe("Kakori Kebab",
        "A famous Nawabi recipe from Lucknow passed down through generations. It derives its name from the "+
        "city of Kakori on the outskirts of Lucknow. "+
        "It is made with the finest meat of the lamb and a few spices."+
        " These kebabs are soft and tender, served best with coriander chutney.",
       
        "https://i.ndtvimg.com/i/2016-03/kakori-kebabs-625_625x350_41459348085.jpg",
       
        [
             new Ingredient("red chilly", 10),
             new Ingredient("Potato", 2),
             new Ingredient("Oil", 1)
            ]
        ),
        
      ]; 
     
       setRecipe(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
       }

      getRecipe(){
          return this.recipes.slice(); //passing copy of recipe object
      }

      getRecipeById(index: number){
        return this.recipes[index];
    }

      addIngedientToShoppingList(ingredient: Ingredient[]){
        this.shoppingListService.addIngredientToShoppingList(ingredient);
     }

     addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
     }

     updateRecipe(index: number, newRecipe: Recipe){
      this.recipes[index] = newRecipe;
      this.recipeChanged.next(this.recipes.slice());
     }

     deleteRecipe(index: number){
       this.recipes.splice(index, 1);
       this.recipeChanged.next(this.recipes.slice());
     }
}