import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { GraphProfile, UserService } from '@recipebook-mf/services';

@Component({
  selector: 'account-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
}) 
export class ProfileComponent {
  private userService = inject(UserService);
  private profile$ = this.userService.profile.asReadonly();
  private changeDetectorRef = inject(ChangeDetectorRef);

  get profile(): GraphProfile | null { return this.profile$(); }

  constructor() {
    this.userService.initProfile();
    setTimeout(() => {
      this.changeDetectorRef.detectChanges();
    }, 600);
  }
}