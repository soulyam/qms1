import { Component } from '@angular/core';
import {Router, Routes} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private routes:Router) {
  }
  display(){
    this.routes.navigate(['/ticket/display']);
  }

  kiosk(){
    this.routes.navigate(['/ticket/kiosk']);
  }
  call(){
    this.routes.navigate(['/ticket/call']);
  }

}
