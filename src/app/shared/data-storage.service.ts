import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

import {map } from 'rxjs/operators'
 
@Injectable()
export class DataStorageService{

    constructor(private httpClient: HttpClient, private recipeService: RecipeService){}


    saveRecipe(){
    //    return this.httpClient.put('https://angularproject-26e33.firebaseio.com/recipes.json',
    //     this.recipeService.getRecipe());

    //          OR
        
    const req = new HttpRequest('PUT', 'https://angularproject-26e33.firebaseio.com/recipes.json', 
    this.recipeService.getRecipe(), {reportProgress: true});
        return this.httpClient.request(req);
    }

    getRecipe(){
        return this.httpClient.get<Recipe[]>('https://angularproject-26e33.firebaseio.com/recipes.json')
        .pipe(
            map((recipes)=>{
                for(const recipe of recipes){
                    if(!recipe.ingredients){
                        recipe.ingredients =[];
                    }
                }

                return recipes;
            })
        )
        .subscribe((recipes)=>{
            this.recipeService.setRecipe(recipes);
        });
    }
}