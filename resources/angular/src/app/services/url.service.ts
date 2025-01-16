import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShortUrl, UploadResponseObject } from '@app/data/urls/ShortUrl.struct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  constructor(private http: HttpClient) {}

  uploadCsv(file: File): Observable<UploadResponseObject[]> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadResponseObject[]>(`/api/upload-urls-csv`, formData);
  }

  index(): Observable<ShortUrl[]> {
    return this.http.get<ShortUrl[]>(`/api/short-urls`);
  }

  getById(shortUrlId: number): Observable<ShortUrl> {
    return this.http.get<ShortUrl>(`/api/short-url/${shortUrlId}`);
  }
}
