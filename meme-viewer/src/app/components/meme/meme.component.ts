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
  currentIndex = 0;
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
    this.memeService.$getMemes().subscribe(memes => {
      this.memes = memes;
      if (this.memes.length > 0) {
        this.currentMeme = this.memes[0];
      }
    });
  }

  open(): void {
    window.open(this.currentMeme.link, '_blank');
  }

  share(): void {
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
      this.snackbar.open(translations['copied_snackbar'], translations['help.close'], {
        duration: 4000,
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
}
