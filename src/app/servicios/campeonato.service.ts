import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {global} from '../modelos/global';


@Injectable({
  providedIn: 'root'
})
export class CampeonatoService {

  url;
  headers;
  constructor(public http:HttpClient) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  }
  getCampeonatos():Observable<any>{    
    return this.http.get(this.url+'campeonatos',{headers:this.headers});
  } 

  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getCampeonato(id):Observable<any>{
    return this.http.get(this.url+'campeonato/'+id,{headers:this.headers});
  }
   /**
   * create crea un nuevo modelo enviandolo al backend
   * @param campeonato objeto que contiene los datos de modelo
   */
  create(campeonato):Observable<any>{
    let json=JSON.stringify(campeonato);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.post(this.url+'campeonato',params,{headers:headers});
  }

  /**
   * update actualiza un modelo enviandolo al backend
   * @param campeonato objeto que contiene los datos de modelo
   */
  update(campeonato):Observable<any>{
    let json=JSON.stringify(campeonato);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.put(this.url+'campeonato/'+campeonato.id,params,{headers:headers});
  }

  deleteCampeonato(id):Observable<any>{
    return this.http.delete(this.url+"campeonato/"+id,{headers:this.headers});
  }

   /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getTabla(id):Observable<any>{
    return this.http.get(this.url+'campeonato/tabla/'+id,{headers:this.headers});
  }
}
