import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaissierService } from '../../shared/services/caisse/caissier.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  nomAcces:any;

  constructor(private routes:Router,private activatedRoute:ActivatedRoute,private caissierService:CaissierService){
    
  }
  caissier:any=[];
  ngOnInit(): void {
    let nomAcces ='';
    if(this.activatedRoute.snapshot.params['nomAcces']){
      nomAcces = this.activatedRoute.snapshot.params['nomAcces'];
    if(nomAcces !== ''){
      this.caissierService.loadLog(nomAcces).subscribe(
        res =>{
          this.caissier = res
          
        });
        console.log(this.caissier);
        
    } 
  }
   
  }

  loadUser(nomAcces:any){
    this.caissierService.loadLog(nomAcces).subscribe(
      res =>{
        this.caissier = res
      }
    )
  }

  getAgent(){
      this.routes.navigate(['agent/liste']);
  }
  getService(){
    this.routes.navigate(['service/liste']);
  }
  getCaissier(){
    this.routes.navigate(['caissier/liste']);
  }
}
