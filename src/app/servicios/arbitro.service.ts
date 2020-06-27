import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {global} from '../modelos/global';

@Injectable({
  providedIn: 'root'
})
export class ArbitroService {

  url;
  headers;
  constructor(public http:HttpClient) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  }
  getArbitros():Observable<any>{    
    return this.http.get(this.url+'arbitros',{headers:this.headers});
  } 

  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getArbitro(id):Observable<any>{
    return this.http.get(this.url+'arbitro/'+id,{headers:this.headers});
  }
   /**
   * create crea un nuevo modelo enviandolo al backend
   * @param arbitro objeto que contiene los datos de modelo
   */
  create(arbitro):Observable<any>{
    let json=JSON.stringify(arbitro);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.post(this.url+'arbitro',params,{headers:headers});
  }

  /**
   * update actualiza un modelo enviandolo al backend
   * @param arbitro objeto que contiene los datos de modelo
   */
  update(arbitro):Observable<any>{
    let json=JSON.stringify(arbitro);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.put(this.url+'arbitro/'+arbitro.id,params,{headers:headers});
  }
  
  deleteArbitro(id):Observable<any>{
    return this.http.delete(this.url+"arbitro/"+id,{headers:this.headers});
  }

}
