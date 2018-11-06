import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FilterComponent } from './components/filter/filter.component';
import { MemeComponent } from './components/meme/meme.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(FilterComponent) filterComponent: FilterComponent;
  @ViewChild(MemeComponent) memeComponent: MemeComponent;

  constructor () { }

  ngOnInit(): void {

  }

  toggleFilter(): void {
    this.filterComponent.toggle();
  }

  filterSearch(query: string): void {
    this.memeComponent.onFilterSearch(query);
  }

  restoreDefault(): void {
    this.memeComponent.onRestoreDefault();
  }
}
