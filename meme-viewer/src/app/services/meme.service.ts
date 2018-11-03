import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImgurGallery, ImgurGalleryResultSet } from '../models/imgur-gallery';
import { map } from 'rxjs/operators';
import { ImgurImage } from '../models/imgur-image';
import { ImgurTagResultSet, ImgurTag } from '../models/imgur-tag';

@Injectable({
  providedIn: 'root'
})
export class MemeService {
  private baseUrl: string;
  private options = {
    headers: {
      Authorization: 'Client-ID 45de3a4dff0976f'
    }
  };

  constructor (private readonly http: HttpClient) { }

  $getMemes(): Observable<ImgurImage[]> {
    const url = 'https://api.imgur.com/3/gallery/t/memes/viral';

    return this.http.get<ImgurTagResultSet>(url, this.options).pipe(
      map(tag => tag.data.items),
      map(this.extractImages),
      map(this.shuffle)
    );
  }

  $getMemesQuery(query: string): Observable<ImgurGallery> {
    const url = `https://api.imgur.com/3/gallery/search/viral/day?q=${query}`;

    return this.http.get<ImgurGallery>(url, this.options);
  }

  $getMemesRandom(): Observable<any> {
    return this.http.get(this.baseUrl, this.options);
  }

  private extractImages(galleries: ImgurGallery[]): ImgurImage[] {
    const images: ImgurImage[] = [];
    galleries.forEach(gallery => {
      if (gallery.images && gallery.images.length === 1) {
        gallery.images.forEach(image => {
          image.title = image.title ? image.title : gallery.title;
        });
      }

      images.push(...gallery.images);
    });
    return images;
  }

  private shuffle<T>(arr: Array<T>): Array<T> {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
