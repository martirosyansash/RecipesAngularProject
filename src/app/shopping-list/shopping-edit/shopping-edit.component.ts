import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store'
// import * as ShoppingListActions from '../store/shopping-list.actions'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
  
export class ShoppingEditComponent implements OnInit, OnDestroy{
  /////////////////////////////////////////////////////////////////////////////////
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editItem: Ingredient;
  /////////////////////////////////////////////////////////////////////////////////
  constructor(
    private slService: ShoppingListService,
    // private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) { }
  /////////////////////////////////////////////////////////////////////////////////
  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number)=>{
        this.editMode = true;
        this.editedItemIndex = index;
        this.editItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        })
      }
    )
  } 
  /////////////////////////////////////////////////////////////////////////////////
  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient)
    }else{
      this.slService.addIngredient(newIngredient);
      // this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }
  /////////////////////////////////////////////////////////////////////////////////
  onDelete(){
    this.onClear();
    this.slService.deleteIngredient(this.editedItemIndex)
  }
  /////////////////////////////////////////////////////////////////////////////////
  onClear(){
    this.editMode = false;
    this.slForm.reset();
  }
  /////////////////////////////////////////////////////////////////////////////////
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
