import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {DetailsComponent} from "./pages/details/details.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: ':country/details',
    component: DetailsComponent,
  },
  {
    path: '**', // wildcard
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
