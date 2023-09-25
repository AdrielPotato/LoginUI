import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router, RouterFeatures } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private userStore: UserStoreService){
  }



  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required,Validators.email]),
      password: new FormControl("", Validators.required)
    });
  }

  onSubmit(){
    if(this.loginForm.valid)
    {
      
      //send
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message);
          this.auth.storeToken(res.payload.token);
          let tokenPayload = this.auth.decodeToken();
          this.userStore.setNameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.router.navigate(['dashboard']);
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }
  }
  
}
