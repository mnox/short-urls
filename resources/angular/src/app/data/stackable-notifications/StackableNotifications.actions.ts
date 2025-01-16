import { StackableNotification } from "./StackableNotification.struct";

export class AddStackableNotificationError {
  static readonly type = '[StackableNotifications] AddStackableError';
  constructor(
    public error: Partial<StackableNotification>,
  ) {}
}

export class AddStackableNotificationSuccess {
  static readonly type = '[StackableNotifications] AddStackableNotificationSuccess';
  constructor(
    public success: Partial<StackableNotification>,
  ) {}
}

export class AddStackableNotification {
  static readonly type = '[StackableNotifications] AddStackableNotification';
  constructor(
    public notification: StackableNotification,
  ) {}
}

export class ClearAllStackableNotifications {
  static readonly type = '[StackableNotifications] ClearAllStackableNotifications';
  constructor() {}
}

export class ClearStackableNotification {
  static readonly type = '[StackableNotifications] ClearStackableNotification';
  constructor(
    public identifier: string,
  ) {}
}

export class UpdateStackableNotification {
  static readonly type = '[StackableNotifications] UpdateStackableNotification';
  constructor(
    public identifier: string,
    public updates: Partial<StackableNotification>,
  ) {}
}
