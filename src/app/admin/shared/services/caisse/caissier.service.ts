import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable } from "rxjs";
import {environment} from "../../../../../environments/environment";
import {ICaissier} from "../../model/caissier";
import {TicketService} from "../../../../ticket/shared/services/ticket/ticket.service";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaissierService {
  nomAcces!:string;
  private loginIdSubject = new Subject<any>();
  loginId$ = this.loginIdSubject.asObservable()
  constructor(private httpClient:HttpClient,private ticketService:TicketService) { }

  public getCaissier():Observable<any>{
    const url = environment.API_EndPoint_CAISSIER + 'view.php';
    return this.httpClient.get(url).pipe(
      map(
        caissier =>caissier
      )
    )
  }
  public getLastCaissier():Observable<any>{
    const url = environment.API_EndPoint_CAISSIER + 'view_lastT.php';
    return this.httpClient.get(url).pipe(
      map(
        caissiers =>caissiers
      )
    )
  }
  public log(nomAcces:string,pwd:string):Observable<ICaissier>{
    // nomAcces :  'soulyam';
    
    const url = environment.API_EndPoint_CAISSIER + 'view_one.php?nomAcces='+ nomAcces+'&passwordd='+pwd;
    return this.httpClient.get<ICaissier>(url).pipe(
      map(
        data=>data,
        this.loginIdSubject.next(nomAcces)
        )
    );
  }
  public loadLog(nomAcces:string):Observable<ICaissier>{
    // nomAcces :  'soulyam';
    
    const url = environment.API_EndPoint_CAISSIER + 'view_O.php?nomAcces='+ nomAcces;
    return this.httpClient.get<ICaissier>(url).pipe(
      map(
        
        data=>data,
        // this.loginIdSubject.next(nomAcces)

        ),
        
    );
    
  }

}
