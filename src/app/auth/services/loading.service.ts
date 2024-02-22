import {Subject} from "rxjs";
import {HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading: Subject<HttpRequest<any>> = new Subject<HttpRequest<any>>()
}
