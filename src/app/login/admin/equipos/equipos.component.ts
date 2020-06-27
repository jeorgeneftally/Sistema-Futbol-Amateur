import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Equipo } from 'src/app/modelos/equipo';
import { EquipoService} from 'src/app/servicios/equipo.service';
import { EstadioService} from 'src/app/servicios/estadio.service';
import { UserService} from 'src/app/servicios/user.service';
import { CampeonatoService } from 'src/app/servicios/campeonato.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  equipos:Equipo[];
  public estadios;
  public campeonatos;
  public equipo:Equipo={id:null,nombre:"",descripcion:"",fecha_creacion:null,presidente:"",campeonato_id:null,estadio_id:null};
  public status:string;
  public activarModal:string='';
  public config;
  countAct;
  public identity;
  
  constructor(public _campeonatoService: CampeonatoService, public _equipoService: EquipoService ,private _estadioService:EstadioService,public _userService:UserService) { 
    this.identity=_userService.getIdentity(); //obtenemos la identidad de quien esta logueado  
    this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.countAct
      };
    }

  ngOnInit() {
    this.getEquipos();
    this.getEstadios();
    this.getCampeonatos();
    
  }
  getEquipos(){
    this._equipoService.getEquipos().subscribe(response =>{
      if(response.status =='success'){
        this.equipos=response.equipos;
        this.countAct=this.equipos.length;
      }      
    },
      err=>console.log(err)
    )      
  }
  getEstadios(){
    this._estadioService.getEstadios().subscribe(response =>{
      if(response.status =='success'){
        this.estadios=response.estadios;
      }      
    },
      err=>console.log(err)
    )      
  }
  getCampeonatos(){
    this._campeonatoService.getCampeonatos().subscribe(response =>{
      if(response.status =='success'){
        this.campeonatos=response.campeonatos;
      }      
    },
      err=>console.log(err)
    )      
  }

  pageChanged(event){
    this.config.currentPage = event;
  }
   /**
   * onSubmit crea o actualiza un modelo según el this.modelo
   * contenga un id o no, el id se asigna dependiendo de donde
   * accede al modal (desde crear modelo o editar modelo)
   */
  onSubmit(form){
    if(this.equipo.id==null){
      //crear un modelo
      this._equipoService.create(this.equipo).subscribe(
        response=>{
          if(response.status=="success"){
            this.equipo=response.equipo;
            this.status="success";
            this.getEquipos();
            this.activarModal='';
            this.equipo.id=null;
            this.equipo.nombre="";
            this.equipo.descripcion="";
            this.equipo.presidente="";
            this.equipo.fecha_creacion=null;
            this.equipo.campeonato_id=null;
            this.equipo.estadio_id=null;
            this.ocultarModal();
            form.reset();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Equipo registrado con exito!!',
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
      this._equipoService.update(this.equipo).subscribe(
        response=>{
          if(response.status=="success"){
            this.equipo=response.equipo;
            this.status="success";
            this.getEquipos();
            this.activarModal='';
            this.equipo.id=null;
            this.equipo.nombre="";
            this.equipo.descripcion="";
            this.equipo.presidente="";
            this.equipo.fecha_creacion=null;
            this.equipo.campeonato_id=null;
            this.equipo.estadio_id=null;
         
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Campeonato actualizado con exito!!',
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
  mostrarModal(id?,nombre?,descripcion?,fecha_creacion?,presidente?,campeonato_id?,estadio_id?){
    this.activarModal='block';
    if(id){
      this.equipo.id=id;
      this.equipo.nombre=nombre;
      this.equipo.descripcion=descripcion;
      this.equipo.fecha_creacion=fecha_creacion;
      this.equipo.presidente=presidente;
      this.equipo.campeonato_id=campeonato_id;
      this.equipo.estadio_id=estadio_id;
    }
  }

  /**
   * ocultarModal oculta el modal y reinicia los valores para que el form no siga msotrando
   * los valores que se habian asignado
   */
  ocultarModal(){
    this.activarModal='';
    this.equipo.id=null;
    this.equipo.nombre="";
    this.equipo.descripcion="";
    this.equipo.fecha_creacion=null;
    this.equipo.presidente="";
    this.equipo.campeonato_id=null;
    this.equipo.estadio_id=null;
  }
//elimina campeonato 
  eliminarEquipo(id, nombre){
    console.log(id);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'  
      },
      buttonsStyling: true,
    })
    swalWithBootstrapButtons.fire({
      title: 'Está seguro',
      text: `¿Está seguro que desea eliminar a ${nombre} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!', 
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._equipoService.deleteEquipo(id).subscribe(
          response=>{
            if(response.status=="success"){
              console.log(response);
              swalWithBootstrapButtons.fire(
                'Equipo eliminado!',
                `Equipo ${nombre} eliminado con éxito.`,
                'success'
              )
              this.getEquipos();
            }
          },
          error=>{
            console.log(error);
          }
        )
      }
    });
  }

}
