import { AfterViewInit, Component, OnDestroy, QueryList, signal, ViewChildren } from '@angular/core';
import {
  StackableNotificationCardComponent
} from '@app/components/stackable-notifications/stackable-notification-card.component';
import { StackableNotification } from '@app/data/stackable-notifications/StackableNotification.struct';
import { StackableNotificationsState } from '@app/data/stackable-notifications/StackableNotifications.state';
import { Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-stackable-notifications-manager',
  templateUrl: './stackable-notifications-manager.component.html',
})
export class StackableNotificationsManagerComponent implements AfterViewInit, OnDestroy {

  maxNotifications = 3;
  temporaryNotifications$: Observable<StackableNotification[]> = this.store.select( StackableNotificationsState.temporaryNotifications );
  permanentNotifications$: Observable<StackableNotification[]> = this.store.select( StackableNotificationsState.permanentNotifications );
  @ViewChildren(StackableNotificationCardComponent) snackbarCardsVC!: QueryList<StackableNotificationCardComponent>;
  destroyed$ = new Subject<boolean>();
  viewReady = signal(false);
  viewHeight!: number;

  constructor(
    private store: Store,
  ) {}

  ngAfterViewInit() {
    this.setupCardsWatch();
    this.viewHeight = window?.visualViewport?.height || 0;
  }

  setupCardsWatch(failures = 0): any {
    if(failures > 3) {
      console.error('Failed to setup Snackbar/Notifications manager. @ViewChildren never initialized.');
      return;
    }

    if(!!this.snackbarCardsVC) {
      this.snackbarCardsVC.changes
        .pipe(
          takeUntil(this.destroyed$),
        ).subscribe( cards => {
        const excessCards = cards.length > this.maxNotifications
          && cards.filter( (card: any) => !card.notification.permanent && !card.expired ).length > this.maxNotifications;
        if(excessCards) {
          this.snackbarCardsVC.find(card => !card.expired)?.expire();
        }
      });

      return setTimeout(() => {
        this.viewReady.set(true);
      });
    }

    setTimeout(() => this.setupCardsWatch(++failures), 10);
  }

  track(index: number, item: StackableNotification) {
    return item.identifier;
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
