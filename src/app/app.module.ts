import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import {LOCALE_ID} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeEsCL from '@angular/common/locales/es-CL';

import { NgxPaginationModule} from 'ngx-pagination';
import { AngularFileUploaderModule } from "angular-file-uploader";
import {AuthGuard} from '././guard/auth.guard';
import { AdminComponent } from './login/admin/admin.component';
import { RegistroUsuariosComponent } from './login/admin/registro-usuarios/registro-usuarios.component';
import { UsuariosComponent } from './login/admin/registro-usuarios/usuarios/usuarios.component';
import { EditarPerfilComponent } from './login/admin/registro-usuarios/editar-perfil/editar-perfil.component';
import { CampeonatoComponent } from './login/admin/campeonato/campeonato.component';
import { JugadoresComponent } from './login/admin/jugadores/jugadores.component';
import { ArbitrosComponent } from './login/admin/arbitros/arbitros.component';
import { EstadiosComponent } from './login/admin/estadios/estadios.component';
import { EquiposComponent } from './login/admin/equipos/equipos.component';
import { InicioComponent } from './login/admin/inicio/inicio.component';
import { DetalleEquipoComponent } from './login/admin/equipos/detalle-equipo/detalle-equipo.component';
import { DetalleCampeonatoComponent } from './login/admin/campeonato/detalle-campeonato/detalle-campeonato.component';



registerLocaleData(localeEsCL,'es-CL');
const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'Login',component:LoginComponent},
  {path:'logout/:sure',component:LoginComponent},
  
  {path:'Inicio',component:AdminComponent,
   children:[
       {
        path:'',
        component:InicioComponent,
        canActivate:[AuthGuard]
      },
      {path:'DetalleE/:id',component:DetalleEquipoComponent,
      canActivate:[AuthGuard]},
      {path:'DetalleC/:id',component:DetalleCampeonatoComponent,
      canActivate:[AuthGuard]
      },/*
      {
        path:'Apoderados',
        component:ApoderadoComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'Ficha_Salud',
        component:FichaSaludComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'Entrevistas',
        component:EntrevistaComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'Diagnosticos',
        component:DiagnosticoComponent,
        canActivate:[AuthGuard]
      },*/
      {
        path:'Registro',
        component:RegistroUsuariosComponent,
        canActivate:[AuthGuard],
       
      }  
      ,
      {
        path:'EditarPerfil',
        component:EditarPerfilComponent,
        canActivate:[AuthGuard]
      }
      ,
      {
        path:'Usuarios',
        component:UsuariosComponent,
        canActivate:[AuthGuard]
      }
      ,
      {
        path:'Estadios',
        component:EstadiosComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'Campeonatos',
        component:CampeonatoComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'Jugadores',
        component:JugadoresComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'Equipos',
        component:EquiposComponent,
        canActivate:[AuthGuard]
      }
      ,
      {
        path:'Arbitros',
        component:ArbitrosComponent,
        canActivate:[AuthGuard]
      }
    ]
  },
  
];

@NgModule({
      declarations: [
        AppComponent,
        LoginComponent,
        AdminComponent,
        UsuariosComponent,
        EditarPerfilComponent,
        RegistroUsuariosComponent,
        CampeonatoComponent,
        JugadoresComponent,
        ArbitrosComponent,
        EstadiosComponent,
        EquiposComponent,
        InicioComponent,
        DetalleEquipoComponent,
        DetalleCampeonatoComponent
      ],
      imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
        AngularFileUploaderModule
      ],
      providers: [{provide: LOCALE_ID, useValue:'es-CL'}],
      bootstrap: [AppComponent]
    })
export class AppModule { }
