import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ChatbotAiComponent } from'./chatbot-ai/chatbot-ai.component';
import { LoaderComponent } from './loader/loader.component';
import { Event1Component } from './event1/event1.component';
import { Event2Component } from './event2/event2.component';

import { LogadminComponent } from './logadmin/logadmin.component';
import { AdregisterComponent } from './adregister/adregister.component';
import { AddeventComponent } from './addevent/addevent.component';
import { MgChatComponent } from './mg-chat/mg-chat.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { HelpsComponent } from './helps/helps.component';
import { HistoryComponent } from './history/history.component';


import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [

 
  {
    path: '',
    component: LoaderComponent,
   
  },

  {
    path: 'loader',
    component: LoaderComponent,
   
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard] 
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'footer',
    component: FooterComponent
  },
  {
    path: 'event',
    component: EventComponent
  },
  {
    path: 'admin',
    component: AdminComponent, canActivate: [AuthGuard] 
  },
  {
    path: 'chatbot-ai',
    component: ChatbotAiComponent
  },

  {
    path: 'event1',
    component: Event1Component
  },
  {
    path: 'event2',
    component: Event2Component
  },

 
  {
    path: 'logadmin',
    component: LogadminComponent
  },
  {
    path: 'adregister',
    component: AdregisterComponent
  },
  {
    path: 'addevent',
    component: AddeventComponent
  },
  

  {
    path: 'mg-chat',
    component: MgChatComponent
  },

  {
    path: 'admin-menu',
    component: AdminMenuComponent
  },

  {
    path: 'helps',
    component: HelpsComponent
  },


  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'history',
    component: HistoryComponent,
   
  },
  

  

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
