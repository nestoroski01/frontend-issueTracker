import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from '../../shared/services/global.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.class';
import { Router } from '@angular/router';
import { ValidationMessagesService } from '../../shared/services/validation-messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  emailValidationMessage: String;
  passwordValidationMessage: String;

  constructor(private userService: UserService, private globalService: GlobalService, private formBuilder: FormBuilder,
  private router: Router, private validationService: ValidationMessagesService) { }

  ngOnInit() {
    this.initializeLoginForm();
    this.checkForValidationErrors();
  }

  initializeLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login() {
    let loginObject = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    }
    this.userService.loginUser(loginObject).subscribe((user: User) => {
      this.globalService.setUser(user[0]);
      this.globalService.setIsLogged(true);
      this.router.navigateByUrl('/list');
    });
  }

  checkForValidationErrors() {
    this.validationService.checkValidationMessages(this.loginForm.get('email')).subscribe(message => {
      this.emailValidationMessage = message;
    })
    this.validationService.checkValidationMessages(this.loginForm.get('password')).subscribe(message => {
      this.passwordValidationMessage = message;
    })
  }

}
