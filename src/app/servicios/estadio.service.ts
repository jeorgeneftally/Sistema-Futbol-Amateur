import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {global} from '../modelos/global';

@Injectable({
  providedIn: 'root'
})
export class EstadioService {

  url;
  headers;
  constructor(public http:HttpClient) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  }
  getEstadios():Observable<any>{    
    return this.http.get(this.url+'estadios',{headers:this.headers});
  } 

  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getEstadio(id):Observable<any>{
    return this.http.get(this.url+'estadio/'+id,{headers:this.headers});
  }
   /**
   * create crea un nuevo modelo enviandolo al backend
   * @param estadio objeto que contiene los datos de modelo
   */
  create(estadio):Observable<any>{
    let json=JSON.stringify(estadio);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.post(this.url+'estadio',params,{headers:headers});
  }

  /**
   * update actualiza un modelo enviandolo al backend
   * @param estadio objeto que contiene los datos de modelo
   */
  update(estadio):Observable<any>{
    let json=JSON.stringify(estadio);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.put(this.url+'estadio/'+estadio.id,params,{headers:headers});
  }
   
  deleteEstadio(id):Observable<any>{
    return this.http.delete(this.url+"estadio/"+id,{headers:this.headers});
  }
  

}
