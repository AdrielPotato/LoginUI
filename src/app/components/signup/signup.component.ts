import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router){
  }



  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstname: new FormControl("", [Validators.required, Validators.max(100)]),
      lastname: new FormControl("", [Validators.required, Validators.max(100)]),
      email: new FormControl("", [Validators.required,Validators.email]),
      username: new FormControl("", [Validators.required,Validators.max(100)]),
      password: new FormControl("", [Validators.required,Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{6,}/)]),
      confirmPassword: new FormControl("", [Validators.required] )
    });
  }

  onSubmit(){
    if(this.signupForm.valid)
    {
      //send
      if(this.signupForm.valid)
    {
      //send
      this.auth.signUp(this.signupForm.value)
      .subscribe({
        next:(res)=>{
          this.signupForm.reset();
          this.router.navigate(['login'])
        },
        error:(err)=>{
          //console.log(err);
          alert(err?.error.message)
        }
      })
    }
    }
  }
}
