import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {global} from '../modelos/global';

@Injectable({
  providedIn: 'root'
})
export class TablaService {
  url;
  headers;
  constructor(public http:HttpClient) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  }
  getTablas():Observable<any>{    
    return this.http.get(this.url+'tablas',{headers:this.headers});
  } 

  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getTabla(id):Observable<any>{
    return this.http.get(this.url+'tabla/'+id,{headers:this.headers});
  }
   /**
   * create crea un nuevo modelo enviandolo al backend
   * @param tabla objeto que contiene los datos de modelo
   */
  create(tabla):Observable<any>{
    let json=JSON.stringify(tabla);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.post(this.url+'tabla',params,{headers:headers});
  }

  /**
   * update actualiza un modelo enviandolo al backend
   * @param tabla objeto que contiene los datos de modelo
   */
  update(tabla):Observable<any>{
    let json=JSON.stringify(tabla);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.put(this.url+'tabla/'+tabla.id,params,{headers:headers});
  }
  
  deleteTabla(id):Observable<any>{
    return this.http.delete(this.url+"tabla/"+id,{headers:this.headers});
  }
}
