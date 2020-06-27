import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {global} from '../modelos/global';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  url;
  headers;
  constructor(public http:HttpClient) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  }
  getSeries():Observable<any>{    
    return this.http.get(this.url+'series',{headers:this.headers});
  } 

  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getSerie(id):Observable<any>{
    return this.http.get(this.url+'serie/'+id,{headers:this.headers});
  }
   /**
   * create crea un nuevo modelo enviandolo al backend
   * @param serie objeto que contiene los datos de modelo
   */
  create(serie):Observable<any>{
    let json=JSON.stringify(serie);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.post(this.url+'serie',params,{headers:headers});
  }

  /**
   * update actualiza un modelo enviandolo al backend
   * @param serie objeto que contiene los datos de modelo
   */
  update(serie):Observable<any>{
    let json=JSON.stringify(serie);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.put(this.url+'serie/'+serie.id,params,{headers:headers});
  }
   
  deleteSerie(id):Observable<any>{
    return this.http.delete(this.url+"serie/"+id,{headers:this.headers});
  }

  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id
   * @param ids id del modelo que se quiere obtener
   */
  getJugadoresporserie(id,ids):Observable<any>{
    return this.http.get(this.url+'serie/jugador/'+id+ids,{headers:this.headers});
  }
  
}
