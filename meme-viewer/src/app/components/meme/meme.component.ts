import { Component, OnInit } from '@angular/core';
import { MemeService } from 'src/app/services/meme.service';
import { ImgurImage } from 'src/app/models/imgur-image';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.scss']
})
export class MemeComponent implements OnInit {
  currentIndex;
  currentMeme: ImgurImage;
  memes: ImgurImage[];

  get isMp4(): boolean {
    return this.currentMeme.type === 'video/mp4';
  }

  constructor(
    private readonly snackbar: MatSnackBar,
    private readonly memeService: MemeService,
    private readonly translateService: TranslateService
  ) { }

  ngOnInit() {
    this.onRestoreDefault();
  }

  open(): void {
    window.open(this.currentMeme.link, '_blank');
  }

  share(): void {
    // Copy link to clipboard
    const el = document.createElement('textarea');
    el.value = this.currentMeme.link;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    // Show snackbar
    this.translateService.get(['copied_snackbar', 'help.close']).subscribe(translations => {
      const message = translations['copied_snackbar'];
      const action = translations['help.close'];
      this.snackbar.open(message, action, {
        duration: 5000,
      });
    });
  }

  next(): void {
    if (this.memes.length === 0) {
      return;
    }

    if (this.currentIndex === this.memes.length - 1) {
      this.currentMeme = this.memes[this.currentIndex = 0];
    } else {
      this.currentMeme = this.memes[++this.currentIndex];
    }
  }

  previous(): void {
    if (this.memes.length === 0) {
      return;
    }

    if (this.currentIndex !== 0) {
      this.currentMeme = this.memes[--this.currentIndex];
    }
  }

  onFilterSearch(query: string): void {
    this.memeService.$getMemesQuery(query).subscribe(memes => {
      this.memes = memes;
      if (this.memes.length > 0) {
        this.currentMeme = this.memes[0];
        this.currentIndex = 0;
      }
    });
  }

  onRestoreDefault(): void {
    this.memeService.$getMemes().subscribe(memes => {
      this.memes = memes;
      if (this.memes.length > 0) {
        this.currentMeme = this.memes[0];
        this.currentIndex = 0;
      }
    });
  }
}
