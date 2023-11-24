import { Component , OnDestroy, OnInit} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from "@angular/router"
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit , OnDestroy {
  id: number ;
  editmode: boolean = false;
  recipeForm: FormGroup;
  // sub: Subscription;

  /////////////////////////////////////////////////////////////////////

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) { 
  }

  //////////////////////////////////////////////////////////////////////////////////

  ngOnInit() {
     this.recipeService.editIndex.subscribe(
      (editIndex: number) => { 
        this.id = editIndex;
        console.log(this.id); 
      }
    )
    this.route.params
      .subscribe(
        (params: Params)=>{
          // this.id = params["id"];
          // console.log(this.id);
          this.editmode = params["id"] == null;
          console.log(this.editmode);
          this.initForm();
        }
      )
  }

  //////////////////////////////////////////////////////////////////////////////////

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = "";
    let recipeIngredints = new FormArray([]);

    if(this.editmode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if(recipe['ingredients']){
        for(let ingtredient of recipe.ingredients){
          recipeIngredints.push(new FormGroup({
            'name': new FormControl(ingtredient.name, Validators.required),
            'amount': new FormControl(ingtredient.amount, [
              Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }))
        }
      }
    }
    this.recipeForm = new FormGroup({
        'name': new FormControl(recipeName, Validators.required),
        'imagePath': new FormControl(recipeImagePath, Validators.required),
        'description': new FormControl(recipeDescription, Validators.required),
        'ingredients' : recipeIngredints
    })
  }

  //////////////////////////////////////////////////////////////////////////////////

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if(this.editmode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    }else{
      this.recipeService.addRecipe(this.recipeForm.value)
    }
      this.onCencel();
  }

  //////////////////////////////////////////////////////////////////////////////////

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null,[
          Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
      })
    )
  }

  //////////////////////////////////////////////////////////////////////////////////

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  //////////////////////////////////////////////////////////////////////////////////

  onCencel(){
    // this.router.navigate(['../'], { relativeTo: this.route });
    this.recipeService.newRecipeSelected.next(false);
  }

  //////////////////////////////////////////////////////////////////////////////////

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  //////////////////////////////////////////////////////////////////////////////////

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }
} 
