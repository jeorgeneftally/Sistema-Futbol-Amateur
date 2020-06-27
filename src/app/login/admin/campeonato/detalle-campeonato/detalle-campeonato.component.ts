import { Component, OnInit } from '@angular/core';
import { CampeonatoService } from 'src/app/servicios/campeonato.service';
import {Router, ActivatedRoute, Params} from '@angular/router'
import { PuntoService } from 'src/app/servicios/punto.service';
import { Punto } from 'src/app/modelos/punto';
import Swal from 'sweetalert2';
import { EquipoService } from 'src/app/servicios/equipo.service';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-detalle-campeonato',
  templateUrl: './detalle-campeonato.component.html',
  styleUrls: ['./detalle-campeonato.component.css']
})
export class DetalleCampeonatoComponent implements OnInit {
  public tabla;
  public campeonato;
  public campeonatos;
  public equipos;
  public status;
  public activarModal;
  public id_campeonato;
  public identity;
  punto:Punto={id:null,puntos:null,campeonato_id:null,equipo_id:null}
  constructor(public _userService: UserService ,public _equipoService: EquipoService ,public _puntoService:PuntoService ,public _campeonatoService: CampeonatoService, private _route:ActivatedRoute, private _router:Router) { 
  this.identity=this._userService.getIdentity();

  }

  ngOnInit() {
    this.getDetalles();

  }

 
  getDetalles(){
    this._route.params.subscribe(params=>{
      let id=params['id'];
      this.id_campeonato=id;
    console.log(this.id_campeonato);
    this._campeonatoService.getTabla(id).subscribe(response =>{
      if(response.status =='success'){
        this.tabla=response.tabla;
      }      
    },
      err=>console.log(err)
    )
    this._campeonatoService.getCampeonato(id).subscribe(response =>{
      if(response.status =='success'){
        this.campeonato=response.campeonato;
      }      
    },
      err=>console.log(err)
    )

    this._equipoService.getEquipo(id).subscribe(response =>{
      if(response.status =='success'){
        this.equipos=response.equipo;
      }      
    },
      err=>console.log(err)
    )
    }     
    
    )

  }

 
  



    /**
   * onSubmit crea o actualiza un modelo según el this.modelo
   * contenga un id o no, el id se asigna dependiendo de donde
   * accede al modal (desde crear modelo o editar modelo)
   */
  onSubmit(form){
    if(this.punto.id==null){
      //crear un modelo
      this.punto.campeonato_id=this.id_campeonato;
      this._puntoService.create(this.punto).subscribe(
        response=>{
          if(response.status=="success"){
            this.punto=response.punto;
            this.status="success";
            this.getDetalles();
            this.activarModal='';
            this.punto.id=null;
            this.punto.puntos=null;
            this.punto.campeonato_id=null;
            this.punto.equipo_id=null;
            this.ocultarModal();
            form.reset();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Puntos registrado con exito!!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        },
        error=>{
          console.log(error);
          this.status="error";
        }
      )
    }else{
      //actualiza el campeonato
      this._puntoService.update(this.punto).subscribe(
        response=>{
          if(response.status=="success"){
            this.punto=response.punto;
            this.status="success";
            this.getDetalles();
            this.activarModal='';
            this.punto.id=null;
            this.punto.puntos=null;
            this.punto.campeonato_id=null;
            this.punto.equipo_id=null;
            this.ocultarModal();
         
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Puntos actualizado con exito!!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        },
        error=>{
          console.log(error);
          this.status="error";
        }
      )
    }
    
  }
   /**
   * mostrarModal despliega el modal y puede cargar los datos en el formulario
   * en caso de que se reciban por parametro (si se accede desde el boton editar)
   */
  mostrarModal(id?,puntos?,equipo_id?,campeonato_id?){
    this.activarModal='block';
    if(id){
      this.punto.id=id;
      this.punto.puntos=puntos;
      this.punto.equipo_id=equipo_id;
      this.punto.campeonato_id=campeonato_id;
    }
  }

  /**
   * ocultarModal oculta el modal y reinicia los valores para que el form no siga msotrando
   * los valores que se habian asignado
   */
  ocultarModal(){
    this.activarModal='';
    this.punto.id=null;
    this.punto.puntos=null;
    this.punto.equipo_id=null;
    this.punto.campeonato_id=null;
  }

}
