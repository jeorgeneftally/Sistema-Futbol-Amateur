import { Component, OnInit } from '@angular/core';
import {User} from '../../../modelos/user';
import {UserService} from '../../../servicios/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {
  public user:User={id:null,name:"",surname:"",email:"",password:"",image:"",profesion:"",role:null,estado:"Activo"};
  public status:string;
  constructor( private _userService:UserService,) { }

  ngOnInit() {
  }
 /**
   * onRegister permite registrar un nuevo usuario
   */
  onRegister(form){
    
    this._userService.register(this.user).subscribe(
      response=>{
        if(response.status=='success'){
          this.status=response.status;
          form.reset();
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Usuario registrado con exito!!',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          this.status="error";
        }
        console.log(response);
      },
      error=>{
        this.status="error";
        console.log(<any>error);
      }
    );
  }

  

}
