import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../modelos/user';
import {global} from '../modelos/global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url:string;
  public identity;
  public token;
  public headers;

  constructor(
    public _http:HttpClient,
  ) {
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  }

  getUsuarios():Observable<any>{    
    return this._http.get(this.url+'user',{headers:this.headers});
  } 

   /**
   * register guarda un nuevo usuario en el servidor
   * @param user contiene los datos del usuario a registrar
   */
  register(user):Observable<any>{
    let json=JSON.stringify(user);
    let params='json='+json;

    return this._http.post(this.url+'user',params,{headers:this.headers});
  }

  /**
   * signup permite al usuario identificarse para poder logearse
   * @param user corresponse a los datos para el logeo del usuario (email y password)
   * @param gettoken si es distinto a null quiere decir que se desea obtener los datos del usuario decodificados
   */
  signup(user,gettoken=null):Observable<any>{

    //verifica el valor del parametro dependiendo del valor que le asigne a gettoken
    //realizara una accion u otra en el servidor, en caso de ser true, traera los datos
    //decodificados del usuario y si es false entregara solo el token codificado
    if(gettoken != null){
        user.gettoken='true';
    }

    let json=JSON.stringify(user);
    let params='json='+json;

    return this._http.post(this.url+'user/login',params,{headers:this.headers});
  }

  /**
   * update permite actualizar los datos del usuario logeado
   * @param token token cifrado que se requiere para verificar que el usuario esta logeado y puede actualizar sus datos
   * @param user datos del usuario que quiere actualizar
   */
  update(token,user): Observable<any>{
    let json=JSON.stringify(user);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token);

    return this._http.put(this.url+'user/update',params,{headers:headers});
  }
  

  /**
   * getIdentity obtiene la identidad (datos) del usuario logeado
   * estos datos fueron almacenados al momento de logearse
   */
  getIdentity(){
    //parse convierte un json en un objeto javascript usable
    let identity=JSON.parse(localStorage.getItem('identity'));

    if(identity && identity!='undefined'){
        this.identity=identity;
    }else{
        this.identity=null;
    }
    return this.identity;
  }

 /**
   * getToken obtiene el token cifrado del usuario logeado
   * este token fue almacenado al momento de logearse
   */
  getToken(){
    let token=localStorage.getItem('token');

    if(token != "undefined"){
        this.token=token;
    }else{
        this.token=null;
    }
    return this.token;
}

  disableUser(id):Observable<any>{
    return this._http.put(this.url+"userDisable/"+id,{headers:this.headers});
  }

  habilitarUser(id):Observable<any>{
    return this._http.put(this.url+"userHabilitar/"+id,{headers:this.headers});
  }
  roleUser(id):Observable<any>{
    return this._http.put(this.url+"userRole/"+id,{headers:this.headers});
  }
  roleAdmin(id):Observable<any>{
    return this._http.put(this.url+"userRoleU/"+id,{headers:this.headers});
  }

}
