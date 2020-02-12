import { Component, OnInit } from '@angular/core';
import { NavigationHelperService } from 'shared/helper/navigation-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  readonly title = 'angular-demo-fe';

  constructor(private navigationHelper: NavigationHelperService) {
  }

  ngOnInit(): void {
    this.navigationHelper.navigateToRoleDependentLandingPage();
  }
}
