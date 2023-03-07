import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class OTService {

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
   * Traer OT segun fechas y estado, ambos opcionales.
   * @params fecha_desde
   * @params fecha_hasta
   * @params estado
   */
  //@example http://localhost:3001/ordentrabajo/filtrado/fecha_desde/2022-08-19/fecha_hasta/estado/espera
  //ordentrabajoRouter.get('/filtrado/fecha_desde/:fecha_desde?/fecha_hasta/:fecha_hasta?/estado/:estado?',
  
  getOTBy(fecha_desde,fecha_hasta,estado){
    return this._http.get(this.URL + '/ordentrabajo/filtrado/' 
    + 'fecha_desde/'+ fecha_desde 
    + '/fecha_hasta/'+ fecha_hasta
    + '/estado/'+ estado
    ).toPromise().then(res=>{ return res;})
  }

  /**
   * Service para actualizar estado de OT y Tarjeta asociada a la misma.
   * @param id_orden id de orden de trabajo
   * @param precio precio
   * @param saldo saldo
   * @param detalle detalle
   * @param estado estado para OT
   * @param TarjetaId id de Tarjeta
   * @param TarjetaEstado estado para Tarjeta
   * @returns 
   */
  putRetirarOTyTarjeta(
    id_orden, changes: Partial<any>
  ){
    return this._http.put(this.URL + '/ordentrabajo/retirar/' + id_orden, changes)
    .toPromise()
    .then(res=>{
      return res
    });
  }

  /**
   * Registrar que la finalización de la OT ya fue informada al cliente.
   * @param id_orden 
   * @returns 
   */
  putRegistrarInformado(
    id_orden, changes: Partial<any>
  ){
    return this._http.put(this.URL + '/ordentrabajo/informado/' + id_orden,changes)
    .toPromise()
    .then(res=>{
      return res
    });
  }
  



}
