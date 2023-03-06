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

  postSendSms(data){
    return this._http.post(this.URL + '/lead', data).toPromise()
    .then(res=>{
      return res;
    });
  }

}
