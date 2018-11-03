import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FilterComponent } from './components/sidenav/filter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(FilterComponent) filter: FilterComponent;

  constructor () { }

  ngOnInit(): void {

  }

  toggleFilter(): void {
    this.filter.toggle();
  }
}
