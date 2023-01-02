import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { OTService } from 'src/app/services/ordenTrabajoServices/ordentrabajo.service';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  
  now = new Date();
  lessWeek = new Date();
  l = this.lessWeek.setDate(this.lessWeek.getDate()-365);

  listadoOT;

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
    private OTService: OTService,
    private _datePipe: DatePipe

  ) {
 
   }
   

  ngOnInit() {
    /**
    * ngx datatable
    */
    this.columns = [
      // { prop: 'Estado.nombre', name: 'Estado', summaryFunc: cells => this.summaryForEstado(cells) },
      { prop: 'Estado.nombre', name: 'Estado', summaryFunc: () => null },
      { prop: 'Cliente.apellido', name: 'Cliente', summaryFunc: () => null },
      { prop: 'Trabajo.nombre', name: 'Trabajo', summaryFunc: () => null },
      { prop: 'Moto.nombre', name: 'Moto', summaryFunc: () => null },
      { prop: 'fecha_entrega_estimada', 
        name: 'Fecha Entrega', 
        pipe:this.datePipe(), summaryFunc: () => null },
      {prop: 'createdAt', name:'Fecha Ingreso', pipe: this.datePipe(), summaryFunc: () => null}
    ];

    this.OTService.getOTBy(this.lessWeek,this.now,'')
    .then(res=>{
      // this.listadoOT = res
      console.log(res)
    /**
    * ngx datatable
    */
    this.rows = res
    this.temp = res
    })
  }

  datePipe () {
    return {transform: (value) => this._datePipe.transform(value, 'EE dd/MM')};
  }
  
  private summaryForEstado(cells: string[]) {
    const esperas = cells.filter(cell => cell === 'espera').length;
    const procesos = cells.filter(cell => cell === 'proceso').length;
    // const finalizados = cells.filter(cell => cell === 'finalizado').length;
    // const retirados = cells.filter(cell => cell === 'retirado').length;

    return `espera: ${esperas}, proceso: ${procesos}`;
    // return `espera: ${esperas}, proceso: ${procesos},finalizado: ${finalizados},retirado: ${retirados} `;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      if (d.Cliente && d.Cliente.apellido){
        return d.Cliente.apellido.toLowerCase().indexOf(val) !== -1 || !val ;
      }else{
        return d;
      }
      
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;


  //   const value = event.target.value.toLowerCase().trim();
  //   // get the amount of columns in the table
  //   const count = this.columns.length;
  //   // get the key names of each column in the dataset
  //   const keys = Object.keys(this.temp[0]);
  //   // assign filtered matches to the active datatable
  //   this.rows = this.temp.filter(item => {
  //     // iterate through each row's column data
  //     for (let i = 0; i < count; i++) {
  //       // check for a match
  //       if (
  //         (item[keys[i]] &&
  //           item[keys[i]]
  //             .toString()
  //             .toLowerCase()
  //             .indexOf(value) !== -1) ||
  //         !value
  //       ) {
  //         // found match, return true to add to result set
  //         return true;
  //       }
  //     }
  //   });

  //   // Whenever the filter changes, always go back to the first page
  //    this.table.offset = 0;
   }

}
