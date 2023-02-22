import { Injectable,EventEmitter } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, Subject} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {HttpResponse } from "../../model/http-response";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private ticketSubject = new Subject<any>();
  ticket$ = this.ticketSubject.asObservable();




  constructor(private httpClient:HttpClient) { }

  public getTicket():Observable<any>{
    const url = environment.API_EndPoint_TICKET + 'view.php';
    return this.httpClient.get(url).pipe(
      map(
        tickets =>tickets
      )
    )
  }

  //Voir ticket en service(en caisse)
  public getTicketE(nomAcces:any):Observable<any>{
    const url = environment.API_EndPoint_TICKET + 'viewS.php?caisse='+nomAcces;
    return this.httpClient.get(url).pipe(
      map(
        tickets =>tickets
      )
    )

  }
  public getTicketEE():Observable<any>{
    const url = environment.API_EndPoint_TICKET + 'viewSS.php';
    return this.httpClient.get(url).pipe(
      map(
        tickets =>tickets
      )
    )

  }


  public getTicketD():Observable<any>{
    const url = environment.API_EndPoint_TICKET + 'viewD.php';
    return this.httpClient.get(url).pipe(
      map(
        tickets =>tickets
      )
    )
  }

  public getTicketF():Observable<any>{
    const url = environment.API_EndPoint_TICKET + 'viewF.php';
    return this.httpClient.get(url).pipe(
      map(
        tickets =>tickets
      )
    )
  }

  public getLastTicket():Observable<any>{
    const url = environment.API_EndPoint_TICKET + 'view_lastT.php';
    return this.httpClient.get(url).pipe(
      map(
        tickets =>tickets
      )
    )
  }

  public getAllTicket():Observable<any>{
    const url = environment.API_EndPoint_TICKET + 'view_A.php';
    return this.httpClient.get(url).pipe(
      map(
        tickets =>tickets
      )
    )
  }
  public getAll():Observable<any>{
    const url = environment.API_EndPoint_TICKET + 'viewAll.php';
    return this.httpClient.get(url).pipe(
      map(
        tickets =>tickets
      )
    )
  }

  //  addTicket(data:any):Observable<HttpResponse>{
  //   const url = environment.API_EndPoint_TICKET + 'create.php';
  //   return this.httpClient.post<HttpResponse>(url,data).pipe(
  //     map(
  //       data =>data
  //     )
  //   )
  //
  // }
  addTicket(data:any):Observable<HttpResponse>{
      const url = environment.API_EndPoint_TICKET + 'create.php';
      return this.httpClient.post<HttpResponse>(url,data).pipe(
        map(data=>data,this.ticketSubject.next(data))

      )
    }
    updateTicket(data:any):Observable<HttpResponse>{
      const url = environment.API_EndPoint_TICKET + 'update.php';
      return this.httpClient.post<HttpResponse>(url,data).pipe(
        map(data=>data,this.ticketSubject.next(data))
      )
    }

    

}
