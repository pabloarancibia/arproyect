import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrabajosService {

  private URL = environment.apiUrl;

  constructor(
    private _http: HttpClient,
  ) { }

  /**
   * Get todos los trabajos
   */
  getTrabajos(){
    return this._http.get(this.URL + '/trabajos/listar').toPromise()
    .then(res=>{
      return res;
    })
  }
}
