export interface StackableNotification {
  dismissible?: boolean;
  identifier?: string;
  disableEntryAnimation?: boolean;
  disableExitAnimation?: boolean;
  title?: string;
  subTitle?: string;
  badge?: {
    type: 'icon' | 'image' | 'simple';
    value: string;
    class?: string;
    iconClass?: string;
    imageClass?: string;
    textClass?: string;
  };
  durationSeconds?: number;
  permanent?: boolean;
  action?: {
    callback: Function;
    label: string;
  };
  progress?: number;
}
