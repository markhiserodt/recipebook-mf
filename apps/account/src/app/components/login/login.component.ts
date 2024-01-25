/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit, inject } from "@angular/core";
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

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration) {
  }

  ngOnInit(): void {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }

    this.msalBroadcastService.msalSubject$.subscribe(eventMessage => {
      switch (eventMessage.eventType) {
        case EventType.ACQUIRE_TOKEN_SUCCESS: {
          break;
        }
        case EventType.LOGIN_SUCCESS: {
          const payload = eventMessage.payload as AuthenticationResult;
          this.authService.instance.setActiveAccount(payload.account);
          break;
        }
      }
    });
  }

}