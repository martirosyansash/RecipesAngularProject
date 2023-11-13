import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  // isModalOpen$ = new BehaviorSubject<boolean>(false);
  isModalOpen$ = new Subject<boolean>();
  // isModalOpen: boolean = false;
  // onCallback;
  

  constructor() { }

  // setCallback(onCallback) { 
  //   this.onCallback = onCallback;
  // }

  closeModal() { 
    this.isModalOpen$.next(false);
    // this.isModalOpen$.next(false)
    // this.isModalOpen = false;
    // this.onCallback(this.isModalOpen);
  }

  openModal() { 
    this.isModalOpen$.next(true);
    // this.isModalOpen$.next(true);
    // this.isModalOpen = true;
    // this.onCallback(this.isModalOpen);
  }

}
