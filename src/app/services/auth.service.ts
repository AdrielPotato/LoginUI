import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{JwtHelperService} from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7018/api/User";
  private userPayload:any;
  constructor(private http: HttpClient) { 
    this.userPayload = this.decodeToken();
  }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}/register`, userObj);
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}/authenticate`, loginObj);
  }

  logout(){
    localStorage.clear();
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  decodeToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getNameFromToken(){
    if(this.userPayload){
      return this.userPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }
  }

  getRoleFromToken(){
    if(this.userPayload){
      return this.userPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }
  }
}
