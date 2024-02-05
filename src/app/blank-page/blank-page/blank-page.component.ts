import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment";

@Component({
  selector: 'app-blank-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blank-page.component.html',
  styleUrl: './blank-page.component.scss'
})
export class BlankPageComponent {
  _http = inject(HttpClient)
  private REQUEST_MAPPING: string = "/fabric";

  onClick() {
    return this._http.get(environment.apiUrl + this.REQUEST_MAPPING).subscribe({
      next: (response) => {
        console.log(response)
      }, error: (err) => {
        console.log(err)
      }
    });
  }
}
