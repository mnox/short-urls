import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface LetContext {
  appLet: any;
}

@Directive({
  selector: '[appLet]'
})
export class LetDirective {

  static ngTemplateContextGuard(
    directive: LetDirective,
    context: unknown
  ): context is LetDirective {
    return true;
  }

  private _context: LetContext = { appLet: null };

  constructor( _viewContainer: ViewContainerRef, _templateRef: TemplateRef<LetContext> ) {
    _viewContainer.createEmbeddedView( _templateRef, this._context );
  }

  @Input()
  set appLet( value: any ) {
    this._context.appLet = value;
  }

}

