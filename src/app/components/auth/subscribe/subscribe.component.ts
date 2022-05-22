import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
declare var paypal: { Buttons: (arg0: { style: { shape: string; color: string; layout: string; label: string; }; createSubscription: (data: any, actions: any) => any; onApprove: (data: any, actions: any) => void; }) => { (): any; new(): any; render: { (arg0: string): void; new(): any; }; }; };


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  isResubscribeSuccessfully: boolean = false;
  logginData:any;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
  }

}
