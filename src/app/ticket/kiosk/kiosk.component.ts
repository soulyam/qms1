import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ServicesService} from "../shared/services/service/services.service";
import {TicketService} from "../shared/services/ticket/ticket.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IService} from "../shared/model/services";
import { ActivatedRoute } from '@angular/router';
import { CaissierService } from 'src/app/admin/shared/services/caisse/caissier.service';
import { interval, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-kiosk',
  templateUrl: './kiosk.component.html',
  styleUrls: ['./kiosk.component.scss']
})
export class KioskComponent implements OnInit{
  service:any=[];
  services:any=[];
  serviceSubscribe:any;
  ticket:any=[];
  ticketSubscribe:any;
  tickets:any=[];

  caissier:any=[];



  public ticketForm!:FormGroup;


  today:Date = new Date();
  myDate:Date = new Date();


  ticketN={
    numero:0,
    numS:'V-2',
    nameS:'',
    DateTicket:new Date(),
    Status:''
  }

  constructor(private serviceService:ServicesService,private ticketService:TicketService,
    private  formBuilder:FormBuilder) {
  }
  public formattedDateTime!: string;
  // faChevronDown = faChevronDown;
  public ngOnInit() {
    this.getS();
    this.getLastT();
    interval(1000)
    .pipe(
      switchMap(() => this.ticketService.getAllTicket()),
      map((tickets) => tickets))
    .subscribe((tickets) => {
      this.tickets = tickets;

    });

    this.ticketForm = this.formBuilder.group(
      {
        numero:[],
        numS: [this.services.initService],
        nameS:[],
        dateTicket:new Date(),
        statuts:['W']
      }
    )
    this.formattedDateTime = this.myDate.toLocaleDateString() + ' ' + this.myDate.toLocaleTimeString();


   

  }


  ticketCForm(){

  }
  public getS(){
    this.serviceSubscribe =this.serviceService.getService().subscribe(res=>{
      this.service = res;
      this.services = res;

    });
  }

  public getLastT(){
    this.ticketSubscribe =this.ticketService.getLastTicket().subscribe(res=>{
      this.ticket = res;

    });
  }
  numero :number=0;
  addTicket(nameS:string,num:number,initS:string,isUpdate:any){
    
    this.numero++;
    num = num+this.numero;
    initS = initS+"-"+num;
    let date = new Date();

    this.ticketForm = this.formBuilder.group(
      {
        numero:[num],
        numS: [initS],
        nameS:[nameS],
        dateTicket:[date.toISOString() ],
        statuts:['W']
      }
    )
      console.log(this.ticketForm.get('numero')?.value);
    let formData = new FormData();
    formData.append('numero',this.ticketForm.get('numero')?.value);
    formData.append('numS',this.ticketForm.get('numS')?.value);
    formData.append('nameS',this.ticketForm.get('nameS')?.value);
    formData.append('DateTicket',this.ticketForm.get('dateTicket')?.value);
    formData.append('Statuts',this.ticketForm.get('statuts')?.value);

    if(isUpdate){

    }
    else{
      this.ticketService.addTicket(formData).subscribe(res=>{
        if(res.result === 'success'){
          console.log("Youpi !!!!");
        }
      })
    }


  }




}
