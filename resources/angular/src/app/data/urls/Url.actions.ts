import { UploadResponseObject } from '@app/data/urls/ShortUrl.struct';

export class UploadUrlCsv {
  static readonly type = '[Url] UploadUrlCsv';
  constructor(
    public readonly file: File,
  ){}
}

export class GetShortUrls {
  static readonly type = '[Url] GetShortUrls';
}

export class GetShortUrlById {
  static readonly type = '[Url] GetShortUrlById';
  constructor(
    public readonly shortUrlId: number,
  ) {}
}

export class SetLatestFailedUrls {
  static readonly type = '[Url] SetLatestFailedUrls';
  constructor(
    public readonly latestFailedUrls: UploadResponseObject[],
  ) {}
}
