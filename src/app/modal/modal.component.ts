import {Component, OnDestroy, OnInit} from '@angular/core'
import { ModalService } from './modal.service';
import { Subscription } from 'rxjs';
// import { Observable } from 'rxjs';
@Component({
    selector: 'app-modal',
    templateUrl:'../modal/modal.component.html',
    styleUrls: ['../modal/modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
    // isModalOpen$: Observable<boolean>;
    sub: Subscription;
    isOpen : boolean;

    constructor(private modalService: ModalService) { 
        this.sub = modalService.isModalOpen$.subscribe(
            (isModalOpen: boolean) => { 
                this.isOpen = isModalOpen;
            }
        );
        // this.isModalOpen$ = modalService.isModalOpen$;
        // modalService.setCb((isModalOpen:boolean) => { 
        //     this.isModal = isModalOpen;
        // })
        // modalService.setCallback((isModalOpen: boolean) => { 
        //     this.isOpen = isModalOpen;
        // });
        
    }
    ngOnInit(): void {
        
    }
    
    onClose() { 
        this.modalService.closeModal();
    }
    
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
    
}