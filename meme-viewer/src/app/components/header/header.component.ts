import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LocalStorage } from 'ngx-store';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';

type LangAbbreviation = 'de' | 'en';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() filterToggle = new EventEmitter<void>();

  @LocalStorage() selectedLang: LangAbbreviation = 'de';

  readonly langs: LangAbbreviation[] = ['de', 'en'];

  constructor(
    private readonly dialog: MatDialog,
    private readonly translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.translateService.setDefaultLang('de');
    this.translateService.use(this.selectedLang);
  }

  setLang(lang: LangAbbreviation): void {
    this.translateService.use(this.selectedLang = lang);
  }

  openHelp(): void {
    this.dialog.open(HelpDialogComponent, {
      minWidth: '50%'
    });
  }
}
