import { LOCALE_ID,NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import localEs from '@angular/common/locales/es-AR'
import { DatePipe, registerLocaleData } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
registerLocaleData(localEs,'es-AR')

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule, NgxDatatableModule],
  providers: [{ 
    provide:  RouteReuseStrategy, 
    useClass: IonicRouteStrategy, 
  },{
    provide: LOCALE_ID, useValue:'es_AR'
  },
    DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
