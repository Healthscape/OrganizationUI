import {inject, Injectable} from "@angular/core";
import {LoginDto} from "../dto/login.dto";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environment";
import {TokensDto} from "../dto/tokes.dto";
import {TokenService} from "./token.service";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _http = inject(HttpClient)
  public errorResponse: Subject<any> = new Subject<any>();
  private REQUEST_MAPPING: string = "/auth";
  public logInUserChanged: Subject<any> = new Subject<any>();

  constructor(private router: Router, private _tokenService: TokenService) {
  }


  logInUser(loginDto: LoginDto) {
    this._http.post<TokensDto>(environment.apiUrl + this.REQUEST_MAPPING + "/login", loginDto,).subscribe(
      {
        next: (response) => {
          console.log(response)
          this.errorResponse.next(null);
          this._tokenService.saveToken(response.accessToken);
          this._tokenService.saveRefreshToken(response.refreshToken)
          this.logInUserChanged.next(response);
          this.router.navigate(['home']).then().catch(error => {console.log(error)});
        },
        error: (error: HttpErrorResponse) => {
          if (error.error.status == 400) {
            this.errorResponse.next(error.error.message);
          }
          console.log(error)
        }
      })
  }

  refreshToken(token: string) {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + token)
    };
    return this._http.get(environment.apiUrl + '/auth/refresh', header);
  }
}
