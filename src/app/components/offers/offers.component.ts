import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  offers:any;
  stockExchanges:any
  listOne:any;
  listTwo:any;
  listThree:any;
  isPageLoaded:boolean = false

  ngOnInit(): void {
    this.apiService.get(`${environment.baseUrl}/api/offers`).subscribe(response=>{
      this.offers = response;
      this.listOne = this.offers[0]['stock-exchanges']
      this.listTwo = this.offers[1]['stock-exchanges']
      this.listThree = this.offers[2]['stock-exchanges']
      this.isPageLoaded = true
    })
  }

}
