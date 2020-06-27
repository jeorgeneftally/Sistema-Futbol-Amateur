import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService} from 'src/app/servicios/user.service';
import { CampeonatoService } from 'src/app/servicios/campeonato.service';
import { Arbitro } from 'src/app/modelos/arbitro';
import { ArbitroService } from 'src/app/servicios/arbitro.service';


@Component({
  selector: 'app-arbitros',
  templateUrl: './arbitros.component.html',
  styleUrls: ['./arbitros.component.css']
})
export class ArbitrosComponent implements OnInit {
  arbitros:Arbitro[];
  public campeonatos;
  public arbitro:Arbitro={id:null,nombres:"",apellidos:"",fecha_nacimiento:null,campeonato_id:null};
  public status:string;
  public activarModal:string='';
  public config;
  countAct;
  public identity;
  
  constructor(public _campeonatoService: CampeonatoService,public _userService:UserService,public  _arbitroService: ArbitroService) { 
    this.identity=_userService.getIdentity(); //obtenemos la identidad de quien esta logueado  
    this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.countAct
      };
    }

  ngOnInit() {
    this.getArbitros();
    this.getCampeonatos();
    
  }
  getArbitros(){
    this._arbitroService.getArbitros().subscribe(response =>{
      if(response.status =='success'){
        this.arbitros=response.arbitros;
        this.countAct=this.arbitros.length;
        console.log(this.arbitros);
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
    if(this.arbitro.id==null){
      //crear un modelo
      this._arbitroService.create(this.arbitro).subscribe(
        response=>{
          if(response.status=="success"){
            this.arbitro=response.arbitro;
            this.status="success";
            this.getArbitros();
            this.activarModal='';
            this.arbitro.id=null;
            this.arbitro.nombres="";
            this.arbitro.apellidos="";
            this.arbitro.fecha_nacimiento=null;
            this.arbitro.campeonato_id=null;
            this.ocultarModal();
            form.reset();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Arbitro registrado con exito!!',
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
      this._arbitroService.update(this.arbitro).subscribe(
        response=>{
          if(response.status=="success"){
            this.arbitro=response.arbitro;
            this.status="success";
            this.getArbitros();
            this.activarModal='';
            this.arbitro.id=null;
            this.arbitro.nombres="";
            this.arbitro.apellidos="";
            this.arbitro.fecha_nacimiento=null;
            this.arbitro.campeonato_id=null;
         
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Arbitro actualizado con exito!!',
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
  mostrarModal(id?,nombres?,apellidos?,fecha_nacimiento?,campeonato_id?){
    this.activarModal='block';
    if(id){
      this.arbitro.id=id;
      this.arbitro.nombres=nombres;
      this.arbitro.apellidos=apellidos;
      this.arbitro.fecha_nacimiento=fecha_nacimiento;
      this.arbitro.campeonato_id=campeonato_id;

    }
  }

  /**
   * ocultarModal oculta el modal y reinicia los valores para que el form no siga msotrando
   * los valores que se habian asignado
   */
  ocultarModal(){
    this.activarModal='';
    this.arbitro.id=null;
    this.arbitro.nombres="";
    this.arbitro.apellidos="";
    this.arbitro.fecha_nacimiento=null;
    this.arbitro.campeonato_id=null;
  }
//elimina campeonato 
  eliminarArbitro(id, nombres,apellidos){
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
      text: `¿Está seguro que desea eliminar a ${nombres+' '+apellidos} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!', 
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._arbitroService.deleteArbitro(id).subscribe(
          response=>{
            if(response.status=="success"){
              console.log(response);
              swalWithBootstrapButtons.fire(
                'Arbitro eliminado!',
                `Arbitro ${nombres+' '+apellidos} eliminado con éxito.`,
                'success'
              )
              this.getArbitros();
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
