import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  public user: any ={};
  public id:any ;
  public cargando: boolean = false;
  public participantes : any = [];
  public asignado : any;
  public disable = false;



constructor( private _userService: UserService, private spinner: NgxSpinnerService){

  this.id = localStorage.getItem('_id');
  this.init_data_perfil()



}


ngOnInit() {
  this.listarParticipantes()

 }



listarParticipantes(){
  this._userService.listarParticipantes( this.id ).subscribe(
    (resp: any) => {
      this.participantes = resp.participantes
      //console.log(this.participantes);
    }
  )
}

init_data_perfil(){
  if( this.id){
    this._userService.get_session_user(this.id).subscribe(
      (resp: any)=>{
        this.user = resp.data
        console.log(this.user);

      },
      err=>{
        console.log(err);
        this.user = undefined;
      }
    )

  }
}


jugar(){
 
  this.disable = true

   this.init_data_perfil()

     this.cargando = true

     this.listarParticipantes();

     console.log(this.user.ya_elegi);

     if (this.user.ya_elegi == false) {
       setTimeout(() => {


  //se saca del sorteo al usuario de la session del array
    let borrar = -1
    this.participantes.forEach((element: any, index: any) => {
      if(this.id == element._id ){
        borrar = index;
        }
    });
    if(borrar >= 0) {
      this.participantes.splice(borrar, 1);

      }
  //se saca del sorteo a todos los usuarios que han sido ya seleccionados
      for (let i = 0; i < this.participantes.length; i++) {

        if (this.participantes[i].seleccion == true) {

        this.participantes =  this.participantes.filter((item: { seleccion: any; }) => item.seleccion !== this.participantes[i].seleccion);
        }

      }
      console.log(this.participantes);

      //si quedan participantes se hace sorteo
      if (this.participantes.length >=1 ) {

        const indice = Math.floor(Math.random() * this.participantes.length);
        this.asignado= this.participantes[indice];

        Swal.fire("Te toca " + this.asignado.nombre);

         this.update_ya_elegi();
         
      } else {
        Swal.fire("Ya estan todos seleccionados");

      }
      this.cargando = false

          this.update_seleccionado( this.asignado._id)

     }, 3000);

     } else {
       return
     }
     
    // console.log(this.user);

 




    //console.log(this.asignado);



}



update_seleccionado( asignadoId: any){

  this._userService.update_seleccionado( asignadoId ).subscribe( (resp: any)=>{
    console.log(resp.data);
  })
}


update_ya_elegi(){

  this._userService.update_ya_elegi( this.id ).subscribe(
    ( resp: any) =>{
      console.log(resp);
    }
  )
}


 }




