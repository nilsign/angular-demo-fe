import { Component, OnInit } from '@angular/core';
import { UserRestApiService } from 'shared/api/user-rest-api.service';
import { UserDto } from 'shared/api/dtos/dto-models';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './show-users.component.html'
})
export class ShowUsersComponent implements OnInit {

  userDtos: Observable<UserDto[]>;

  constructor(public userRestApi: UserRestApiService) {
  }

  ngOnInit(): void {
    this.userDtos = this.userRestApi.getAllUsers();
  }
}
