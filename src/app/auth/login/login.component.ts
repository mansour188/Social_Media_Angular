import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequestPayload } from 'src/model/login-request-payload';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerSuccessMessage!: string;
  isError !: boolean;
 

  loginForm!:FormGroup;
  loginRequestPayload:LoginRequestPayload;
  constructor(private authService:AuthService,
    private toastr:ToastrService,
    private router:Router
    ,private activatedRoute: ActivatedRoute){
    this.loginRequestPayload={
      email:"",
      password:""
    }
  }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      email: new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    });
    this.activatedRoute.queryParams
    .subscribe(params => {
      if (params['params'] !== undefined && params['registered'] === 'true') {
        this.toastr.success('Signup Successful');
        this.registerSuccessMessage = 'Please Check your inbox for activation email '
          + 'activate your account before you Login!';
      }
    });
}
  
login(){
  this.loginRequestPayload.email=this.loginForm.get('email')?.value;
  this.loginRequestPayload.password=this.loginForm.get('password')?.value;
  this.authService.login(this.loginRequestPayload).subscribe(data => {
    this.isError = false;
    this.router.navigateByUrl('/');
    this.toastr.success('Login Successful');
  }, error => {
    this.isError = true;
    throwError(error);
  });
}
}
