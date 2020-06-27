import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EstadioService} from 'src/app/servicios/estadio.service';
import { UserService} from 'src/app/servicios/user.service';
import { Estadio } from 'src/app/modelos/estadio';

@Component({
  selector: 'app-estadios',
  templateUrl: './estadios.component.html',
  styleUrls: ['./estadios.component.css']
})
export class EstadiosComponent implements OnInit {

  estadios:Estadio[];
  public estadio:Estadio={id:null,nombre:"",direccion:"",descripcion:"",cantidad_asistentes:null};
  public status:string;
  public activarModal:string='';
  public config;
  countAct;
  public identity;
  
  constructor(private _estadioService:EstadioService,public _userService:UserService) { 
    this.identity=_userService.getIdentity(); //obtenemos la identidad de quien esta logueado  
    this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.countAct
      };
    }

  ngOnInit() {
    this.getEstadios();
    
  }
  getEstadios(){
    this._estadioService.getEstadios().subscribe(response =>{
      if(response.status =='success'){
        this.estadios=response.estadios;
        this.countAct=this.estadios.length;
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
    if(this.estadio.id==null){
      //crear un modelo
      this._estadioService.create(this.estadio).subscribe(
        response=>{
          if(response.status=="success"){
            this.estadio=response.estadio;
            this.status="success";
            this.getEstadios();
            this.activarModal='';
            this.estadio.id=null;
            this.estadio.nombre="";
            this.estadio.descripcion="";
            this.estadio.direccion="";
            this.estadio.cantidad_asistentes=null;
            this.ocultarModal();
            form.reset();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Estadio registrado con exito!!',
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
      this._estadioService.update(this.estadio).subscribe(
        response=>{
          if(response.status=="success"){
            this.estadio=response.estadio;
            this.status="success";
            this.getEstadios();
            this.activarModal='';
            this.estadio.id=null;
            this.estadio.nombre="";
            this.estadio.descripcion="";
            this.estadio.direccion="";
            this.estadio.cantidad_asistentes=null;
            form.reset();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Estadio actualizado con exito!!',
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
  mostrarModal(id?,nombre?,direccion?,descripcion?,cantidad_asistentes?){
    this.activarModal='block';
    if(id){
      this.estadio.id=id;
      this.estadio.nombre=nombre;
      this.estadio.descripcion=descripcion;
      this.estadio.direccion=direccion;
      this.estadio.cantidad_asistentes=cantidad_asistentes;
    
    }
  }

  /**
   * ocultarModal oculta el modal y reinicia los valores para que el form no siga msotrando
   * los valores que se habian asignado
   */
  ocultarModal(){
    this.activarModal='';
    this.estadio.id=null;
    this.estadio.nombre="";
    this.estadio.descripcion="";
    this.estadio.direccion="";
    this.estadio.cantidad_asistentes=null;
  
  }
//elimina campeonato 
  eliminarEstadio(id, nombre){
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
        this._estadioService.deleteEstadio(id).subscribe(
          response=>{
            if(response.status=="success"){
              console.log(response);
              swalWithBootstrapButtons.fire(
                'Estadio eliminado!',
                `Estadio ${nombre} eliminado con éxito.`,
                'success'
              )
              this.getEstadios();
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
