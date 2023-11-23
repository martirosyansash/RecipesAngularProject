import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common"
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import { ModalService } from './modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BasicAngularProject';
  /////////////////////////////////////////////////////////////////////////////////////////

  constructor(
    private authService: AuthService,
    private loggingService: LoggingService,
    private modalService: ModalService,
    @Inject(PLATFORM_ID) private platformId 
  ) { }

  /////////////////////////////////////////////////////////////////////////////////////////

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) { 
      this.authService.autoLogin();
    }
    this.loggingService.printLog('Hello from AppComponent from ngOnInit');
  }
  
  /////////////////////////////////////////////////////////////////////////////////////////

  onOpenModal() {
    this.modalService.openModal();
  }
  
  /////////////////////////////////////////////////////////////////////////////////////////
  
}
