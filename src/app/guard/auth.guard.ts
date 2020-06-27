import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{

  constructor(
    private router:Router
  ){

  }

  canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>| Promise<boolean>|boolean {
    let identity=JSON.parse(localStorage.getItem('identity'));

    if(identity && identity!='undefined' ){
      return true;
    }
    this.router.navigate(['/Login']);
    return false;
  }
  
}
