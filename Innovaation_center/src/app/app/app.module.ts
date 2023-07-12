import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { PhotoService } from './services/photo.service';
import { ApiService } from './services/api.service';
import { AuthAdminService } from './service/auth-admin.service';
import 'jquery';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventComponent } from './event/event.component';
import { AdminComponent } from './admin/admin.component';
import { ChatbotAiComponent } from './chatbot-ai/chatbot-ai.component';
import { LoaderComponent } from './loader/loader.component';
import { Event1Component } from './event1/event1.component';

import { Event2Component } from './event2/event2.component';
import { LogadminComponent } from './logadmin/logadmin.component';
import { AdregisterComponent } from './adregister/adregister.component';
import { AddeventComponent } from './addevent/addevent.component';
import { MgChatComponent } from './mg-chat/mg-chat.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';


import { ChartModule } from 'angular2-chartjs';
import { ProfileComponent } from './profile/profile.component';
import { HelpsComponent } from './helps/helps.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ContactComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    EventComponent,
    AdminComponent,
    ChatbotAiComponent,
    LoaderComponent,
    Event1Component,
    Event2Component,
    LogadminComponent,
    AdregisterComponent,
    AddeventComponent,
    AdminMenuComponent,
    MgChatComponent,
    ProfileComponent,
         HelpsComponent,
         HistoryComponent,
        
      
   
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    ChartModule,
    
    

  ],
  providers: [PhotoService , ApiService,AuthAdminService,],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
