import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-agent',
  templateUrl: './liste-agent.component.html',
  styleUrls: ['./liste-agent.component.scss']
})
export class ListeAgentComponent {

  constructor(private routes:Router){

  }

  getService(){
    this.routes.navigate(['service/liste']);
  }
  getCaissier(){
    this.routes.navigate(['caisse/liste']);
  }
  // goDashboard(){
  //   this.routes.navigate(['caisse/liste']);
  // }
  
}
