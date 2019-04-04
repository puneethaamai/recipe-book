import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeId: number;
  editMode: boolean = false;
  recipeForm : FormGroup;
 

  //recipe : Recipe;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,private  router: Router ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = +params["id"];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm(){
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let recipeIngredient = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipeById(this.recipeId);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if(recipe.ingredients){
        for( let ingredient of recipe.ingredients){
          recipeIngredient.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9][0-9]*$/)
            ])
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': recipeIngredient
    });

  }

  onSubmit(){
       if(this.editMode){
         this.recipeService.updateRecipe(this.recipeId, this.recipeForm.value);
       } else{
         this.recipeService.addRecipe(this.recipeForm.value);
       }
       this.router.navigate(['../'], {relativeTo :this.route})
  }


  onAddIngredient() {
  (<FormArray> this.recipeForm.get('ingredients')).push(
    new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'amount' : new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9][0-9]*$/)
      ])
    })
  );
  }

  get formData() { 
    return <FormArray>this.recipeForm.get('ingredients'); 
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo :this.route});
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
