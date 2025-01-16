import { NgModule } from '@angular/core';
import { DynamicScreenHeightDirective } from "./dynamic-screen-height.directive";

@NgModule( {
  declarations: [
    DynamicScreenHeightDirective,
  ],
  exports: [
    DynamicScreenHeightDirective,
  ]
} )
export class DynamicScreenHeightModule {
}
