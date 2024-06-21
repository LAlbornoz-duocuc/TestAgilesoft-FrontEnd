import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GlobalService } from '../global/global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { VariablesSessionRemove, VariablesSession } from '../../helpers/constantes';
import { User } from '../../models/auth/user';
import { Payload } from '../../models/auth/payload';
import { UserRequest } from '../../models/auth/userRequest';
import { map, tap } from 'rxjs';
import { LoginResponse } from '../../interfaces/auth/loginResponse.interface';
import jwt_decode, { jwtDecode } from 'jwt-decode';
import { ExpToken } from '../../interfaces/auth/ExpToken.interface';
import { TokenRequest } from '../../interfaces/auth/tokenRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl: string = environment.agilemoviesApi;
  constructor(private http: HttpClient, private router: Router, private globalService: GlobalService) {
  }


  async Login(userRequest: UserRequest) {
    const url = `${this.baseUrl}auth/login`;

    return this.http.post<any>(url, userRequest).pipe(
      tap((res: LoginResponse) => {
        //se hace el guardado del usuario y del token en el local storage
        //console.log("res",res);
        this.saveUser(res.data.user);
        this.saveToken(res.data.payload);

      })
    );
  }


  getDecodedToken(): ExpToken | null {
    const token = this.getToken();
    let payload: Payload = JSON.parse(token);
    if (token) {
      return jwtDecode<ExpToken>(payload.token);
    }
    return null;
  }

  isTokenExpired(): boolean {
    const decodedToken = this.getDecodedToken();
    if (decodedToken) {
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp < currentTime;
    }
    return true;
  }

  RefreshToken(tokenRequest: TokenRequest) {
    const url = `${this.baseUrl}auth/refresh`;

    return this.http.post<any>(url, tokenRequest).pipe(
      map((res: LoginResponse) => {
        //se hace el guardado del usuario y del token en el local storage
        this.saveUser(res.data.user);
        this.saveToken(res.data.payload);

      })
    );
  }

  async logout() {
    //Se eliminan las sessiones principales
    let sesiones = Object.values(VariablesSessionRemove);

    sesiones.forEach(sesion => {
      this.globalService.removeDataStorage(sesion);
    });
    this.router.navigate(['login']);
  }

  async me() {
    const url = `${this.baseUrl}user/me`;

    const data = this.getToken();
    let payload = JSON.parse(data);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${payload.token}`
    });

    let tokenRequest: TokenRequest = {
      refresh_token: payload.refresh_token
    };

    if (this.isTokenExpired()) {
      this.RefreshToken(tokenRequest).subscribe({
        next: resp => {
          const data = this.getToken();
          let payload = JSON.parse(data);

          const headers = new HttpHeaders({
            'Authorization': `Bearer ${payload.token}`
          });

          return this.http.get<User>(url,{ headers }).pipe(
            tap((res: User) => {
              //se hace el guardado del usuario y del token en el local storage
              this.saveUser(res);
      
            })
          );
        }
      });
    }

    return this.http.get<User>(url, { headers }).pipe(
      tap((res: User) => {
        //se hace el guardado del usuario y del token en el local storage
        this.saveUser(res);

      })
    );
  }

  /* -------- FUNCIONES DE SESSION PRINCIPALES --------- */
  public saveToken(payload: Payload): void {
    this.globalService.saveDataStorage(VariablesSession.ACCESS_TOKEN, JSON.stringify(payload));
  }
  getToken() {
    return this.globalService.getDataStorage(VariablesSession.ACCESS_TOKEN);
  }

  public saveUser(user: User): void {
    this.globalService.saveDataStorage(VariablesSession.ACCESS_USUARIO, JSON.stringify(user));
  }
  getUser() {
    return this.globalService.getDataStorage(VariablesSession.ACCESS_USUARIO);
  }
}
