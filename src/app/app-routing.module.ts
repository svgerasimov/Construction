import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { IngineerComponent } from './ingineer/ingineer-main/ingineer.component';
import { OperatorComponent } from './operator/operator.component';
import { AccountantComponent } from './accountant/accountant.component';
import { NewObjectComponent } from './ingineer/add-construction-site/new-object.component';
import { ObjectComponent } from './ingineer/construction-site-page/object.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'ingineer', component: IngineerComponent, canActivate: [AuthGuard] },
    { path: 'operator', component: OperatorComponent, canActivate: [AuthGuard] },
    { path: 'accountant', component: AccountantComponent, canActivate: [AuthGuard] },
    { path: 'ingineer/new-object', component: NewObjectComponent, canActivate: [AuthGuard] },
    { path: 'ingineer/:constSiteId', component: ObjectComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard] 
})
export class AppRoutingModule {}