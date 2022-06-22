import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RSAcommunicationComponent} from './components/rsacommunication/rsacommunication.component'

const routes: Routes = [
  {
    path: 'rsa',
    component: RSAcommunicationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
