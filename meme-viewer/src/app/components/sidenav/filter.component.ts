import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';
import { SessionStorage } from 'ngx-store';

type FilterType = 'all' | 'img' | 'gif';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  @SessionStorage() filterOpen = true;
  @SessionStorage() filterType: FilterType = 'all';

  @Output() filterSearch = new EventEmitter<string>(true);
  @Output() restoreDefault = new EventEmitter<void>(true);

  readonly types: FilterType[] = ['all', 'img', 'gif'];

  filterValue: string;

  isHandset$ = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(private breakpointObserver: BreakpointObserver) {}

  toggle(): void {
    this.sidenav.toggle();
    this.filterOpen = !this.filterOpen;
  }

  close(): void {
    this.sidenav.close();
    this.filterOpen = false;
  }

  restoreDefaults(): void {
    this.filterValue = '';
    this.filterType = 'all';
    this.restoreDefault.emit();
  }

  randomFilter(): void {
    this.restoreDefault.emit();
  }

  applyFilter(): void {
    if (this.filterValue) {
      this.filterSearch.emit(this.filterValue);
    }
  }
}
