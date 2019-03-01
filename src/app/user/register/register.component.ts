import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { GlobalService } from '../../shared/services/global.service';
import { Router } from '@angular/router';
import { ValidationMessagesService } from '../../shared/services/validation-messages.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  firstNameValidationMessage: String;
  lastNameValidationMessage: String;
  emailValidationMessage: String;
  passwordValidationMessage: String;
  confirmPasswordValidationMessage: String;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private globalService: GlobalService,
    private router: Router, private validationService: ValidationMessagesService) { }

  ngOnInit() {
    this.initializeRegisterForm();
    this.checkForValidationErrors();
  }

  initializeRegisterForm() {
    // TODO: implement async email validator to search in DB.
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.validateConfirmPassword() });
  }

  addUser() {
    this.userService.addUser(this.registerForm.value).subscribe(user => {
      this.globalService.setUser(user);
      this.globalService.setIsLogged(true);
      this.router.navigateByUrl('/list');
    })
  }

  // validateEmailNotTaken(): ValidatorFn {
  // TODO: Implement validateEmailNotTaken();
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     let isTaken: boolean = false;
  //     this.userService.emailCheckNotTaken(control.value).subscribe(res => {
  //       isTaken = res.duplicateEmail;
  //       console.log(res);
  //     })
  //     console.log(isTaken)
  //     return !isTaken ?  of(null) : of({ 'emailTaken': true });
  //   }
  // }

  validateConfirmPassword(): ValidatorFn {
    return (control: FormGroup): { [key: string]: any } | null => {
      let password = control.get('password').value;
      let confirmPassword = control.get('confirmPassword').value;
      if (password != confirmPassword) {
        return { 'confirmPassword': true }
      }
      return null;
    }
  }

  checkForValidationErrors() {
    this.validationService.checkValidationMessages(this.registerForm.get('firstName')).subscribe(message => {
      this.firstNameValidationMessage = message;
    })
    this.validationService.checkValidationMessages(this.registerForm.get('lastName')).subscribe(message => {
      this.lastNameValidationMessage = message;
    })
    this.validationService.checkValidationMessages(this.registerForm.get('email')).subscribe(message => {
      this.emailValidationMessage = message;
    })
    this.validationService.checkValidationMessages(this.registerForm.get('password')).subscribe(message => {
      this.passwordValidationMessage = message;
    })
    this.validationService.checkValidationMessages(this.registerForm.get('confirmPassword')).subscribe(message => {
      this.confirmPasswordValidationMessage = message;
    })
    this.validationService.checkValidationMessages(this.registerForm).subscribe(message => {
      this.confirmPasswordValidationMessage = message;
    })
  }

}
