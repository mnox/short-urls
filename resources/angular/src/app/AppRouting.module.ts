import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ShortUrlComponent } from '@app/components/short-url-page/short-url.component';
import { ShortUrlPageComponent } from '@app/components/short-url-page/short-url.page.component';
import { GetShortUrlById } from '@app/data/urls/Url.actions';
import { Store } from '@ngxs/store';
import { DashboardComponent } from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'short-url',
    component: ShortUrlPageComponent,
    children: [
      {
        path: ':id',
        component: ShortUrlComponent,
        resolve: [(route) => {
          console.dir(route);
          const store = inject(Store);
          const id = route.params.id;
          !!id && store.dispatch( new GetShortUrlById(id) );
        }],
      },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
