import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {global} from '../modelos/global';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {
  url;
  headers;
  constructor(public http:HttpClient) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  }
  getJugadores():Observable<any>{    
    return this.http.get(this.url+'jugadores',{headers:this.headers});
  } 
  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getJugador(id):Observable<any>{
    return this.http.get(this.url+'jugador/'+id,{headers:this.headers});
  }
   /**
   * create crea un nuevo modelo enviandolo al backend
   * @param jugador objeto que contiene los datos de modelo
   */
  create(jugador):Observable<any>{
    let json=JSON.stringify(jugador);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.post(this.url+'jugador',params,{headers:headers});
  }

  /**
   * update actualiza un modelo enviandolo al backend
   * @param jugador objeto que contiene los datos de modelo
   */
  update(jugador):Observable<any>{
    let json=JSON.stringify(jugador);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.put(this.url+'jugador/'+jugador.id,params,{headers:headers});
  }
   
  deleteJugador(id):Observable<any>{
    return this.http.delete(this.url+"jugador/"+id,{headers:this.headers});
  }
  
 
 

}
