import { CommonModule } from '@angular/common';
import { Injectable, NgModule } from '@angular/core';
import { MatIconButton } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBar } from "@angular/material/progress-bar";
import { LetDirectiveModule } from "../../directives/let/let.directive.module";
import { StackableNotificationCardComponent } from "./stackable-notification-card.component";
import { StackableNotificationsManagerComponent } from "./stackable-notifications-manager.component";

@NgModule({
  declarations: [
    StackableNotificationCardComponent,
    StackableNotificationsManagerComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    LetDirectiveModule,
    MatProgressBar,
    MatIconButton,
  ],
  exports: [
    StackableNotificationCardComponent,
    StackableNotificationsManagerComponent,
  ],
})
@Injectable({providedIn: 'root'})
export class StackableNotificationsModule {}
