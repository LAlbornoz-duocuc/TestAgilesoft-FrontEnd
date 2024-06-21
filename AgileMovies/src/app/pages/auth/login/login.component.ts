import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { UserRequest } from '../../../models/auth/userRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup = this.formBuilder.group({
    user: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  public loginRequest: UserRequest = new UserRequest();


  constructor(private formBuilder: FormBuilder,private router: Router, private authService: AuthService){
    
  }
  
  async Login() {
    const { user, password } = this.loginForm.value;
    //debugger
    this.loginRequest.username = user;
    this.loginRequest.password = password;

    (await this.authService.Login(this.loginRequest)).subscribe({
      next : resp => {
        //debugger
        //console.log("resp", resp);
        this.router.navigate(['home']);
      }
    })
  }
}
