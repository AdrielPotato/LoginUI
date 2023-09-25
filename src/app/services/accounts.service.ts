import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private baseUrl: string = "https://localhost:7018/api/Account";
  private  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  constructor(private http: HttpClient) { }

  getAccounts(){
    return this.http.get<any>(`${this.baseUrl}s`,this.httpOptions);
  }

  getWeather(){
    return this.http.get<any>(`${"https://localhost:7018/WeatherForecast"}`);
  }

}
