import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorage: DataStorageService) { }

  ngOnInit() {
  }

  onSaveData(){
    this.dataStorage.saveRecipe()
    .subscribe(
      (response) => {
        console.log(response);

      },(error: any) => {
          console.log(error);
      });
    }

    fetchData(){
      this.dataStorage.getRecipe();
    }
}
