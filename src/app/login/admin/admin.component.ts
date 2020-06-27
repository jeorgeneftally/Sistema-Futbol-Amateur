import { Component, OnInit } from '@angular/core';
import { UserService } from '../../servicios/user.service';
import { global } from '../../modelos/global';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  today:number=Date.now();
  public identity;
  public url;

  constructor(
    private _userService:UserService
  ) {
    this.identity=_userService.getIdentity();
    this.url=global.url;
  }

  ngOnInit() {
    this.identity=this._userService.getIdentity();
  }
}
