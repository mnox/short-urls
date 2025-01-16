import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface DynamicScreenHeightConfig {
  offset?: number;
  scrollable?: boolean;
  ready?: Observable<boolean>;
}

@Directive( {
  selector: '[appDynamicScreenHeight]',
} )
export class DynamicScreenHeightDirective implements AfterViewInit {

  ready$ = new Subject<boolean>();

  @Input() dshdConfig!: DynamicScreenHeightConfig;

  constructor(
    private el: ElementRef,
  ) {}

  ngAfterViewInit() {
    this.ready$.toPromise().finally(() => this.updateElement());
    if(this.dshdConfig?.ready instanceof Observable) {
      return this.dshdConfig.ready.pipe(
        takeUntil(this.ready$)
      ).subscribe( ready => {
        if(ready) {
          this.ready$.complete();
        }
      })
    }

    return this.ready$.complete();
  }

  updateElement(): void {
    this.setElementHeight();
    if(this.dshdConfig?.scrollable) {
      this.el.nativeElement.classList.add('adshd-scrollable');
    }
  }

  setElementHeight(): void {
    const offset = this.dshdConfig?.offset || 0;
    const rect = this.el.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - rect.top - offset;
    this.el.nativeElement.style.height = `${ height }px`;
  }

}
