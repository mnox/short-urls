import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';

@Component({
  selector: 'short-url-page',
  standalone: true,
  imports: [
    RouterOutlet

  ],
  template: `
    <router-outlet></router-outlet>
  `,
})
export class ShortUrlPageComponent {
  constructor(
    private store: Store,
  ) {}
}
