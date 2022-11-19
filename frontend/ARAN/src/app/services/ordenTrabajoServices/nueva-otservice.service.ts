import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class NuevaOTServiceService {

  private URL = environment.apiUrl;

  constructor(
    private _http: HttpClient,
  ) { }

  nuevaOTService(data){
    return this._http.post(this.URL + '/ordentrabajo/nueva', data).toPromise()
    .then(res => {
      return res;
    })
  }

}
