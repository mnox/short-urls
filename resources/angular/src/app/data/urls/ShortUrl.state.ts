import { Injectable } from '@angular/core';
import {
  AddStackableNotificationError,
  AddStackableNotificationSuccess
} from '@app/data/stackable-notifications/StackableNotifications.actions';
import { GetShortUrlById, GetShortUrls, SetLatestFailedUrls, UploadUrlCsv } from '@app/data/urls/Url.actions';
import { UrlService } from '@app/services/url.service';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { append, patch } from '@ngxs/store/operators';
import { catchError, tap } from 'rxjs';
import { ShortUrl, UploadResponseObject } from '@app/data/urls/ShortUrl.struct';

interface ShortUrlStateModel {
  loading: boolean;
  shortUrls: ShortUrl[];
  /**
   * For individual view, fetched individually with more data
   */
  currentShortUrl: ShortUrl;
  latestFailedUrls: UploadResponseObject[];
}

@State<Partial<ShortUrlStateModel>>({
  name: 'Url',
  defaults: {
    loading: false,
    shortUrls: [],
  }
})
@Injectable({
  providedIn: 'root'
})
export class ShortUrlState {

  @Selector()
  static loading(state: ShortUrlStateModel) {
    return state.loading;
  }

  @Selector()
  static shortUrls(state: ShortUrlStateModel) {
    return state.shortUrls;
  }

  @Selector()
  static currentShortUrl(state: ShortUrlStateModel) {
    return state.currentShortUrl;
  }

  @Selector()
  static latestFailedUrls(state: ShortUrlStateModel) {
    return state.latestFailedUrls;
  }

  constructor(
    private urlService: UrlService,
    private store: Store,
  ) {}

  @Action(UploadUrlCsv)
  UploadUrlCsv(
    ctx: StateContext<ShortUrlStateModel>,
    { file }: UploadUrlCsv
  ) {
    ctx.patchState({loading: true});
    return this.urlService.uploadCsv(file)
      .pipe(
        catchError(error => {
          ctx.patchState({loading: false});
          this.store.dispatch(new AddStackableNotificationError({
            title: 'Error uploading file',
          }));

          throw error;
        }),
        tap((response) => {
          const newShortUrls = response.filter( result => result.success && result.shortUrl )
            .map(result => result.shortUrl) as ShortUrl[];

          ctx.setState(patch({
            loading: false,
            shortUrls: append(newShortUrls),
          }));

          this.store.dispatch(new AddStackableNotificationSuccess({
            title: 'File uploaded successfully',
          }));

          const latestFailedUrls = response.filter( result => !result.success );
          if(latestFailedUrls.length) {
            this.store.dispatch(new SetLatestFailedUrls(latestFailedUrls));
          }
        }),
      );
  }

  @Action(GetShortUrls)
  GetShortUrls(
    ctx: StateContext<ShortUrlStateModel>,
    {}: GetShortUrls,
  ) {
    ctx.patchState({loading: true});
    return this.urlService.index()
      .pipe(
        catchError(error => {
          ctx.patchState({loading: false});
          throw error;
        }),
        tap(shortUrls => {
          ctx.setState(patch({
            shortUrls: shortUrls,
            loading: false,
          }));
        }),
      );
  }

  @Action(GetShortUrlById)
  GetShortUrlById(
    ctx: StateContext<ShortUrlStateModel>,
    { shortUrlId }: GetShortUrlById,
  ) {
    ctx.patchState({loading: true});
    return this.urlService.getById(shortUrlId)
      .pipe(
        catchError(error => {
          ctx.patchState({loading: false});
          throw error;
        }),
        tap(currentShortUrl => {
          ctx.setState(patch({
            currentShortUrl,
            loading: false,
          }));
        }),
      )
  }

  @Action(SetLatestFailedUrls)
  SetLatestFailedUrls(
    ctx: StateContext<ShortUrlStateModel>,
    { latestFailedUrls }: SetLatestFailedUrls
  ) {
    ctx.patchState({
      latestFailedUrls,
    });
  }

}
