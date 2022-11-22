import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class NuevaOTService {

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

  /**
   * Traer OT segun fechas y estado
   * @params fecha_desde
   * @params fecha_hasta
   * @params estado
   */
  //@example http://localhost:3001/ordentrabajo/filtrado/fecha_desde/2022-08-19/fecha_hasta/estado/espera
  //ordentrabajoRouter.get('/filtrado/fecha_desde/:fecha_desde?/fecha_hasta/:fecha_hasta?/estado/:estado?',
  
  getOTBy(fecha_desde,fecha_hasta,estado){
    return this._http.get(this.URL + '/ordentrabajo/filtrado/' 
    + '/fecha_desde/'+ fecha_desde 
    + '/fecha_hasta/'+ fecha_hasta
    + '/estado/'+ estado
    ).toPromise().then(res=>{ return res;})
  }
  



}
