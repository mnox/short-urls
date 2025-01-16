import { animate, style, transition, trigger } from '@angular/animations';
import { Component, computed, HostListener, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { StackableNotification } from "../../data/stackable-notifications/StackableNotification.struct";
import { ClearStackableNotification } from "../../data/stackable-notifications/StackableNotifications.actions";

const fadeTimeSeconds = .3;

@Component({
  selector: 'app-stackable-notification-card',
  templateUrl: 'stackable-notification-card.component.html',
  styleUrls: ['stackable-notification-card.component.scss'],
  animations: [
    trigger('growIn', [
      transition('void => growIn', [
        style({height: 0, opacity: 0}),
        animate(`${fadeTimeSeconds}s`, style({ height: '*', opacity: 1})),
      ]),
    ]),
    trigger('fadeOut', [
      transition('* => expired', [
        animate(`${fadeTimeSeconds}s`, style({ opacity: 0})),
      ])
    ])
  ]
})
export class StackableNotificationCardComponent implements OnInit {

  longAction = computed(() => {
    const actionLabel = this.notification?.action?.label;
    return actionLabel && actionLabel.length >= 10;
  })
  defaultDurationSeconds = 3;
  expired!: boolean;
  expirationTimeout: any;
  clearNotificationTimeout: any;

  @Input() index!: number;
  @Input() notification!: StackableNotification;

  constructor(
    private store: Store,
  ) {}

  @HostListener('mouseenter')
  handleMouseEnter() {
    this.expired = false;
    this.clearExpiration();
  }

  @HostListener('mouseleave')
  handleMouseLeave() {
    this.setExpiration();
  }

  ngOnInit() {
    !this.notification.permanent
      ? this.setExpiration() : false;
  }

  clearNotification() {
    this.store.dispatch( new ClearStackableNotification(this.notification.identifier!) );
  }

  clearExpiration() {
    clearTimeout(this.expirationTimeout);
    clearTimeout(this.clearNotificationTimeout);
  }

  setExpiration() {
    this.clearExpiration();
    const duration = this.notification.durationSeconds || this.defaultDurationSeconds;
    this.expirationTimeout = setTimeout(() => this.expire(), duration * 1000);
  }

  expire() {
    this.expired = true;
    this.clearNotificationTimeout = setTimeout(() => this.clearNotification(), fadeTimeSeconds * 1000);
  }

  handleAction() {
    if(typeof this.notification.action?.callback === 'function') {
      this.notification.action.callback();
    }
  }
}
