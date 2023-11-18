import { Component, OnInit,OnDestroy  } from '@angular/core';
import { Recipe } from 'src/app/shared/recipe.model';
import { RecipeService } from '../recipe.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  id: number;
  paramsSubscription: Subscription;

  /////////////////////////////////////////////////////////////////////////////////////////
  
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  /////////////////////////////////////////////////////////////////////////////////////////
  
  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  /////////////////////////////////////////////////////////////////////////////////////////
  
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params)=>{
          this.id = +params["id"];
          this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  onEditRecipe(){
    this.router.navigate(["edit"], {relativeTo: this.route})
    this.router.navigate(["../", this.id, "edit"], {relativeTo: this.route})
  }
  
  /////////////////////////////////////////////////////////////////////////////////////////

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  ngOnDestroy() {
    // this.paramsSubscription.unsubscribe();
  }

  /////////////////////////////////////////////////////////////////////////////////////////
}
