import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AccountsService } from 'src/app/services/accounts.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public weatherList : any =[];
  public accountList : any =[];
  public username: string= "";
  private role: string= "";
  constructor(
    private auth: AuthService, 
    private accountService: AccountsService,
    private router: Router,
    private userStore: UserStoreService)
  {

  }
  ngOnInit(): void {
    this.userStore.getNameFromStore()
    .subscribe(val=>{
      let nameFromToken = this.auth.getNameFromToken();
      this.username = val || nameFromToken;
    })

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })

    if (this.role == "Admin")
    {

      this.accountService.getAccounts().subscribe({
        next:(res)=>{
          this.accountList = res.payload.accounts;
          console.log(this.accountList);
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }
    else{
      this.accountService.getWeather().subscribe({
        next:(res)=>{
          this.weatherList = res;
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }

    console.log(this.username);
    console.log(this.role);
  }

  logout()
  {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
