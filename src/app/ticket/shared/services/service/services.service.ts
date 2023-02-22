import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private httpClient:HttpClient) { }

  public getService(){
    const url = environment.API_EndPoint_SERVICE + 'view.php';
    return this.httpClient.get(url).pipe(map(
      services => services
    ));
  }
}
