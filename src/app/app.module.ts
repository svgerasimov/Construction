import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { OperatorComponent } from './operator/operator.component';
import { AccountantComponent } from './accountant/accountant.component';
import { NewObjectComponent } from './ingineer/new-object/new-object.component';
import { ObjectComponent } from './ingineer/object/object.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { IngineerComponent } from './ingineer/ingineer/ingineer.component';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { CurrentComponent } from './ingineer/ingineer/current/current.component';
import { FinishedComponent } from './ingineer/ingineer/finished/finished.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    OperatorComponent,
    AccountantComponent,
    NewObjectComponent,
    ObjectComponent,
    WelcomeComponent,
    IngineerComponent,
    HeaderComponent,
    SidenavListComponent,
    CurrentComponent,
    FinishedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
