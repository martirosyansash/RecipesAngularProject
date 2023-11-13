import { Component , OnInit, OnDestroy} from '@angular/core';
import { Subscription, Observable } from "rxjs";
// import { Store } from '@ngrx/store'

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  // ingredients: Observable<{ ingredients: Ingredient[] }>;
  ingredients: Ingredient[] = [];
  private igChangeSub: Subscription;
  

  constructor(private slService: ShoppingListService,
              private loggingService: LoggingService
              // private store: Store<{ shoppingList: { ingredients: Ingredient[]} }>
              ){}

  ngOnInit(): void{
    // this.ingredients = this.store.select('shoppingList');
    this.ingredients = this.slService.getIngredtents();
    this.igChangeSub = this.slService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[])=>{
        this.ingredients = ingredients;
    })
      this.loggingService.printLog('Hello from ShoppingComponent from ngOninit');
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);

  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
