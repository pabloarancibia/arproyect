import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { MotosService } from 'src/app/services/motos/motos.service';

@Component({
  selector: 'app-buscaragregarmoto',
  templateUrl: './buscaragregarmoto.component.html',
  styleUrls: ['./buscaragregarmoto.component.scss'],
})
export class BuscaragregarmotoComponent implements OnInit {
  formMoto: FormGroup
  lstMotos;
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
  SelectionType = SelectionType;


  constructor(
    private motosServices: MotosService,
    private formBuider: FormBuilder,
    private modalCtrl: ModalController
  ) {
    this.formMoto = this.formBuider.group({
      "marca": new FormControl(""),
      "modelo": new FormControl(""),
      "cilindrada": new FormControl("",),
      "anio": new FormControl(""),
      "observaciones": new FormControl("",),
      });
   }

  ngOnInit() {
    this.columns = [
      { prop: 'marca', name: 'Marca', summaryFunc: () => null },
      { prop: 'modelo', name: 'Modelo', summaryFunc: () => null },
      { prop: 'cilindrada', name: 'Cilindrada', summaryFunc: () => null },
      { prop: 'anio', name: 'Año', summaryFunc: () => null },
      { prop: 'observaciones', name: 'Observaciones', summaryFunc: () => null },

    ];
  }

  /**
   * Buscar Moto
   */
  onSubmit(){
    console.log('this.formMoto.value ',this.formMoto.value)
    if (this.formMoto.valid){
      const data = this.formMoto.value;
      if (!data.marca){data.marca = ' '}
      if (!data.modelo){data.modelo = ' '}
      if (!data.cilindrada){data.cilindrada = ' '}
      
      this.motosServices.getMotos(data.marca, data.modelo, data.cilindrada)
      .then(
        res=>{
          console.log('res en moto component ',res)
          this.rows = res['motos']//dat[0]['res']
        }
      )
    
    }
  }

  /**
   * Guardar nueva moto
   */
  nuevaMoto(){
    if (this.formMoto.valid){
      const data = this.formMoto.value
      if (data.anio == '' || data.anio == ' '){
        data.anio = 0
      }
      if (data.cilindrada == '' || data.cilindrada == ' '){
        data.cilindrada = 0
      }
      
      if ((!data.marca || data.marca == '' || data.marca == ' ') &&
            (!data.modelo || data.modelo == '' || data.modelo == ' ') &&
            (!data.anio || data.anio==0) &&
            (!data.observaciones || data.observaciones == '' || data.observaciones == ' ') &&
            (!data.cilindrada || data.cilindrada==0)){
                console.log('No pueden estar todos los campos vacíos')
                return 
            }
      
      this.motosServices.postMoto(data).then(res=>{
        console.log('post moto',res);
        // llamo a onsubmit para que muestre la moto añadido en la lista
        this.onSubmit();
        this.formMoto.reset();
      })
      
    }
  }

  onActivate(event) {
    if(event.type == 'click') {
        //this.selected = []
        console.log('event.row ',event.row);
        this.selected = event.row
        console.log('this.selected ',this.selected)
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
   * Cerrar modal retornando los datos de la Moto seleccionada
   * @returns 
   */
  confirm(){
    const data = this.selected;
    return this.modalCtrl.dismiss(data,'confirm')
  }

}
