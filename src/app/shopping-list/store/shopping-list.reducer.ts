import {Action}  from '@ngrx/store'
import { Ingredient } from 'src/app/shared/ingredient.model';
import  * as ShoppingListActions  from './shopping-list.action';

const initialState = {
    ingredients: [
        new Ingredient("Red Chilly", 5),
        new Ingredient("Butter", 10)
    ]
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions){
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {
            ...state,
            ingredients: [...state.ingredients, action.payLoad]
           
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
            ...state,
            ingredients: [...state.ingredients, ...action.payLoad]
           
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
        const ingrToBeUpdated = state.ingredients[action.payLoad.index];
        const updatedIngredient = {
            ...ingrToBeUpdated,
           ... action.payLoad
        };
        const ingredients = [...state.ingredients];
        ingredients[action.payLoad.index] = updatedIngredient;
        return {
            ...state,
            ingredients: ingredients
           
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            const oldIngredients = [...state.ingredients];
            oldIngredients.splice(this.action.payLoad, 1);
        return{
            ...state,
            ingredients: [...oldIngredients]
        }
        default:
            return state;
    }
 
}