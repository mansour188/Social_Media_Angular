import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { SignupRequestPayload } from 'src/model/singup-request-payload';
import { map, Observable } from 'rxjs';
import { LoginRequestPayload } from 'src/model/login-request-payload';
import { LoginResponsePayload } from 'src/model/login-response-payload';
import { LocalStorageService } from 'ngx-webstorage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,
    private localStorageWeb:LocalStorageService) { }
  signup(siginupRequestPayload:SignupRequestPayload):Observable<any>{
   return this.httpClient.post('http://localhost:8080/api/registration',siginupRequestPayload,{responseType:'text'})


  }
  login(loginRequestPayload:LoginRequestPayload): Observable<Boolean>{
    console.log("its work");
    return this.httpClient.post<LoginResponsePayload>('http://localhost:8080/api/auth/login',loginRequestPayload).pipe(map(
      data =>{
        this.localStorageWeb.store('authtoken',data.authtoken);
        this.localStorageWeb.store('expiresAt',data.expiresAt);
        this.localStorageWeb.store('refreshToken',data.refreshToken)
        this.localStorageWeb.store('username',data.username);
        return true


      }
    ));
  }
}
