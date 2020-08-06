import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import {Router,ActivatedRoute} from "@angular/router"
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TopbarComponent implements OnInit {
  public href: string = "";
    nameUser =  localStorage.getItem('nameUser');
    username = "";
    isChangeLanguage = false;
    logingoogle = localStorage.getItem('google');
  constructor(  private authService: AuthService,
                private route: Router,
                private translateService: TranslateService) { 
                     translateService.setDefaultLang('vn');
                }

  ngOnInit() {
 
          if(this.nameUser != null){
                this.username =  localStorage.getItem('nameUser');
          }
          if(this.isChangeLanguage){
            this.href = this.route.url;
            this.route.navigate([this.href])
          }
  }
   signOut(): void {
   
   
    if(this.logingoogle != null){
      this.authService.signOut();
    }
    this.route.navigate(['']);

  }
  switchLanguage(language: string) {
    this.translateService.use(language);
    this.isChangeLanguage =true;
  }
 
}