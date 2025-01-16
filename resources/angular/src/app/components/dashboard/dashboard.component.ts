import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { FailedUrlsDialogComponent } from '@app/components/dashboard/failed-urls.dialog.component';
import { GetShortUrls, SetLatestFailedUrls, UploadUrlCsv } from '@app/data/urls/Url.actions';
import { ShortUrlState } from '@app/data/urls/ShortUrl.state';
import { DynamicScreenHeightModule } from '@app/directives/dynamic-screen-height/dynamic-screen-height.module';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [
    MatButtonModule,
    MatProgressSpinner,
    DynamicScreenHeightModule,
    RouterLink

  ],
  template: `
    <section class="p-6">
      <h1>Dashboard</h1>

      <div class="grid gap-6 pt-6">
        <button class="w-fit" mat-stroked-button (click)="fileInput.click()" [disabled]="loading()">
          <span>Upload URLs</span>
          @if( loading() ) {
            <mat-progress-spinner [diameter]="32" />
          }
        </button>
        <input hidden (change)="onFileSelected($event)" #fileInput type="file" id="file">

        @if( !loading() ) {
          <div appDynamicScreenHeight class="grid gap-2 overflow-y-auto auto-rows-min">
            @for (shortUrl of shortUrls(); track $index) {
              <div class="column-grid justify-between border-b border-b-gray-300 h-fit py-2">
                <div>
                  {{shortUrl.id}}: {{shortUrl.destination_url}}
                </div>

                <button mat-stroked-button [routerLink]="'/short-url/' + shortUrl.id">
                  View
                </button>
              </div>
            }
          </div>
        }
      </div>
    </section>
  `,
})
export class DashboardComponent {

  loading = this.store.selectSignal( ShortUrlState.loading );
  shortUrls = this.store.selectSignal( ShortUrlState.shortUrls );

  constructor(
    private store: Store,
    private dialog: MatDialog,
  ) {
    this.store.dispatch(new GetShortUrls());

    const actions$ = inject(Actions);
    actions$.pipe(
      takeUntilDestroyed(),
      ofActionSuccessful(SetLatestFailedUrls)
    ).subscribe(() => {
      this.dialog.open(FailedUrlsDialogComponent, {
        width: '80vw',
      });
    })

  }

  onFileSelected($event) {
    const file = $event.target.files[0];
    file && this.store.dispatch(new UploadUrlCsv(file));
    $event.target.value = '';
  }
}
