import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs-compat/Subscription';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost : PlaceholderDirective;
  private closeSub: Subscription;
  ///////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private authService: AuthService,
              private router: Router, 
              private componentFactoryResolver: ComponentFactoryResolver ){}
  ///////////////////////////////////////////////////////////////////////////////////////////////
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////
  onSubmit(form: NgForm){
    let authObs : Observable<AuthResponseData>;
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    if(this.isLoginMode){
      authObs = this.authService.login(email,password);
    }else{
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      errorMessage => {
        console.log(errorMessage);
        this.showErrorAlert(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      });
    form.reset();
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////
  private showErrorAlert(message){
    const alertComponentfactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertComponentfactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })

  }
  ///////////////////////////////////////////////////////////////////////////////////////////////
  onHandleError(){
    this.error = null;
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////
  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
}
