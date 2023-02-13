import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private URL = environment.apiUrl;

  constructor(
    private _http: HttpClient,
  ) { }

  /**
   * Buscar clientes por:
   * data: {apellido, nombre y celular}
   * @param data 
   * @returns 
   */
  getClientes(nombre, apellido, celular){
    return this._http.get(this.URL + '/clientes/buscar'
    +'/nombre/'+ nombre
    +'/apellido/'+apellido
    +'/celular/'+celular
    ).toPromise()
    .then(res=>{
      console.log('res en service',res)
      return res;
    })
  }
}
