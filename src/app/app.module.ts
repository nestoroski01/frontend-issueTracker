import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IssueModule } from './issue/issue.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './shared/material/material.module';
import { UserModule } from './user/user.module';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { GlobalService } from './shared/services/global.service';
import { ValidationMessagesService } from './shared/services/validation-messages.service';
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    IssueModule,
    UserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
    ])
  ],
  providers: [
    GlobalService,
    ValidationMessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
