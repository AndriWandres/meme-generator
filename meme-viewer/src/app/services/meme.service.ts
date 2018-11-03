import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImgurGallery } from '../models/imgur-gallery';

@Injectable({
  providedIn: 'root'
})
export class MemeService {
  private baseUrl: string;
  private options = {
    headers: {
      Authorization: 'Client-ID 39ed71a29955f10'
    }
  };

  constructor(private readonly http: HttpClient) { }

  $getMemes(): Observable<ImgurGallery> {
    const url = 'https://api.imgur.com/3/gallery/hot/viral/day';
    return this.http.get<ImgurGallery>(this.baseUrl, this.options);
  }

  $getMemesQuery(query: string): Observable<ImgurGallery> {
    const url = `https://api.imgur.com/3/gallery/search/viral/day?q=${query}`;

    return this.http.get<ImgurGallery>(url, this.options);
  }

  $getMemesRandom(): Observable<any> {
    return this.http.get(this.baseUrl, this.options);
  }
}
