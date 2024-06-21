import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { MovieResponse } from '../../interfaces/movies/movieResponse.interface';
import { ActorResponse } from '../../interfaces/movies/actorResponse.interface';
import { AuthService } from '../auth/auth.service';
import { TokenRequest } from '../../interfaces/auth/tokenRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private baseUrl: string = environment.agilemoviesApi;
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }


  async Playing(page: number) {
    const url = `${this.baseUrl}movies/now_playing`;

    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", page);

    const data = this.authService.getToken();
    let payload = JSON.parse(data);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${payload.token}`
    });

    let tokenRequest: TokenRequest = {
      refresh_token: payload.refresh_token
    };

    if (this.authService.isTokenExpired()) {
      this.authService.RefreshToken(tokenRequest).subscribe({
        next: resp => {
          const data = this.authService.getToken();
          let payload = JSON.parse(data);

          const headers = new HttpHeaders({
            'Authorization': `Bearer ${payload.token}`
          });
          return this.http.get<MovieResponse>(url, { params: queryParams, headers })
        }
      });
    }

    return this.http.get<MovieResponse>(url, { params: queryParams, headers })
  }
  async Popular(page: number) {
    const url = `${this.baseUrl}movies/popular`;
    //debugger
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", page);

    const data = this.authService.getToken();
    let payload = JSON.parse(data);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${payload.token}`
    });

    let tokenRequest: TokenRequest = {
      refresh_token: payload.refresh_token
    };

    if (this.authService.isTokenExpired()) {
      this.authService.RefreshToken(tokenRequest).subscribe({
        next: resp => {
          const data = this.authService.getToken();
          let payload = JSON.parse(data);

          const headers = new HttpHeaders({
            'Authorization': `Bearer ${payload.token}`
          });
          return this.http.get<MovieResponse>(url, { params: queryParams, headers })
        }
      });
    }

    return this.http.get<MovieResponse>(url, { params: queryParams, headers  })
  }

  async Actors(movieId: number) {
    const url = `${this.baseUrl}movies/${movieId}/actors`;


    const data = this.authService.getToken();
    let payload = JSON.parse(data);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${payload.token}`
    });

    let tokenRequest: TokenRequest = {
      refresh_token: payload.refresh_token
    };

    if (this.authService.isTokenExpired()) {
      this.authService.RefreshToken(tokenRequest).subscribe({
        next: resp => {
          const data = this.authService.getToken();
          let payload = JSON.parse(data);

          const headers = new HttpHeaders({
            'Authorization': `Bearer ${payload.token}`
          });
          return this.http.get<ActorResponse>(url, { headers })
        }
      });
    }

    return this.http.get<ActorResponse>(url, { headers })
  }
}
