import { Component, OnInit } from '@angular/core';
import { MessangerService } from 'src/app/services/messanger/messanger.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
})
export class QrcodeComponent implements OnInit {

  svgQrImage;

  constructor(
    private messangerService: MessangerService,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.getSvgQrCode();
  }

  async refreshQr(){
    console.log('refresh')
    //img icon svg
    if (this.platform.is('android')) {
      this.svgQrImage = 'file:///android_asset/public/assets/images/favicon.png';
    } else {
      this.svgQrImage = 'assets/images/favicon.png';
    }
    //

    this.messangerService.regenerateSvgQrCode().then(res=>{
      console.log('res refresh',res)
      this.getSvgQrCode();
      
    }); 
  }

  getSvgQrCode(){
    this.messangerService.getSvgQrCode().then(res=>{
      console.log('res en get',res);
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        this.svgQrImage = reader.result as string;
      }
    });
  }



}
