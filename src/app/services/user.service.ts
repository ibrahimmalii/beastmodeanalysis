import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginUrl = `${environment.baseUrl}/api/login`;
  registerUrl = `${environment.baseUrl}/api/register`;
  resetPasswordUrl = `${environment.baseUrl}/api/reset_password_without_token`;
  confirmNewPasswordUrl = `${environment.baseUrl}/api/submit-new-password`;
  updateStatusUrl = `${environment.baseUrl}/api/updateStatus`;
  logoutUrl = `${environment.baseUrl}/api/logout`;
  checkExistUrl = `${environment.baseUrl}/api/isExist`;
  updateUserPasswordUrl = `${environment.baseUrl}/api/updatePassword`;
  resetCompaniesUrl= `${environment.baseUrl}/api/daily-reset`;
  resetLoggedUsersUrl= `${environment.baseUrl}/api/logged-reset`;

  loggedStatus =new BehaviorSubject<boolean>(false);
  constructor(private apiService : ApiService, private router : Router) {
    this.setLoggedStatus(this.isLogged());
  }

  setLoggedStatus(status : boolean){
    this.loggedStatus.next(status);
  };

  getLoggedStatus(){
    return this.loggedStatus.asObservable();
  }

  login(body:any){
    return this.apiService.post(this.loginUrl, body);
  }

  register(body:any){
    return this.apiService.post(this.registerUrl, body);
  }

  isLogged():boolean{
    if(this.getToken() && localStorage.isSubscribe)
      return true;

    return false;
  }

  logout(){
    this.apiService.post(this.logoutUrl, '', {headers: {'Authorization': this.getToken()}}).subscribe(response=>{
      localStorage.clear();
      this.setLoggedStatus(false);
      this.router.navigateByUrl('/auth/login')
    });
  }

  getUserData(){
    return this.apiService.get(`${environment.baseUrl}/api/me`, {headers: {'Authorization': this.getToken()}})
  }

  isAdmin(){
    let user = localStorage.user;
    if(user){
      user = JSON.parse(localStorage.user);
    }

    return user && user.role_id === 1 ? true : false;
  }

  getToken() {
    const itemStr = localStorage.token
    if (!itemStr) {
      return null
    }
    let item = JSON.parse(itemStr)
    let expiryDate = new Date(item.expiry)

    let now = new Date()

    if (now > expiryDate) {
      this.apiService.post(this.logoutUrl, '', {headers: {'Authorization': `Bearer ${item.value}`}}).subscribe(response=>{
        localStorage.clear();
        this.setLoggedStatus(false);
        this.router.navigateByUrl('/auth/login')
      });
      return null
    }
    return `Bearer ${item.value}`
  }


  resetPassword(body:any){
    return this.apiService.post(this.resetPasswordUrl, body)
  }

  confirmPassword(token:any, body:any){
    return this.apiService.post(`${this.confirmNewPasswordUrl}/${token}`, body)
  }

  updateStatus(id:any, body:any){
    return this.apiService.post(`${this.updateStatusUrl}/${id}`, body)
  }

  checkExist(email:any){
    return this.apiService.post(`${this.checkExistUrl}`, email)
  }

  updateUserPassword(body: any){
    const id = JSON.parse(localStorage?.user).id
    return this.apiService.post(`${this.updateUserPasswordUrl}/${id}`, body,{headers: {'Authorization': this.getToken()}})
  }

  resetCompanies(){
    return this.apiService.get(`${this.resetCompaniesUrl}`)
  }

  resetLoggedUsers(){
    return this.apiService.get(this.resetLoggedUsersUrl)
  }
}
