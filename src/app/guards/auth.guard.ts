import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private _userServices: UserService , private _router: Router){

  }
  canActivate(): any{
    if ( !this._userServices.validarToken()) {
      this._router.navigate(['/login'])
      return false;
    }

    return true
  }


}
