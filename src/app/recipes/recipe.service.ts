import { EventEmitter, Injectable} from "@angular/core"
import { Subject } from "rxjs/Subject";
import {BehaviorSubject} from "rxjs"
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "../shared/recipe.model";

import { ShoppingListService } from "../shopping-list/shopping-list.service";
@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>()
    newRecipeSelected = new Subject<boolean>();
    // editmode = new EventEmitter<boolean>();
    editIndex = new BehaviorSubject<number>(null);
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         "Tasty Schnitzel", 
    //         "a super-Tasty Schnitzel just awesome!", 
    //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREkBGczT4gjfk2F6HdOesSY3si5QKIN6NkuQ&usqp=CAU",[
    //             new Ingredient("Meat", 1),
    //             new Ingredient("French Fries", 20),

    //         ] ),
    //     new Recipe(
    //         "Big Fat Burger", 
    //         "What else you need say?", 
    //         "https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg",
    //         [
    //             new Ingredient("Buns", 2),
    //             new Ingredient("Meat", 1),
    //         ] )
    // ];
    private recipes: Recipe[] = [];
    
    ///////////////////////////////////////////////////////////////////////

    constructor(private slService: ShoppingListService){}

    ///////////////////////////////////////////////////////////////////////

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    ///////////////////////////////////////////////////////////////////////

    getRecipes(){
        return this.recipes.slice();
    }

    ///////////////////////////////////////////////////////////////////////

    getRecipe(index: number){
        return this.recipes[index];
    }

    ///////////////////////////////////////////////////////////////////////

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    ///////////////////////////////////////////////////////////////////////

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    ///////////////////////////////////////////////////////////////////////

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    ///////////////////////////////////////////////////////////////////////

    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }

    ///////////////////////////////////////////////////////////////////////
}