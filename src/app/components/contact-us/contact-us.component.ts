import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // this.apiService.get('https://storage.googleapis.com/iex/api/logos/FB.png').subscribe(response=>{
    //   console.log(response)
    // })
  }

}
