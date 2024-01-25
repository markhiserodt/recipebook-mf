import { ChangeDetectorRef, Component, OnInit, inject } from "@angular/core";
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
  private profile$ = this.userService.profile.asReadonly();
  private changeDetectorRef = inject(ChangeDetectorRef);

  get profile(): GraphProfile { return this.profile$(); }

  ngOnInit(): void {
    setTimeout(() => {
      if (!this.profile.id) {
        this.userService.initProfile();
      }
      this.changeDetectorRef.detectChanges();
    }, 500);
  }

  logout(): void {
    this.userService.logout();
  }
}