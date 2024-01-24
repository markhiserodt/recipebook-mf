/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, DestroyRef, Inject, OnInit, inject } from "@angular/core";
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalModule, MsalService } from "@azure/msal-angular";
import { AuthenticationResult, EventType, RedirectRequest } from "@azure/msal-browser";

@Component({
  selector: 'account-login',
  standalone: true,
  imports: [MsalModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
}) 
export class LoginComponent implements OnInit {

  private authService = inject(MsalService);
  private msalBroadcastService = inject(MsalBroadcastService);
  private destroyRef = inject(DestroyRef);
  
  email: string = '';
  password: string = '';

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration) {
  }

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$.subscribe(eventMessage => {
      switch (eventMessage.eventType) {
        case EventType.ACQUIRE_TOKEN_SUCCESS: 
          console.log('token acquired', (eventMessage.payload as any).expiresOn)
          localStorage.setItem('tokenExpiration', (eventMessage.payload as any).expiresOn)
          break;
        case EventType.LOGIN_SUCCESS: {
          console.log('login succcess', eventMessage.payload);
          const payload = eventMessage.payload as AuthenticationResult;
          this.authService.instance.setActiveAccount(payload.account);
          break;
        }
      }
    });
  }

  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }
}