import { Component, OnInit, OnDestroy, Input  } from '@angular/core';
import { Recipe } from 'src/app/shared/recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router} from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  id: number ;
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
          // console.log(this.id);
          this.recipe = this.recipeService.getRecipe(this.id);
          // this.recipeService.editIndex.next(this.id);
      }
    );
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  onEditRecipe(){
    // this.router.navigate(["edit"], { relativeTo: this.route });
    // this.router.navigate(["../", this.id, "edit"], { relativeTo: this.route });
    this.recipeService.newRecipeSelected.next(true);
    this.recipeService.editIndex.next(this.id);
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
