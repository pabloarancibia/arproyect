import { Component, OnInit } from '@angular/core';
import { OTService } from 'src/app/services/ordenTrabajoServices/ordentrabajo.service';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  
  now = new Date();
  lessWeek = new Date();
  l = this.lessWeek.setDate(this.lessWeek.getDate()-14);


  constructor(
    private OTService: OTService,
  ) {
     
   }

  ngOnInit() {
  console.log(this.now)
  console.log(this.lessWeek)
  let listado = this.OTService.getOTBy(this.lessWeek,this.now,'')
    .then(res=>{
      console.log(res)
    })
  }

}
