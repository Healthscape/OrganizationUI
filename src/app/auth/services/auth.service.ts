import {inject, Injectable} from "@angular/core";
import {LoginDto} from "../dto/login.dto";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
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

  constructor(private router: Router,private _tokenService: TokenService) {
  }


  logInUser(loginDto: LoginDto) {
    this._http.post<TokensDto>(environment.apiUrl + this.REQUEST_MAPPING + "/login", loginDto,).subscribe(
      {
        next: (response) => {
          console.log(response)
          this.errorResponse.next(null);
          this._tokenService.saveToken(response.accessToken);
          this._tokenService.saveRefreshToken(response.refreshToken)
          // this.logInUserChanged.next(response);
          this.router.navigate(['blank-page']).then();
        },
        error: (error: HttpErrorResponse) => {
          if (error.error.status == 400) {
            this.errorResponse.next(error.error.message);
          }
          console.log(error)
        }
      })
  }
}
