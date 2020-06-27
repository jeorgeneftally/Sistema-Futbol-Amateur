import { Component, OnInit } from '@angular/core';
import {User} from '../modelos/user';
import {UserService} from '../servicios/user.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:User={id:null,name:"",surname:"",email:"",password:"",profesion:"",image:"",role:null,estado:"Activo"};
  public status:string;
  public token;
  public identity;
  public mostrarRegistro:boolean=false;

  constructor(
    private _userService:UserService,
    private _router:Router,
    private _route:ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.logout();
  }

  onSubmit(form){
    this._userService.signup(this.user).subscribe(
      response=>{
        console.log(response);
        this.token=response;
        //obtenemos el token del usuario que se logea
        if(response && response.status != 'error'){
          this.status='success';
          //ahora obtenemos los datos del usuario que se logea
          this._userService.signup(this.user,true).subscribe(
            response=>{
              this.identity=response;
              if(this.identity.estado=="Activo"){
              //persistir datos del usuario identificado
              localStorage.setItem('token',this.token);
              localStorage.setItem('identity',JSON.stringify(this.identity));

              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Acceso Correcto',
                showConfirmButton: false,
                timer: 1500
              })
              //redireccion a inicio
              this._router.navigate(['/Inicio']);
            }else{
              Swal.fire({
                position: 'center',
                type: 'error',
                title: 'Cuenta desahibilitada',
                showConfirmButton: false,
                timer: 1500
              })
              //remueve valores del usuario identificado
              localStorage.removeItem('identity');
              localStorage.removeItem('token');
              this.identity=null;
              this.token=null;
            }
            },
            error=>{
              this.status='error';
              console.log(<any>error);
            }
          );
        }else{
          this.status='error';
          Swal.fire('Oops...', 'Datos incorrectos!!', 'error');
        }
      },
      error=>{
        this.status='error';
        Swal.fire('Oops...', 'Datos incorrectos!!', 'error');
        console.log(<any>error);
      }
    )
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

  /**
   * logout sirve para cerrar la sesion del usuario identificado
   */
  logout(){
    //obtiene la variable que esta en la url
    this._route.params.subscribe(params=>{
      //guarda la variable de la url (en este caso se llama sure), y le hace casting a number
      let logout= +params['sure'];

      //si el valor de la variable es 1, cierra la sesion
      if(logout==1){
        //remueve valores del usuario identificado
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this.identity=null;
        this.token=null;
        //redirecciona a inicio
        this._router.navigate(['/Login']);
      }
    })
  }

  /**
   * activarRegistro sirve para mostrar el formulario de registro
   */
  activarRegistro(){
    this.mostrarRegistro=true;
  }

  /**
   * activarLogin sirve para mostrar el formulario de login
   */
  activarLogin(){
    this.mostrarRegistro=false;
  }


}
