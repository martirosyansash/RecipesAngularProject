import { Component , OnInit, OnDestroy} from '@angular/core';
import { Subscription } from "rxjs";

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[] = [];
  private igChangeSub: Subscription;
  activeIngredientIndex: number;
  
  /////////////////////////////////////////////////////////////////////////////////////

  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService
    ){}

  /////////////////////////////////////////////////////////////////////////////////////

  ngOnInit(): void{
    this.ingredients = this.slService.getIngredtents();
    this.igChangeSub = this.slService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[])=>{
        this.ingredients = ingredients;
    })
      this.loggingService.printLog('Hello from ShoppingComponent from ngOninit');
  }

  /////////////////////////////////////////////////////////////////////////////////////

  onEditItem(index: number){
    this.slService.startedEditing.next(index);
    this.activeIngredientIndex = index;
  }

  /////////////////////////////////////////////////////////////////////////////////////

  onDeactivatedIngredient(event: Event) {
    this.activeIngredientIndex = -1;
  }
  
  /////////////////////////////////////////////////////////////////////////////////////
  
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

}
