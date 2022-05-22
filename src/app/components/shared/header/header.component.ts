import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService : UserService, private router : Router) { }

  isUserLogged : boolean = false;
  isAdmin : boolean = false;
  ngOnInit(): void {
    this.userService.getLoggedStatus().subscribe(response=>{
      return this.isUserLogged = response;
    });

    this.isAdmin = this.userService.isAdmin();
  }

  logout(){
    this.userService.logout();
  }

  navigateToFilter(){
    this.router.navigateByUrl('/score-card')
  }

}
