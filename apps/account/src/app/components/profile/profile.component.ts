import { Component, OnInit, inject } from "@angular/core";
import { GraphProfile, UserService } from '@recipebook-mf/services';

@Component({
  selector: 'account-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
}) 
export class ProfileComponent implements OnInit {
  private userService = inject(UserService);

  private profile$ = this.userService.profile$.asReadonly();
  get profile(): GraphProfile { return this.profile$(); }

  ngOnInit(): void {
    if (!this.profile.id) {
      this.userService.initProfile();
    }
  }

  logout(): void {
    this.userService.logout();
  }
}