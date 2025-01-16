import { NgOptimizedImage } from '@angular/common';
import { Component } from "@angular/core";
import { RouterModule } from '@angular/router';

@Component( {
  selector: 'viser-logo',
  template: `
    <img src="/logo.webp" alt="wemod-logo" height="38" width="58" [routerLink]="'/'"/>
  `,
  standalone: true,
  imports: [
    RouterModule,
  ],
})
export class LogoComponent {}
