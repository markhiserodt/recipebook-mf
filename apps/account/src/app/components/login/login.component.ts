import { ChangeDetectorRef, Component, OnInit, inject } from "@angular/core";
import { GraphProfile, UserService } from "@recipebook-mf/services";

@Component({
  selector: 'account-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
}) 
export class LoginComponent implements OnInit {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private userService = inject(UserService);

  private profile$ = this.userService.profile.asReadonly();
  get profile(): GraphProfile { return this.profile$(); }
  
  ngOnInit(): void {
    setTimeout(() => {
      this.changeDetectorRef.detectChanges();
    }, 1000)
  }

  login(): void {
    this.userService.login();
  }

}