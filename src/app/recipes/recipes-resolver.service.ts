import { DataStorageService } from "../shared/data-storage.service";
import {ResolveData,  ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router'
import { Recipe } from "../shared/recipe.model";
import { Injectable } from "@angular/core";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorageService: DataStorageService, 
                private recipeService: RecipeService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipeService.getRecipes();

        if(recipes.length === 0){
            return this.dataStorageService.fetchRecipes();
        }else{
            return recipes;
        }
        
    }
}