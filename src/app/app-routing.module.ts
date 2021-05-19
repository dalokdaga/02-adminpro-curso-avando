import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// modulos
import { PagesRoutingModule } from './pages/pages.routing'
import { AuthRoutingModule } from './auth/auth.routing';
// componetes
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
const routes: Routes = [
    // path: '/dashboard' PagesRouting
    // path: '/auth' AuthRouting
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: '**', component: NopagefoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        PagesRoutingModule, // estamos importando las rutas hijas de pages
        AuthRoutingModule   //  estamos importando las rutas hijas de auth
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
