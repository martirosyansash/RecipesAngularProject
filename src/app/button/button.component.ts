import { Component } from "@angular/core";

@Component({
    selector: 'app-button',
    template: `
    <hr>
    <div class="row">
        <div class="col-md-12">
            <button class="btn btn-danger">
                <ng-content select='div'></ng-content>
                -
                <ng-content select='[uzbek]'></ng-content>
            </button>
        </div>
    </div>
    `
  })
export class ButtonComponent{

}