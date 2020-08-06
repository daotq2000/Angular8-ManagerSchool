import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router"
import { FormControl,FormGroup } from "@angular/forms";
import { FormBuilder, Validators } from '@angular/forms';
import {UserService} from '../user.service';
import {User} from '../user';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginwithGoogle = null;
 user: SocialUser;
 isLoginGoole :boolean = false;
      loginForm: FormGroup;
    submitted = false;
    message: string = '';
 

  constructor(
    private route: Router,
     private activateRoute:ActivatedRoute,
     private UserService:UserService,
     private formBuider:FormBuilder,
     private authService: AuthService
  ) {  }

  ngOnInit() {
    
     this.authService.authState.subscribe((user) => {
      this.user = user;
       if(this.isLoginGoole){
         this.loginwithGoogle = "true";
         localStorage.setItem("google",this.loginwithGoogle);
         localStorage.setItem('nameUser',String(user.name));
       this.route.navigate(['home/index']);
       }else{
          this.route.navigate([''])
       }
    });
    this.loginForm = this.formBuider.group({
        username: ['', Validators.required],
        password:['',Validators.required],
        acceptTerms: [true,Validators.requiredTrue]
    });
 
  }
   get f() { return this.loginForm.controls; }
  login(){
    this.submitted = true ;
     if(this.loginForm.invalid){
       return ;
     }

 this.UserService.login(this.loginForm.value.username).subscribe(data =>{
            if(this.loginForm.value.username == data.username && this.loginForm.value.password == data.password){
              localStorage.setItem('nameUser',String(data.name));
              this.route.navigate(['home/index']);
            }else{
              this.message = 'Tài Khoản Hoặc Mật Khẩu không đúng';
               this.route.navigate(['']);
            }
      });
  }

  signInWithGoogle(): void {
    let user = [];
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => 
    console.log(x)
    );
      this.isLoginGoole = true;
  }
    signOut(): void {
    this.authService.signOut();
    
  }
  
}