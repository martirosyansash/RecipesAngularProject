import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy{
  newRecipeStatus: boolean = false;
  sub: Subscription;
  constructor(private recipeService: RecipeService) { }
  
  /////////////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.sub = this.recipeService.newRecipeSelected.subscribe(
      (newRecipeSelected: boolean) => {
        this.newRecipeStatus = newRecipeSelected;
      }
    );
  }

  //////////////////////////////////////////////////////////////////////////////4

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
