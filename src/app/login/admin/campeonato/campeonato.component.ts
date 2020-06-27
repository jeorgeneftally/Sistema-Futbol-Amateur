import { Component, OnInit } from '@angular/core';
import { Campeonato } from 'src/app/modelos/campeonato';
import { CampeonatoService} from 'src/app/servicios/campeonato.service';
import { UserService} from 'src/app/servicios/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-campeonato',
  templateUrl: './campeonato.component.html',
  styleUrls: ['./campeonato.component.css']
})
export class CampeonatoComponent implements OnInit {

  today:number=Date.now();
  campeonatos:Campeonato[];
  public campeonato:Campeonato={id:null,nombre:"",descripcion:"",user_id:this._userService.identity.sub};
  public status:string;
  public activarModal:string='';
  public config;
  public identity;
  countAct;
  
  constructor(public _campeonatoService: CampeonatoService ,private _userService:UserService) { 
    this.identity=_userService.getIdentity(); //obtenemos la identidad de quien esta logueado 
    console.log(this.identity);  
    this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.countAct
      };
    }
  

  ngOnInit() {
    this.getCampeonatos();
    
  }
  getCampeonatos(){
    this._campeonatoService.getCampeonatos().subscribe(response =>{
      if(response.status =='success'){
        this.campeonatos=response.campeonatos;
        this.countAct=this.campeonatos.length;
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
    if(this.campeonato.id==null){
      //crear un modelo
      this.campeonato.id=this._userService.identity.sub;
      this._campeonatoService.create(this.campeonato).subscribe(
        response=>{
          if(response.status=="success"){
            this.campeonato=response.campeonato;
            this.status="success";
            this.getCampeonatos();
            this.activarModal='';
            this.campeonato.id=null;
            this.campeonato.nombre="";
            this.campeonato.descripcion="";
            this.ocultarModal();
            form.reset();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Campeonato registrado con exito!!',
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
      this._campeonatoService.update(this.campeonato).subscribe(
        response=>{
          if(response.status=="success"){
            this.campeonato=response.campeonato;
            this.status="success";
            this.getCampeonatos();
            this.activarModal='';
            this.campeonato.id=null;
            this.campeonato.nombre="";
            this.campeonato.descripcion="";
         
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
  mostrarModal(id?,nombre?,descripcion?){
    this.activarModal='block';
    if(id){
      this.campeonato.id=id;
      this.campeonato.nombre=nombre;
      this.campeonato.descripcion=descripcion;
    }
  }

  /**
   * ocultarModal oculta el modal y reinicia los valores para que el form no siga msotrando
   * los valores que se habian asignado
   */
  ocultarModal(){
    this.activarModal='';
    this.campeonato.id=null;
    this.campeonato.nombre="";
    this.campeonato.descripcion="";
  }
//elimina campeonato 
  eliminarCampeonato(id, nombre){
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
        this._campeonatoService.deleteCampeonato(id).subscribe(
          response=>{
            if(response.status=="success"){
              console.log(response);
              swalWithBootstrapButtons.fire(
                'Campeonato eliminado!',
                `Campeonato ${nombre} eliminado con éxito.`,
                'success'
              )
              this.getCampeonatos();
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
