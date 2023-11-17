import {Component, ElementRef, Renderer2} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {LogoComponent} from "../../../utils/logo/logo.component";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {LoginRegisterComponent} from "../login-register/login-register.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, LogoComponent, MatInputModule, MatIconModule, MatButtonModule, NgOptimizedImage, LoginRegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private renderer: Renderer2, private elem: ElementRef) {
  }

  onChange() {
    let elements = this.elem.nativeElement.querySelector('.background-container');
    let element = <HTMLElement> elements
    if (element.classList.length > 1){
      element.classList.remove('active-sign-up')
    }else{
      element.classList.add('active-sign-up')
    }
  }
}
