import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessangerService {

  private URL = environment.apiMessengerUrl;


  constructor(
    private _http: HttpClient,

  ) { }

  /**
   * Send message whatsapp
   * @param data cel & message
   * @returns 
   */
  postSendSms(data){
    return this._http.post(this.URL + '/lead', data).toPromise()
    .then(res=>{
      return res;
    });
  }

  /**
   * get qr code to login whatsapp
   * @returns svg qr code image
   */
  getSvgQrCode(){
    return this._http.get(this.URL + '/lead', { responseType: 'blob' }).toPromise()
    .then(res=>{
      return res;
    });
  }

  regenerateSvgQrCode(){
    return this._http.get(this.URL + '/lead/regenerateqr').toPromise()
    .then(res=>{
      console.log('regenerateSvgQrCode: ', res)
      return res;
    });
  }

  

}
