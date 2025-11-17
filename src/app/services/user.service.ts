import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 public url;
  public user : any;

  constructor( private _http: HttpClient) {
    this.url = environment.SERVER_URL
 }
 //para extraer los headers(token)
get headers(){
  return {
    headers: {
      'x-token':this.token //el this.token esta en la funcion get token()
     }
   }
}
  //Para extraer el token
  get token():string{
    return localStorage.getItem( 'token') || '';
  }


/*------------------------Para los guards----------------------------------------------*/
validarToken():boolean{

  const token = this.token;

  if (!token ) {
    return false;
  }
  try {
      //asi podemos validar un token
       const helper = new JwtHelperService();
       const decodedToken  = helper.decodeToken( token );

       if(!decodedToken){
        console.log('token no valido');
        localStorage.clear();

         return false;
        }

        if (helper.isTokenExpired( token)) {
          localStorage.clear();
          return false;
        }


      } catch (error) {
        localStorage.clear();

         return false;
     }


    return true;

   }


//--------user
 login_user(data: any ){
  console.log(data);

  return this._http.post(`${this.url}/login_usuario`,data, this.headers)

 }
listarParticipantes( id:any){
    return this._http.get(`${this.url}/listarParticipantes/`+id , this.headers)

   }
get_session_user( id:any){
    return this._http.get(`${this.url}/get_session_user/`+id , this.headers)

   }
update_seleccionado( id:any){
  console.log(id);
    return this._http.put(`${this.url}/update_seleccionado/`+id , this.headers)

   }


update_ya_elegi( id:any){
  console.log(id);
    return this._http.put(`${this.url}/update_ya_elegi/`+id , this.headers)

   }


   registro_usuario(data:any):Observable<any>{

    return this._http.post(`${this.url}/registroUsuario`, data , this.headers)

   }
}
