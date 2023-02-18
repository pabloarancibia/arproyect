import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
    private formBuider: FormBuilder,
    private modalCtrl: ModalController
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
      
      if ((!data.nombre || data.nombre == '' || data.nombre == ' ') &&
            (!data.apellido || data.apellido == '' || data.apellido == ' ') &&
            (!data.dni || data.dni==0) &&
            (!data.celular || data.celular==0)){
                console.log('No pueden estar todos los campos vacíos')
                return 
            }
      
      this.clientesServices.postCliente(data).then(res=>{
        console.log(res);
        // llamo a onsubmit para que muestre el cliente añadido en la lista
        this.onSubmit();
      })
      
    }
  }

  onActivate(event) {
    if(event.type == 'click') {
        console.log(event.row);
        this.selected = event.row
        console.log(this.selected)
    }
}

  /**
   * 
   * @returns Cerrar modal sin cambios
   */
  cancel(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  /**
   * Cerrar modal retornando los datos del cliente seleccionado
   * @returns 
   */
  confirm(){
    // const data = {
    //   'nombre':'nombre',
    //   'apellido':'apellido',
    //   'id':123,
    //   'dni': ''
    // }
    const data = this.selected;
    return this.modalCtrl.dismiss(data,'confirm')
  }

}
