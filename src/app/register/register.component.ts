import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { LoginService } from '../shared/services/login_service/login.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    PhoneNumber: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl(Validators.required, Validators.minLength(6)),
    IsCompany: new FormControl(''),
    Address: new FormControl(''),
    TaxNumber: new FormControl({value: '', disabled: true})
  });

  enabled = false;
  userIsCompany = false;

  constructor(private router: Router,
              private loginService: LoginService,
              private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.signUpForm.get('IsCompany').setValue(false);

    this.signUpForm.patchValue({
      FirstName: 'John',
      LastName: 'Johnson',
      PhoneNumber: '+45552521130',
      Email: 'john.johnson@mail.dk',
      Password: 'Password123',
      IsCompany: false,
      IsAdmin: true,
      Address: 'Address str 1'
    });
  }

  changeCompanySelection() {
    this.userIsCompany = !this.userIsCompany;
    if (this.userIsCompany) {
      console.log('User is a company!');
      this.signUpForm.get('TaxNumber').enable();
    } else {
      console.log('User is not a company!');
      this.signUpForm.get('TaxNumber').disable();
    }
  }

  register() {
    const user = this.signUpForm.value;
    user.IsCompany = this.signUpForm.get('IsCompany').value;
    this.loginService.register(user).subscribe(response => {
      if (response) {
        this.openSnackBar('Successfull registration', 1500);
        this.router.navigateByUrl('/');
      } else {
        this.openSnackBar('Registration failed', 1500);

      }},
      error => {
        this.openSnackBar(error.message, 1500);
        console.log(error);
      }
    );
  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, 'OK', {
      duration: duration,
    });
  }
}
