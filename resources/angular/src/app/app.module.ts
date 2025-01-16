import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { computed, inject, NgModule, Signal } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { StackableNotificationsModule } from '@app/components/stackable-notifications/stackable-notifications.module';
import { StackableNotificationsState } from '@app/data/stackable-notifications/StackableNotifications.state';
import { ShortUrlState } from '@app/data/urls/ShortUrl.state';
import { setupProgress } from "@inertiajs/core";
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsDevelopmentModule, NgxsModule } from '@ngxs/store';
import { CookieModule } from "ngx-cookie";

import { AppComponent } from './App.component';
import { LogoComponent } from "./AppLogo.component";
import { AppRoutingModule } from "./AppRouting.module";
import { PAGES } from './pages';

@NgModule({
  declarations: [
        AppComponent,
        ...PAGES,
  ],
  bootstrap: [
      AppComponent,
  ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        CookieModule.withOptions(),
        LogoComponent,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        RouterModule,
        StackableNotificationsModule,
        NgxsModule.forRoot( [
              StackableNotificationsState,
              ShortUrlState,
            ],
            {developmentMode: /** !environment.production */ true}
        ),
        NgxsDevelopmentModule.forRoot( {
            warnOnUnhandledActions: true,
        } ),
        NgxsReduxDevtoolsPluginModule.forRoot(),
    ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true,
    // },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useFactory: () => {
        const width = window.visualViewport!.width > 800 ? '480px' : '90vw';
        return {
          width,
        }
      },
    }
  ],
})
export class AppModule {
  constructor() {
    const isServer = typeof window === 'undefined';

    if (!isServer) {
      setupProgress({
        delay: 0,
        color: 'salmon',
        includeCSS: true,
        showSpinner: false,
      });
    }
  }
}
