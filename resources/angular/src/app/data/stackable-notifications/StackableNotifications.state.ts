import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { append, iif, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { StackableNotification } from "./StackableNotification.struct";
import {
  AddStackableNotification,
  AddStackableNotificationError,
  AddStackableNotificationSuccess,
  ClearAllStackableNotifications,
  ClearStackableNotification,
  UpdateStackableNotification
} from './StackableNotifications.actions';

export interface StackableNotificationsStateModel {
  notifications: Partial<StackableNotification>[];
}

@State<Partial<StackableNotificationsStateModel>>({
  name: 'StackableNotifications',
  defaults: {
    notifications: []
  }
})
@Injectable()
export class StackableNotificationsState {

  @Selector()
  static notifications(state: StackableNotificationsStateModel) {
    return state.notifications;
  }

  @Selector()
  static temporaryNotifications(state: StackableNotificationsStateModel) {
    return state.notifications.filter( notification => !notification.permanent);
  }

  @Selector()
  static permanentNotifications(state: StackableNotificationsStateModel) {
    return state.notifications.filter( notification => notification.permanent);
  }

  constructor() {}

  @Action(AddStackableNotificationError)
  AddStackableNotificationError(
    ctx: StateContext<StackableNotificationsStateModel>,
    { error }: AddStackableNotificationError,
  ) {
    const defaults: Partial<StackableNotification> = {
      identifier: `${Date.now()}`,
      dismissible: true,
      badge: {
        type: 'icon',
        value: 'warning',
        class: 'bg-red-400',
      },
    };
    const notification = {
      ...defaults,
      ...error,
    };
    ctx.setState(patch({
      notifications: append([notification]),
    }));
  }

  @Action(AddStackableNotificationSuccess)
  AddStackableNotificationSuccess(
    ctx: StateContext<StackableNotificationsStateModel>,
    { success }: AddStackableNotificationSuccess,
  ) {
    const defaults: Partial<StackableNotification> = {
      identifier: `${Date.now()}`,
      dismissible: true,
      badge: {
        type: 'icon',
        value: 'check',
        class: 'bg-green-600',
      },
    };
    const notification = {
      ...defaults,
      ...success,
    };
    ctx.setState(patch({
      notifications: append([notification]),
    }));
  }

  @Action(AddStackableNotification)
  AddStackableNotification(
    ctx: StateContext<StackableNotificationsStateModel>,
    { notification }: AddStackableNotification,
  ) {
    const identifier = notification.identifier || `${notification.title?.trim()}-${Date.now()}`,
      byIdentifier = (existingNotification: StackableNotification) => existingNotification.identifier === notification.identifier;
    const exists = !!notification.identifier && !!ctx.getState().notifications.find( byIdentifier );

    ctx.setState(patch({
      notifications: iif(exists,
        updateItem( byIdentifier, notification),
        append([
          {
            ...notification,
            identifier,
          }
        ]),
      ),
    }));
  }

  @Action(ClearAllStackableNotifications)
  ClearAllStackableNotifications(
    ctx: StateContext<StackableNotificationsStateModel>,
    {  }: ClearAllStackableNotifications,
  ) {
    ctx.setState(patch({
      notifications: ctx.getState().notifications.filter( notification => !notification.dismissible ),
    }));
  }

  @Action(ClearStackableNotification)
  ClearStackableNotification(
    ctx: StateContext<StackableNotificationsStateModel>,
    { identifier }: ClearStackableNotification,
  ) {
    ctx.setState(patch({
      notifications: removeItem( notification => notification.identifier === identifier),
    }));
  }

  @Action(UpdateStackableNotification)
  UpdateStackableNotification(
    ctx: StateContext<StackableNotificationsStateModel>,
    { identifier, updates }: UpdateStackableNotification,
  ) {
    ctx.setState(patch({
      notifications: updateItem(
        notification => notification.identifier === identifier,
        patch(updates)),
    }));
  }
}
