import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  get(url:string, headers? : any){
    return this.http.get(url, headers);
  }

  post(url: string, body: any, headers? : any){
    return this.http.post(url, body, headers);
  }

  put(url: string , body: any, headers? : any){
    return this.http.put(url, body, headers);
  }

  delete(url: string , id : number, headers? : any){
    return this.http.delete(`${url}/${id}`, headers);
  }

}
