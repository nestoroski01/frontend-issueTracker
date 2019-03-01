import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';

@Injectable()
export class ValidationMessagesService {
  validationMessages = {
    required: 'This input is required!',
    email: 'Enter valid email!',
    confirmPassword: "Passwords don't match!",
    emailTaken: 'Email is already taken!'
  }

  constructor() { }

  checkValidationMessages(formControl: AbstractControl): Observable<String> {
    //subscribes to the form control and returns validation message as Observable.
    let message = new Subject<String>();
    formControl.valueChanges.subscribe(value => {
      message.next(this.setValidationMessage(formControl)[0]);
    })
    return message.asObservable();
  }

  private setValidationMessage(formControl: AbstractControl): Array<String> {
    //Checks if the formControl is "dirty" && have validation errors, and returns array of validation messages.
    let messages = [];
    if ((formControl.dirty || formControl.touched) && formControl.errors) {
      Object.keys(formControl.errors).map(key => {
        if (this.validationMessages[key])
          messages.push(this.validationMessages[key]);
      });
    }
    return messages;
  }
}
