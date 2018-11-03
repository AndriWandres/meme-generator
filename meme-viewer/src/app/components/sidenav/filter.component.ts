import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';
import { SessionStorage } from 'ngx-store';

type FilterType = 'all' | 'img' | 'gif';
type SidenavMode = 'over' | 'side';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  @SessionStorage() filterOpen = true;
  @SessionStorage() filterType: FilterType = 'all';

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
    /* */
  }

  randomFilter(): void {
    /* */
  }

  applyFilter(): void {
    /* */
  }
}
