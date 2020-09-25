import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {LoginComponent} from "../../../auth-components/login/login.component";

@Component({
  selector: 'app-quests-layout',
  templateUrl: './syte-layout.component.html',
  styleUrls: ['./syte-layout.component.scss']
})
export class SyteLayoutComponent implements OnInit {

  isAuth;

  constructor(public auth: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.isAuth = !!localStorage.getItem('authToken');
    this.auth.getProfile()
  }

  showMenu() {
    let auth_menu = document.getElementById('auth_list').style;
    let sort = document.getElementById('sort');
    if (auth_menu.opacity === '1') {
      auth_menu.opacity = '0';
      auth_menu.top = '-23vh';
      sort.className = 'fas fa-sort-up';
    } else {
      auth_menu.opacity = '1';
      auth_menu.top = '6vh';
      sort.className = 'fas fa-sort-down';
    }
  }

  logOut() {
    this.auth.logOut();
    this.isAuth = !!localStorage.getItem('authToken');
    this.router.navigate(['/home'])
  }


  showNavMenu() {
    let aside = document.getElementById('aside').style

    aside.height === '0vh'
      ? aside.height = '89vh'
      : aside.height = '0vh'
  }


}
