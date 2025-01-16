import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: '#app',
  template: `
    <app-stackable-notifications-manager class="fixed right-[24px] bottom-[24px] z-[5000]"></app-stackable-notifications-manager>
    <mat-toolbar>
      <div class="w-full column-grid justify-between place-items-center">
        <div class="column-grid gap-2 place-items-center">
          <viser-logo class="w-[56px] cursor-pointer"/>
          <h1>wemod</h1>
        </div>
      </div>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(
    private store: Store,
  ) {}
}
