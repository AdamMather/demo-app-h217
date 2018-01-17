import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Component
import { PortalComponent } from '../portal/portal.component'

const routes: Routes = [
  {
    path: '', component: PortalComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }