import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import iziToast from 'izitoast';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


    public user: any = {
      email: '',
      password: ''

    };
    public usuario: any ={};

    public token;

  public showRegister: boolean = false;

  public show:boolean=false;
  //para ver si el formulario ha sido submit
  public formSubmitted = false;

   //definimos los campos del formulario y establecemos las validaciones
  public registerForm = this.fb.group({
    nombre: ['',[ Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
  },{
    validators: this.passwordIguales( 'password', 'password2')
  })


  constructor(private _userService: UserService, private router: Router, public fb: FormBuilder){

       this.token = localStorage.getItem('token');

       console.log(this.token);
        //si hay token al inicio
       if( this.token){
        this.router.navigate(['/perfil']);
       }
  }

  show_Registro(){
  this.showRegister = !this.showRegister

 }

 //para mostrar y ocultar la contraseña
   showPassword(){
    this.show = !this.show

  }


  //Funcion para validar que las contraseñas sean iguales
  passwordIguales(pass1Name: any, pass2Name: any){

    return( formGroup: FormGroup )=>{

      const pass1Control =  formGroup.get( pass1Name );
      const pass2Control =  formGroup.get( pass2Name );

      if( pass1Control && pass2Control){
        if ( pass1Control.value === pass2Control.value ) {
          pass2Control.setErrors( null)
        }else{
          pass2Control.setErrors({noEsIgual: true})
        }

      }

    }
}
 //verificacion de contraseñas
 contrasenyasNoValidas(){

  //extraemos los valores de las contraseñas
  const pass1 = this.registerForm.get('password').value;
  const pass2 = this.registerForm.get('password2').value;

  //si las contraseñas son distintas y el formulario enviado mostrara el error
  if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
  } else {
    return false;
  }

}
/**si el campo no cumple las validaciones definidas en registerForm y se envia
 * el formulario muestra el texto con el error en el html
 */
campoNoValido( campo: any ): boolean{

 if ( this.registerForm.get(campo).invalid && this.formSubmitted){
  return true;
 }else{
  return false;
 }



}
//funcion para el registro
regisro_Usuario(){
  this.formSubmitted = true;
   
     //si el formulario es invalido
    if( this.registerForm.invalid){
      return;
    }
    //si el formulario es valido se registra el usuario
    this._userService.registro_usuario(this.registerForm.value).subscribe(
      resp=>{
        console.log(resp);
      Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Usuario registrado",
  showConfirmButton: false,
  timer: 1500
});

              localStorage.setItem('token', resp.token);
             localStorage.setItem('_id', resp.usuario._id);

             this.router.navigate(['/perfil'])     
        
    },err=>{
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error!...",
        text: err.error.msg
      });
    })
}





  login( loginForm: any){

    //console.log(loginForm);

    if (!loginForm.valid) {

      let data = {
         email: this.user.email,
         password: this.user.password
      }

     // console.log(data);

      this._userService.login_user( data ).subscribe(
         (resp: any)=>{
          if (resp == undefined) {
            iziToast.show({
              title:'ERROR',
              titleColor:'#ff0000',
              class: 'text-danger',
              position: 'topRight',
              message: resp.msg
            })
          } else {

            this.usuario = resp.usuarioBD;
            console.log(this.usuario);

            localStorage.setItem('token', resp.token);
            localStorage.setItem('_id', resp.usuarioBD._id);

            this.router.navigate(['/perfil'])
          }
         },
         (err: any)=>{
          iziToast.show({
            title:'ERROR',
            titleColor:'#ff0000',
            class: 'text-danger',
            position: 'topRight',
            message: err.error.msg
          })
        }

      )
    } else {

      iziToast.show({
        title:'ERROR',
        titleColor:'#ff0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Formulario no válido'
      })
    }
  }
}
