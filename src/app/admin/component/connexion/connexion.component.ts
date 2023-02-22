import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CaissierService} from "../../shared/services/caisse/caissier.service";
import {Router,ActivatedRoute} from "@angular/router";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit{
  caissierForm!:FormGroup;
  private loginIdSubject = new BehaviorSubject<any>(null);
  public loginId$ = this.loginIdSubject.asObservable();


  constructor(private caissierService:CaissierService,private formBuilder:FormBuilder,
              private routes:Router,
              private activatedRoute:ActivatedRoute) {
  }
  ngOnInit() {
    this.caissierForm = this.formBuilder.group({
      login : ['',Validators.required],
      pwd :['',Validators.required]
    })



  }
  login!:string;
  pwd!:string;

  connexion(){
    this.login=this.caissierForm.get('login')?.value;
    this.pwd=this.caissierForm.get('pwd')?.value;
    console.log(this.login);
    this.caissierService.log(this.login,this.pwd).subscribe(
      res=>{
        if(res.role == 'caissier'){
          this.routes.navigate(['/ticket/callBy/',this.login]);

          console.log(res.codeAcces);
        }else {
          this.routes.navigate(['/dashboard',this.login]);
          console.log(res.codeAcces);
        }
      }
    )

  }


  // verif(values:any,isUpdate:any){
  //
  //   if(isUpdate){
  //
  //   }
  //   else{
  //     this.caissierService.log(this.caissierForm.get('login')?.value).subscribe(res=>{
  //
  //         this.routes.navigate(['/ticket/call'])
  //
  //     })
  //   }
  //
  // }




}
