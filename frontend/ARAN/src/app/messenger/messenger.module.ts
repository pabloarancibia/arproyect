import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessengerRoutingModule } from './messenger-routing.module';
import { IonicModule } from '@ionic/angular';
import { QrcodeComponent } from './qrcode/qrcode.component';


@NgModule({
  declarations: [QrcodeComponent],
  imports: [
    CommonModule,
    MessengerRoutingModule,
    IonicModule
  ]
})
export class MessengerModule { }
