import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TarjetasService {
  private URL = environment.apiUrl;

  constructor(
    private _http: HttpClient,
  ) { }

  /**
   * Traer tarjetas según su estado
   * @param estado ej: espera
   * @returns 
   */
  getTarjetasByEstado(estado){
    return this._http.get(this.URL + 'tarjetas/estado/'+ estado).toPromise()
      .then(res=>{return res;})
  }

  /**
   * Traer última tarjeta según su estado
   * @param estado ej: espera
   * @returns 
   */
   getUltimaTarjetaByEstado(estado){
    return this._http.get(this.URL + 'tarjetas/ultima/estado/'+ estado).toPromise()
      .then(res=>{return res;})
  }
}
