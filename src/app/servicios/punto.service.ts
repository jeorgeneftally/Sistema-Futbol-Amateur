import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {global} from '../modelos/global';

@Injectable({
  providedIn: 'root'
})
export class PuntoService {
  url;
  headers;
  constructor(public http:HttpClient) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  }
  getPuntos():Observable<any>{    
    return this.http.get(this.url+'puntos',{headers:this.headers});
  } 

    /**
   * create crea un nuevo modelo enviandolo al backend
   * @param punto objeto que contiene los datos de modelo
   */
  create(punto):Observable<any>{
    let json=JSON.stringify(punto);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.post(this.url+'punto',params,{headers:headers});
  }

  /**
   * update actualiza un modelo enviandolo al backend
   * @param punto objeto que contiene los datos de modelo
   */
  update(punto):Observable<any>{
    let json=JSON.stringify(punto);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.put(this.url+'punto/'+punto.id,params,{headers:headers});
  }

  deletePunto(id):Observable<any>{
    return this.http.delete(this.url+"punto/"+id,{headers:this.headers});
  }
  
}
