import { ChangeDetectorRef, Component, OnInit, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GraphProfile, UserService } from "@recipebook-mf/services";

@Component({
  selector: 'account-login',
  standalone: true,
  imports: [RouterModule],
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
    }, 2000)
  }

  login(): void {
    this.userService.login();
  }

}