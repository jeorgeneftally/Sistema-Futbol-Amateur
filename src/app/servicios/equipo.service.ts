import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {global} from '../modelos/global';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  url;
  headers;
  constructor(public http:HttpClient) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  }
  getEquipos():Observable<any>{    
    return this.http.get(this.url+'equipos',{headers:this.headers});
  } 

  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getEquipo(id):Observable<any>{
    return this.http.get(this.url+'equipo/'+id,{headers:this.headers});
  }
   /**
   * create crea un nuevo modelo enviandolo al backend
   * @param equipo objeto que contiene los datos de modelo
   */
  create(equipo):Observable<any>{
    let json=JSON.stringify(equipo);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.post(this.url+'equipo',params,{headers:headers});
  }

  /**
   * update actualiza un modelo enviandolo al backend
   * @param equipo objeto que contiene los datos de modelo
   */
  update(equipo):Observable<any>{
    let json=JSON.stringify(equipo);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.put(this.url+'equipo/'+equipo.id,params,{headers:headers});
  }
   
  deleteEquipo(id):Observable<any>{
    return this.http.delete(this.url+"equipo/"+id,{headers:this.headers});
  }
}
