import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "src/app/components/login/login.component";
import { PerfilComponent } from "src/app/components/perfil/perfil.component";
import { AuthGuard } from "src/app/guards/auth.guard";





const appRoute : Routes = [
 { path: '', component: LoginComponent},
 { path: 'login', component: LoginComponent},
 { path: 'perfil', component: PerfilComponent, canActivate:[ AuthGuard]},






];

export const appRoutingProvide: any [] = [];

export const routing : ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
