import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login',component:LoginComponent },
    { path: 'perfil',component:PerfilComponent , canActivate:[ AuthGuard]},

  { path: '**',redirectTo:'login'}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
