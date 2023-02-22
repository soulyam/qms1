import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CaissierService} from "../../admin/shared/services/caisse/caissier.service";
import {ICaissier} from "../../admin/shared/model/caissier";
import {interval, map, Subject, switchMap} from "rxjs";
import {TicketService} from "../shared/services/ticket/ticket.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { SoundService } from '../shared/services/sound.service';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit{
caissier:any=[];
tickets:any=[];
  ticketsD!:any[];
  ticketsF!:any[];
  statuts!:string;
  ticketsE:any=[];

  public ticketUpForm!:FormGroup;
  constructor(private caissierService:CaissierService,private ticketService:TicketService,private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,private soundService:SoundService
    ) {
  }
  prevnomAcces!:string;
  ngOnInit() {
   
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


    this.ticketUpForm = this.formBuilder.group({
      idT:[],
      Statuts:[],
      caissier:[],
    })
    interval(1000)
      .pipe(
        switchMap(() => this.ticketService.getAllTicket()),
        map((tickets) => tickets))
      .subscribe((tickets) => {
        this.tickets = tickets;
      });

    interval(1000)
      .pipe(
        switchMap(() => this.ticketService.getTicketD()),
        map((ticketsD) => ticketsD))
      .subscribe((ticketsD) => {
          this.ticketsD = ticketsD;

        }
      );

        
      interval(1000)
      .pipe(
        switchMap(() => this.ticketService.getTicketE(this.caissier.caisse)),
        map((ticketsE) => ticketsE))
      .subscribe((ticketsE) => {
          this.ticketsE= ticketsE;
          this.showBadge = true;
          

        }
      );
      this.call();
      



  }

  public getLast(){
    this.caissier =this.caissierService.getLastCaissier().subscribe(res=>{
      this.caissier = res;

    });
   
  }


  public showBadge=false;

  callT(idT:any,numT:any,numCaisse:any){
    this.startCounter();
   numCaisse = this.caissier.caisse;
    this.playSound(numT,numCaisse);
      this.ticketUpForm = this.formBuilder.group({
        idT:[idT],
        Statuts:['E'],
        caissier:[numCaisse],
      })

      console.log()
      let formData = new FormData();
      formData.append('idT',this.ticketUpForm.get('idT')?.value);
      formData.append('Statuts',this.ticketUpForm.get('Statuts')?.value);
      formData.append('caisse',this.ticketUpForm.get('caissier')?.value);
      this.ticketService.updateTicket(formData).subscribe(
        res =>{
          if ((res.result === 'success')){
            console.log("Aight man !!!!");
          }
        }
      )

  }
  callRecp(idT:any,numT:any,numCaisse:any){
    this.startCounter();
   numCaisse = this.caissier.caisse;
   
      this.ticketUpForm = this.formBuilder.group({
        idT:[idT],
        Statuts:['C'],
        caissier:[numCaisse],
      })

      console.log()
      let formData = new FormData();
      formData.append('idT',this.ticketUpForm.get('idT')?.value);
      formData.append('Statuts',this.ticketUpForm.get('Statuts')?.value);
      formData.append('caisse',this.ticketUpForm.get('caissier')?.value);
      this.ticketService.updateTicket(formData).subscribe(
        res =>{
          if ((res.result === 'success')){
            console.log("Aight man !!!!");
          }
        }
      )

  }
  call(){
    interval(1000)
    .pipe(
      switchMap(() => this.ticketService.getTicketF()),
      map((ticketsF) => ticketsF))
    .subscribe((ticketsF) => {
        this.ticketsF= ticketsF;

      }
    );
    
  }

  playSound(numT:number,numCaisse:number){
    let audio = new Audio();

    audio.src = '../../../assets/audio/sound.mp3';

    audio.load();

    const p = "Client Numero "+numT+" peut passer a la caisse "+numCaisse;

    audio.addEventListener('ended', () => {
      const utterance = new SpeechSynthesisUtterance(p);
      window.speechSynthesis.speak(utterance);
    });
    audio.play();


  }
  playSound1(numT:number,numCaisse:number){
    let audio = new Audio();

    audio.src = '../../../assets/audio/sound.mp3';

    audio.load();

    const p = "Client Numero "+numT+"n'est pas encore passer a la caisse "+numCaisse;

    audio.addEventListener('ended', () => {
      const utterance = new SpeechSynthesisUtterance(p);
      window.speechSynthesis.speak(utterance);
    });
    audio.play();


  }
  playSound2(numT:number,numCaisse:number){
    let audio = new Audio();

    audio.src = '../../../assets/audio/sound.mp3';

    audio.load();

    const p = "Client Numero "+numT+"n'est pas passer a la caisse "+numCaisse;

    audio.addEventListener('ended', () => {
      const utterance = new SpeechSynthesisUtterance(p);
      window.speechSynthesis.speak(utterance);
    });
    audio.play();


  }
  playSoundR(numT:number,numCaisse:number){
    let audio = new Audio();

    audio.src = '../../../assets/audio/sound.mp3';

    audio.load();

    const p = "Client Numero "+numT+"peut repasser a la caisse "+numCaisse;

    audio.addEventListener('ended', () => {
      const utterance = new SpeechSynthesisUtterance(p);
      window.speechSynthesis.speak(utterance);
    });
    audio.play();


  }
  showContent1 = false;
  showContent2 = false;

  btnNext ='disabled';
  noTicketsF: any;

  
  public okbtnClick(idT:number,numT:number,numCaisse:number){
    this.stopCounter();
      // this.playSound(numT,numCaisse);
      this.ticketUpForm = this.formBuilder.group({
        idT:[idT],
        Statuts:['S'],
        caissier:[numCaisse],
      })

      console.log(this.ticketUpForm.get('caissier')?.value)
      let formData = new FormData();
      formData.append('idT',this.ticketUpForm.get('idT')?.value);
      formData.append('Statuts',this.ticketUpForm.get('Statuts')?.value);
      formData.append('caisse',this.ticketUpForm.get('caissier')?.value);
      this.ticketService.updateTicket(formData).subscribe(
        res =>{
          if ((res.result === 'success')){
            console.log("Aight man !!!!");
          }
        }
      )
    
    // this.btnNext !=this.btnNext;

  }

  public recall(idT:number,numT:number,numCaisse:number){

      this.playSoundR(numT,numCaisse);
      this.ticketUpForm = this.formBuilder.group({
        idT:[idT],
        Statuts:['W'],
        caissier:[numCaisse],
      })

      console.log(this.ticketUpForm.get('caissier')?.value)
      let formData = new FormData();
      formData.append('idT',this.ticketUpForm.get('idT')?.value);
      formData.append('Statuts',this.ticketUpForm.get('Statuts')?.value);
      formData.append('caisse',this.ticketUpForm.get('caissier')?.value);
      this.ticketService.updateTicket(formData).subscribe(
        res =>{
          if ((res.result === 'success')){
            console.log("Aight man !!!!");
          }
        }
      )

    // this.btnNext !=this.btnNext;

  }
  public notShowbtnClick(idT:number,numT:number,numCaisse:number){
    this.stopCounter();    
    // this.playSound1(numT,numCaisse);
    // this.btnNext !=this.btnNext;
    this.ticketUpForm = this.formBuilder.group({
      idT:[idT],
      Statuts:['N'],
      caissier:[numCaisse],
    })

    console.log(this.ticketUpForm.get('caissier')?.value)
    let formData = new FormData();
    formData.append('idT',this.ticketUpForm.get('idT')?.value);
    formData.append('Statuts',this.ticketUpForm.get('Statuts')?.value);
    formData.append('caisse',this.ticketUpForm.get('caissier')?.value);
    this.ticketService.updateTicket(formData).subscribe(
      res =>{
        if ((res.result === 'success')){
          console.log("Aight man !!!!");
        }
      }
    )

  }
  public nShowbtnClick(idT:number,numT:number,numCaisse:number){
    this.stopCounter();
    // this.playSound2(numT,numCaisse);
    // this.btnNext !=this.btnNext;
    this.ticketUpForm = this.formBuilder.group({
      idT:[idT],
      Statuts:['P'],
      caissier:[numCaisse],
    })

    console.log(this.ticketUpForm.get('caissier')?.value)
    let formData = new FormData();
    formData.append('idT',this.ticketUpForm.get('idT')?.value);
    formData.append('Statuts',this.ticketUpForm.get('Statuts')?.value);
    formData.append('caisse',this.ticketUpForm.get('caissier')?.value);
    this.ticketService.updateTicket(formData).subscribe(
      res =>{
        if ((res.result === 'success')){
          console.log("Aight man !!!!");
        }
      }
    )

  }


  showContentOne() {
    this.showContent1 = true;
    this.showContent2 = false;
  }

  showContentTwo() {
    this.showContent1 = false;
    this.showContent2 = true;
  }

  counter = 0;
  intervalId !:any;

  startCounter() {
    this.intervalId = setInterval(() => {
      this.counter += 10;
    }, 10);
  }
  stopCounter() {
    clearInterval(this.intervalId);
    this.counter = 0;
  }

 


}
