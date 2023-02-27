import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { DetailComponent } from './detail/detail.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, redirectTo: '', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'add', component: AddComponent },
    { path: 'detail/:id', component: DetailComponent },

    { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
