import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CallComponent } from './ticket/call/call.component';
import { DisplayComponent } from './ticket/display/display.component';
import { KioskComponent } from './ticket/kiosk/kiosk.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {RouterModule, Routes} from "@angular/router";
import {TicketModule} from "./ticket/ticket.module";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ConnexionComponent } from './admin/component/connexion/connexion.component';
import { DashboardComponent } from './admin/component/dashboard/dashboard.component';
import { ListeAgentComponent } from './admin/component/agent/liste/liste-agent.component';
import { AddAgentComponent } from './admin/component/agent/add/add-agent.component';
import { EditAgentComponent } from './admin/component/agent/edit/edit-agent.component';
import { EditServiceComponent } from './admin/component/service/edit/edit-service.component';
import { AddServiceComponent } from './admin/component/service/add/add-service.component';
import { ListeServiceComponent } from './admin/component/service/liste/liste-service.component';
import { ListeComponent } from './admin/component/caissier/liste/liste.component';
import { AddComponent } from './admin/component/caissier/add/add.component';
import { EditComponent } from './admin/component/caissier/edit/edit.component';





@NgModule({
  declarations: [
    AppComponent,
    KioskComponent,
    CallComponent,
    DisplayComponent,
    HomeComponent,
    ConnexionComponent,
    DashboardComponent,
    ListeAgentComponent,
    AddAgentComponent,
    EditAgentComponent,
    EditServiceComponent,
    AddServiceComponent,
    ListeServiceComponent,
    ListeComponent,
    AddComponent,
    EditComponent

  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
