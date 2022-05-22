import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { PaymentComponent } from './payment/payment.component';
import { SubscribeComponent } from './subscribe/subscribe.component';



const routes : Routes = [
  {path : 'register', component : RegisterComponent},
  {path : 'login', component : LoginComponent},
  {path : 'subscribe', component : SubscribeComponent},
  {path : 'pay', component : PaymentComponent},
  {path : 'forget-password', component : ForgetPasswordComponent},
  {path : 'reset-password/:token', component : ResetPasswordComponent},
  {path : '', component : LoginComponent}
]

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    PaymentComponent,
    SubscribeComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), ReactiveFormsModule
  ]
})
export class AuthModule { }
