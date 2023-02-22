import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {KioskComponent} from "./ticket/kiosk/kiosk.component";
import {CallComponent} from "./ticket/call/call.component";
import {DisplayComponent} from "./ticket/display/display.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home/home.component";
import {ConnexionComponent} from "./admin/component/connexion/connexion.component";
import { DashboardComponent } from "./admin/component/dashboard/dashboard.component";
import { ListeAgentComponent } from "./admin/component/agent/liste/liste-agent.component";
import { EditAgentComponent } from "./admin/component/agent/edit/edit-agent.component";
import { AddAgentComponent } from "./admin/component/agent/add/add-agent.component";
import { AddServiceComponent } from "./admin/component/service/add/add-service.component";
import { EditServiceComponent } from "./admin/component/service/edit/edit-service.component";
import { ListeServiceComponent } from "./admin/component/service/liste/liste-service.component";
import { ListeComponent } from "./admin/component/caissier/liste/liste.component";
import { EditComponent } from "./admin/component/caissier/edit/edit.component";
import { AddComponent } from "./admin/component/caissier/add/add.component";


const routes:Routes =[
  
  {path:'home',component:HomeComponent},
  { path:'',redirectTo:'home',pathMatch:'full'},
  {path:'ticket/kiosk',component:KioskComponent},
  {path:'ticket/callBy/:nomAcces',component:CallComponent},
  {path:'ticket/display',component:DisplayComponent},
  {path:'connexion',component:ConnexionComponent},
  {path:'dashboard/:nomAcces',component:DashboardComponent},
  {path:'agent/liste',component:ListeAgentComponent},
  {path:'agent/edit',component:EditAgentComponent},
  {path:'agent/add',component:AddAgentComponent},
  {path:'service/liste',component:ListeServiceComponent},
  {path:'service/edit',component:EditServiceComponent},
  {path:'service/add',component:AddServiceComponent},
  {path:'caisse/liste',component:ListeComponent},
  {path:'caisse/edit',component:EditComponent},
  {path:'caisse/add',component:AddComponent}
  
]

@NgModule({
  imports:[
  RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule{}
