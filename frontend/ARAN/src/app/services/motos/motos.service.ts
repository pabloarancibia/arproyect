import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MotosService {

  private URL = environment.apiUrl;

  constructor(
    private _http: HttpClient,
  ) { }

  /**
   * Buscar motos por:
   * modelo, marca y cilindrada
   * @params marca, modelo, cilindrada 
   * @returns 
   */
  getMotos(marca, modelo, cilindrada){
    return this._http.get(this.URL + '/motos/buscar'
    +'/marca/'+ marca
    +'/modelo/'+modelo
    +'/cilindrada/'+cilindrada
    ).toPromise()
    .then(res=>{
      console.log('res en service',res)
      return res;
    })
  }

  /**
   * Nueva Moto
   * data: marca, modelo, cilindrada, anio, observaciones
   */
  postMoto(data){
    return this._http.post(this.URL + '/motos/nueva', data).toPromise()
    .then(res=>{
      return res;
    })
  }
}

