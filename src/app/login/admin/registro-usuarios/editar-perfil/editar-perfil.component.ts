import { Component, OnInit } from '@angular/core';
import {global} from '../../../../modelos/global'
import { User } from 'src/app/modelos/user';
import {UserService} from '../../../../servicios/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  
  public user:User;
  public identity;
  public token;
  public status;
  public url;


  constructor( private userService:UserService) {
    this.user = new User();
    this.identity=this.userService.getIdentity();
    this.token=this.userService.getToken();
    this.url=global.url;

    this.user.id=this.identity.sub;
    this.user.name=this.identity.name;
    this.user.surname=this.identity.surname;
    this.user.email=this.identity.email;
    this.user.password='';
    this.user.role=this.identity.role;
    this.user.profesion=this.identity.profesion;
    this.user.image=this.identity.image;
    this.user.estado=this.identity.estado;
    console.log(this.user);
    console.log(this.identity);
   }

   public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url:global.url+'user/upload',
      headers: {
          "Authorization" : this.userService.getToken()
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

  ngOnInit() {
   
  }

  /**
   * onSubmit realiza la peticion al servicio para actualizar los datos del usuario
   * para ello debe enviarlo el token y los datos para actualizar
   */
  onSubmit(form){
   
    this.userService.update(this.token,this.user).subscribe(
      response => { 
        if(response && response.status){
          console.log(response);
          this.status='success';
          //actualizar usuario con la sesion iniciada
          if(response.changes.name){ 
            this.user.name=response.changes.name;
          }
          if(response.changes.surname){ 
            this.user.surname=response.changes.surname;
          }
          if(response.changes.email){ 
            this.user.email=response.changes.email;
          }
          if(response.changes.image){ 
            this.user.image=response.changes.image;
          }
         
          this.identity=this.user;
          localStorage.setItem('identity',JSON.stringify(this.identity));

          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Actualizacion Correcta',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          this.status='error'
        }
      },
      error =>{
        this.status='error',
        console.log(<any>error)
      }
    );
  }

 
 /**
   * imageUpload se activa inmediatamente despues de subir la imagen al servidor
   * recibe la respuesta y guarda el nombre de la imagen en el user para luego
   * al actualizar desde el formulario el user ya tenga el nombre de la imagen asignado
   * @param datos corresponde a la respuesta del servidor al subir la imagen
   */
  imageUpload(datos){
    //guardar datos de la respuesta del servidor a la subida de imagen en una variable
    //la respuesta contiene el nombre de la imagen en el servidor  
    let data=JSON.parse(datos.response);
    this.user.image= data.image;
  }

}
