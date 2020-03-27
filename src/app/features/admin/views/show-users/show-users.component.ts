import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserRestApiService } from 'shared/api/user-rest-api.service';
import { UserDto } from 'shared/api/dtos/dto-models';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './show-users.component.html'
})
export class ShowUsersComponent implements OnInit, OnDestroy {

  userDtos: UserDto[];

  private subscriptions: Subscription = new Subscription();

  constructor(public userRestApi: UserRestApiService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
        this.userRestApi.getAllUsers().subscribe((userDtos: UserDto[]) => {
           this.userDtos = userDtos;
        })
     );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
