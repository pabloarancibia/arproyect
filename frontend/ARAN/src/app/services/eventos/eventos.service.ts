import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private URL = environment.apiUrl;

  constructor(
    private _http: HttpClient,
  ) { }

  /**
   * Traer último evento mqtt según: accion, fecha desde
   * @param accion ej: nueva
   * @param fecha_desde ej: 2022-05-12T15:30:02Z
   * @returns datos del evento y número de tarjeta.
   */
    getUltimoEventoByAccion(accion, fecha_desde){
     return this._http.get(this.URL + '/eventosmqtt/ultimo/accion/'+ accion+'/fecha_desde/'+fecha_desde).toPromise()
       .then(res=>{return res;})
   }
}
