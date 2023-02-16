import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ClientesService } from 'src/app/services/clientes/clientes.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss'],
})
export class NuevoComponent implements OnInit {

  formCliente: FormGroup
  lstClientes;
  /**
   * ngx datatable
   */
  // public data: Data;
  public columns: any;
  public rows: any;
  loadingIndicator = true;
  reorderable = true;
  temp: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  selected = [];



  constructor(
    private clientesServices: ClientesService,
    private formBuider: FormBuilder
  ) {

    this.formCliente = this.formBuider.group({
    "nombre": new FormControl(""),
    "apellido": new FormControl(""),
    "dni": new FormControl("",),
    "celular": new FormControl("")
    });

  }

  ngOnInit() {
    this.columns = [
      { prop: 'nombre', name: 'Nombre', summaryFunc: () => null },
      { prop: 'apellido', name: 'Apellido', summaryFunc: () => null },
      { prop: 'celular', name: 'Celular', summaryFunc: () => null },

    ];

  }

  onSubmit(){
    
    if (this.formCliente.valid){
      const data = this.formCliente.value;
      if (!data.nombre){data.nombre = ' '}
      if (!data.apellido){data.apellido = ' '}
      if (!data.celular){data.celular = ' '}
      
      this.clientesServices.getClientes(data.nombre, data.apellido, data.celular)
      .then(
        res=>{
          
          console.log('res en nuevo.component',res)
          this.rows = res['res']//dat[0]['res']
        }
      )
    //this.rows = res
    }
  }

  nuevoCliente(){
    if (this.formCliente.valid){
      const data = this.formCliente.value
      if (data.dni == '' || data.dni == ' '){
        data.dni = 0
      }
      if (data.celular == '' || data.celular == ' '){
        data.celular = 0
      }
      console.log(data)
      this.clientesServices.postCliente(data).then(res=>{
        console.log(res);
      })
      
    }
  }

}
