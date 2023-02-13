import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss'],
})
export class NuevoComponent implements OnInit {

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



  constructor() { }

  ngOnInit() {
    this.columns = [
      { prop: 'nombre', name: 'Nombre', summaryFunc: () => null },

    ];

    // service
    //this.rows = res
  }

}
