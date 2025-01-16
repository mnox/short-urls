import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { ShortUrlState } from '@app/data/urls/ShortUrl.state';
import { Store } from '@ngxs/store';

@Component({
  selector: 'failed-urls-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatExpansionModule,
    JsonPipe,
  ],
  template: `
    <h2 mat-dialog-title>Failed URLS</h2>
    <mat-dialog-content>
      <div>
        Unable to create a Short URL for the following rows from the latest import:
      </div>
      <div class="grid gap-2 max-h-[400px] overflow-y-auto">
        @for ( row of failedUrls(); track $index) {
          <div class="h-fit p-2 border-b border-b-gray-300">
            <h5>Error:</h5>
            <div class="mb-4">
              {{ row.error }}
            </div>

            <mat-expansion-panel>
              <mat-expansion-panel-header>Row JSON</mat-expansion-panel-header>
              {{ row.csvRow | json }}
            </mat-expansion-panel>
          </div>
        }
      </div>
    </mat-dialog-content>
  `,
})
export class FailedUrlsDialogComponent {

  failedUrls = this.store.selectSignal( ShortUrlState.latestFailedUrls );

  constructor(
    private store: Store,
  ) {}
}
