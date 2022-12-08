import { Component,OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignupRequestPayload } from 'src/model/singup-request-payload';
import { AuthService } from '../shared/auth.service';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  implements OnInit  {
  siginupRequestPayload:SignupRequestPayload ;
  signupForm! : FormGroup;
  
  constructor(private authService:AuthService
    ,private router:Router,private toastr:ToastrService){
    this.siginupRequestPayload={
      name:"",
      email:"",
      password:""
    }
  }
  
  ngOnInit():void {
    this.signupForm=new FormGroup({
      name:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',Validators.required)
      
    });
    
  }
  signup(){
    this.siginupRequestPayload.email=this.signupForm.get("email")?.value;
    this.siginupRequestPayload.name=this.signupForm.get("name")?.value;
    this.siginupRequestPayload.password=this.signupForm.get("password")?.value;
    console.log("1"+this.siginupRequestPayload.email)
    console.log("2"+this.siginupRequestPayload.password)
    console.log("3"+this.siginupRequestPayload.name)

    this.authService.signup(this.siginupRequestPayload)
    .subscribe(data => {
      this.router.navigate(['/login'],
        { queryParams: { registered: 'true' } });
    }, error => {
      console.log(error);
      this.toastr.error('Registration Failed! Please try again');
    });
  }


}
