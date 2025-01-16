import { DatePipe, formatDate, JsonPipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ShortUrlState } from '@app/data/urls/ShortUrl.state';
import { DynamicScreenHeightModule } from '@app/directives/dynamic-screen-height/dynamic-screen-height.module';
import { Store } from '@ngxs/store';

@Component({
  selector: 'short-url',
  standalone: true,
  imports: [
    DatePipe,
    DynamicScreenHeightModule,
    JsonPipe,
    MatProgressSpinner,
    MatTableModule,
  ],
  template: `
    @if( loading() ) {
      <div appDynamicScreenHeight class="w-full column-grid place-items-center">
        <mat-progress-spinner [diameter]="100"/>
      </div>
    } @else {
      <div class="p-4">
        <div class="grid gap-2 w-fit min-w-[400px]">
          <h3>{{shortUrl().destination_url}}</h3>

          @for( item of displayData(); track $index ) {

            <div class="column-grid justify-between">
                <h4>{{ item.label }}</h4>
                <span>{{ item.value }}</span>
            </div>

          }

        </div>
        @if( shortUrl()?.visits?.length ) {

          <h1 class="mb-6 mt-12">Visits</h1>
          <mat-table [dataSource]="visitsDataSource()">
            <mat-header-row *matHeaderRowDef="visitsTableColumns; sticky: true;"></mat-header-row>
            <mat-row *matRowDef="let row; columns: visitsTableColumns;"></mat-row>

            <!--     IP     -->
            <ng-container matColumnDef="ip">
              <mat-header-cell *matHeaderCellDef> IP </mat-header-cell>
              <mat-cell *matCellDef="let row">
                {{ row.ip_address }}
              </mat-cell>
            </ng-container>

            <!--     OPERATING SYSTEM     -->
            <ng-container matColumnDef="operatingSystem">
              <mat-header-cell *matHeaderCellDef> Operating System </mat-header-cell>
              <mat-cell *matCellDef="let row">
                {{ row.operating_system }}
              </mat-cell>
            </ng-container>

            <!--     BROWSER     -->
            <ng-container matColumnDef="browser">
              <mat-header-cell *matHeaderCellDef> Browser </mat-header-cell>
              <mat-cell *matCellDef="let row">
                {{ row.browser }} (Version: {{ row.browser_version }})
              </mat-cell>
            </ng-container>

            <!--     REFERER URL     -->
            <ng-container matColumnDef="referer">
              <mat-header-cell *matHeaderCellDef> Referer URL </mat-header-cell>
              <mat-cell *matCellDef="let row">
                {{ row.referer_url || 'N/A' }}
              </mat-cell>
            </ng-container>

            <!--     VISIT DATETIME     -->
            <ng-container matColumnDef="visitTime">
              <mat-header-cell *matHeaderCellDef> Time </mat-header-cell>
              <mat-cell *matCellDef="let row">
                {{ row.visited_at | date:'M/d/yy hh:mm a' }}
              </mat-cell>
            </ng-container>

          </mat-table>
        }
      </div>
    }
  `,
})
export class ShortUrlComponent {

  shortUrl = this.store.selectSignal( ShortUrlState.currentShortUrl );
  loading = this.store.selectSignal( ShortUrlState.loading );
  visitsDataSource = computed(() => {
    const shortUrl = this.shortUrl();
    const visits = shortUrl.visits || [];
    return new MatTableDataSource(visits);
  });
  displayData = computed(() => {
    const shortUrl = this.shortUrl();
    return [
      {
        label: 'ID',
        value: shortUrl.id,
      },
      {
        label: 'Short URL',
        value: shortUrl.short_url || shortUrl.default_short_url,
      },
      {
        label: 'Total Visits',
        value: shortUrl.visit_count,
      },
      {
        label: 'Created',
        value: formatDate(shortUrl.created_at, 'MM/dd/yyyy', this.locale()),
      },
    ]
  });
  locale = computed(() => {
    return (new Intl.NumberFormat()).resolvedOptions().locale
  });

  visitsTableColumns = [
    'ip',
    'operatingSystem',
    'browser',
    'referer',
    'visitTime',
  ];

  constructor(
    private store: Store,
  ) {}
}
