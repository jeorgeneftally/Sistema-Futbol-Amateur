import { Component, OnInit } from '@angular/core';
import { SerieService } from 'src/app/servicios/serie.service';
import {Router, ActivatedRoute, Params} from '@angular/router'
import { EquipoService } from 'src/app/servicios/equipo.service';
@Component({
  selector: 'app-detalle-equipo',
  templateUrl: './detalle-equipo.component.html',
  styleUrls: ['./detalle-equipo.component.css']
})
export class DetalleEquipoComponent implements OnInit {

  public juveniles;
  public primera;
  public senior;
  public honor;
  public equipo;
  constructor(public _equipoService: EquipoService ,public _serieService: SerieService, private _route:ActivatedRoute, private _router:Router) { }

  ngOnInit() {
    this.getDetalles();

  }

  getDetalles(){
    this._route.params.subscribe(params=>{
      let id=params['id'];
    console.log(id);
    this._serieService.getJugadoresporserie(1,id).subscribe(response =>{
      if(response.status =='success'){
        this.juveniles=response.serie;
        console.log(this.juveniles);
      }      
    },
      err=>console.log(err)
    )
    this._serieService.getJugadoresporserie(2,id).subscribe(response =>{
      if(response.status =='success'){
        this.primera=response.serie;
        console.log(this.primera);
      }      
    },
      err=>console.log(err)
    )
    this._serieService.getJugadoresporserie(3,id).subscribe(response =>{
      if(response.status =='success'){
        this.senior=response.serie;
        console.log(this.senior);
      }      
    },
      err=>console.log(err)
    )
    this._serieService.getJugadoresporserie(4,id).subscribe(response =>{
      if(response.status =='success'){
        this.honor=response.serie;
        console.log(this.honor);
      }      
    },
      err=>console.log(err)
    )
    this._equipoService.getEquipo(id).subscribe(response =>{
      if(response.status =='success'){
        this.equipo=response.equipo;
        console.log(this.equipo);
      }      
    },
      err=>console.log(err)
    )
    }     
    
    )

  }

  mostrarJuvenil(){
    document.getElementById("Juvenil").setAttribute("style","display:normal");
    document.getElementById("Primera").setAttribute("style","display:none"); 
    document.getElementById("Senior").setAttribute("style","display:none"); 
    document.getElementById("Honor").setAttribute("style","display:none");
 
 }
  mostrarPrimera(){
  document.getElementById("Juvenil").setAttribute("style","display:none");
  document.getElementById("Primera").setAttribute("style","display:normal"); 
  document.getElementById("Senior").setAttribute("style","display:none"); 
  document.getElementById("Honor").setAttribute("style","display:none");
  }
  mostrarSenior(){
    document.getElementById("Juvenil").setAttribute("style","display:none");
    document.getElementById("Primera").setAttribute("style","display:none"); 
    document.getElementById("Senior").setAttribute("style","display:normal"); 
    document.getElementById("Honor").setAttribute("style","display:none");
  }
  mostrarHonor(){
    document.getElementById("Juvenil").setAttribute("style","display:none");
    document.getElementById("Primera").setAttribute("style","display:none"); 
    document.getElementById("Senior").setAttribute("style","display:none"); 
    document.getElementById("Honor").setAttribute("style","display:normal"); 
  }

}
