import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService} from 'src/app/servicios/user.service';
import { SerieService } from 'src/app/servicios/serie.service';
import { EquipoService } from 'src/app/servicios/equipo.service';
import { Jugador } from 'src/app/modelos/jugador';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';
import {global} from '../../../modelos/global';
import { JugadorService } from 'src/app/servicios/jugador.service';



@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {
  public series;
  public equipos;
  public jugadores:Jugador[];
  public jugador:Jugador={id:null,rut:"",nombre:"",apellido:"",fecha_nacimiento:null,direccion:"",telefono:"",imagen_perfil:"",equipo_id:null,serie_id:null};
  public status:string;
  public activarModal:string='';
  filterEstudiantes='';
  public identity;
  config: any;
  countAct;
  countInac;
  valor="Activo";
  public activarbotones:string='block';
  public url;
  public token;
  


  constructor(public _jugadoresService: JugadorService,private _userService:UserService, public _equipoService:EquipoService, public _serieService:SerieService ) { 
    this.identity=_userService.getIdentity(); //obtenemos la identidad de quien esta logueado
    this.url=global.url; //obtenemos la url del backend
    //validamos que tabla se muestra con la cantidad de datos
      this.config = {
        itemsPerPage:20,
        currentPage: 1,
        totalItems: this.countAct
      }; 
  }
//configuracion para subir foto de perfil de la estudiante
public afuConfig = {
  multiple: false,
  formatsAllowed: ".jpg,.png,.gif,.jpeg",
  maxSize: "50",
  uploadAPI:  {
    url:global.url+'jugador/upload',
    headers: {
        "Authorization" : this._userService.getToken()
    }
  },
  theme: "attachPin",
  hideProgressBar: false,
  hideResetBtn: true,
  hideSelectBtn: false,
  attachPinText:'Sube tu avatar de usuario',
  replaceTexts: {
    selectFileBtn: 'Select Files',
    resetBtn: 'Reset',
    uploadBtn: 'Upload',
    dragNDropBox: 'Drag N Drop',
    attachPinBtn: 'Attach Files...',
    afterUploadMsg_success: 'Successfully Uploaded !',
    afterUploadMsg_error: 'Upload Failed !'
  }
};

 /**
   * imageUpload se activa una vez se sube la imagen al servidor---imagen perfil
   * guarda el nombre de la imagen en el estudiante para una vez se actualice
   * el producto desde el form, este ya tenga la imagen asignada
   * @param datos corresponde a la respuesta del servidor al subir la imagen
   */
  imageUpload(datos){
    //guardar datos de la respuesta del servidor en una variable
    let data=JSON.parse(datos.response);
    console.log(data);
    //asignar nombre de la imagen al producto
    this.jugador.imagen_perfil= data.image;
  }

  ngOnInit():void{
    //obtenemos los arreglos de estudiantes al iniciar
    this.getJugadores();
    this.getSeries();
    this.getEquipos();
    this.identity=this._userService.getIdentity(); 
  }
  //ocultamos datos que no queremos exportar
  public exportar(){
    this.activarbotones='none';
    setTimeout(this.captureScreen,1000);
  }
  //motrar y ocultar botones
  activar(){
    this.activarbotones='block';
  }
  //exportar tabla con datos
  public captureScreen()  
  {  
    var data = document.getElementById('contenido');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'letter'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Listado-Jugadores.pdf'); // Generated PDF   
    });  
   
  }  

  //paginamiento de tabla
  pageChanged(event){
    this.config.currentPage = event;
  }


  //obtenemos datos de JUGADORES
  getJugadores(){
    this._jugadoresService.getJugadores().subscribe(response =>{
      if(response.status =='success'){
        this.jugadores=response.jugadores;
        this.countAct=this.jugadores.length;
      }      
    },
      err=>console.log(err)
    )
        
  }  
  //obtenemos datos de SERIES activos
  getSeries(){
    this._serieService.getSeries().subscribe(response =>{
      if(response.status =='success'){
        this.series=response.series;
      }      
    },
      err=>console.log(err)
    )   
  }  

  //obtenemos datos de EQUIPOS
  getEquipos(){
    this._equipoService.getEquipos().subscribe(response =>{
      if(response.status =='success'){
        this.equipos=response.equipos;
      }      
    },
      err=>console.log(err)
    )   
  } 
 /**
   * onSubmit crea o actualiza un estudiante según el this.estudiante
   * contenga un id o no, el id se asigna dependiendo de donde
   * accede al modal (desde crear modelo o editar estudiantes)
   */
  onSubmit(form){
    if(this.jugador.id==null){
      //crear un modelo
      this._jugadoresService.create(this.jugador).subscribe(
        response=>{
          if(response.status=="success"){
            this.jugador=response.jugador;
            this.status="success";
            this.getJugadores();
            this.jugador.id=null;
            this.jugador.rut="";
            this.jugador.nombre="";
            this.jugador.apellido="";
            this.jugador.fecha_nacimiento=null;
            this.jugador.direccion="";
            this.jugador.telefono="";
            this.jugador.serie_id=null;
            this.jugador.equipo_id=null;
            this.jugador.imagen_perfil="";
            this.ocultarModal();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Jugador registrado con exito!!',
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
      //actualiza la ficha
      this._jugadoresService.update(this.jugador).subscribe(
        response=>{
          if(response.status=="success"){
            this.jugador=response.jugador;
            this.status="success";
            this.getJugadores();
            this.jugador.rut="";
            this.jugador.nombre="";
            this.jugador.apellido="";
            this.jugador.fecha_nacimiento=null;
            this.jugador.direccion="";
            this.jugador.telefono="";
            this.jugador.serie_id=null;
            this.jugador.equipo_id=null;
            this.jugador.imagen_perfil="";
            this.ocultarModal();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Jugador actualizado con exito!!',
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
  mostrarModal(id?,rut?,nombre?,apellido?,fecha_nacimiento?,direccion?,telefono?,equipo_id?,serie_id?,imagen_perfil?){
    this.activarModal='block';
    if(id){
      this.jugador.id=id;
      this.jugador.rut = rut;
      this.jugador.nombre = nombre;
      this.jugador.apellido=apellido;
      this.jugador.fecha_nacimiento=fecha_nacimiento;
      this.jugador.direccion=direccion;
      this.jugador.telefono=telefono;
      this.jugador.equipo_id=equipo_id;
      this.jugador.imagen_perfil=imagen_perfil;
      this.jugador.serie_id=serie_id;
    }
  }

  /**
   * ocultarModal oculta el modal y reinicia los valores para que el form no siga msotrando
   * los valores que se habian asignado
   */
  ocultarModal(){
      this.activarModal='';
      this.jugador.id=null;
      this.jugador.rut="";
      this.jugador.nombre="";
      this.jugador.apellido="";
      this.jugador.fecha_nacimiento=null;
      this.jugador.direccion="";
      this.jugador.telefono="";
      this.jugador.serie_id=null;
      this.jugador.equipo_id=null;
      this.jugador.imagen_perfil="";
  }

  

 
  //desabilita estudiante -- actualiza campo de estado
  eliminarJugador(id,nombre,apellido){
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
      text: `¿Está seguro que desea eliminar a ${nombre +" "+ apellido} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!', 
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._jugadoresService.deleteJugador(id).subscribe(
          response=>{
            if(response.status=="success"){
              console.log(response);
              swalWithBootstrapButtons.fire(
                'Eliminado!',
                `${nombre +" "+ apellido} Eliminado con éxito.`,
                'success'
              )
              this.getJugadores();
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
