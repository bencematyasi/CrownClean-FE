import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../services/login_service/login.service';
import { TokenService } from '../services/token_service/token.service';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { throwMatDuplicatedDrawerError } from '@angular/material';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  subscriptionIsLoggedIn: Subscription;
  subscriptionIsAdmin: Subscription;
  loggedIn: boolean;
  isAdmin: boolean;
  firstName: string;

  constructor(private loginService: LoginService,
              private tokenService: TokenService,
              private router: Router) { }

  ngOnInit() {
    this.subscriptionIsLoggedIn = this.tokenService.isLoggedIn
      .pipe(
        switchMap(isLoggedIn => {
          this.loggedIn = isLoggedIn;
          return this.tokenService.getUserFromToken();
        })
      ).subscribe(user => {
          this.firstName = user ? user.firstName : '';
      });
      this.tokenService.isAdmin.subscribe(admin => {
        this.isAdmin = admin;
      });
  }

  ngOnDestroy(): void {
    this.subscriptionIsLoggedIn.unsubscribe();
  }

  onLogout(event) {
    this.loginService.logout()
      .pipe(
        take(1)
      ).subscribe(() => {
        this.loggedIn = false;
    });
    this.router.navigateByUrl('/');
  }

}
