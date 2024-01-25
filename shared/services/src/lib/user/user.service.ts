import { Inject, Injectable, inject, signal } from '@angular/core';
import { GraphProfile } from '../models/graph-profile.model';
import { HttpClient } from "@angular/common/http";
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { RedirectRequest, EventType, AuthenticationResult, EventMessage, InteractionStatus, AccountInfo } from '@azure/msal-browser';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private authService = inject(MsalService);
  private msalBroadcastService = inject(MsalBroadcastService);

  readonly profile = signal<GraphProfile>({});
  readonly account = signal<AccountInfo | null>(null);

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration) {
    this.msalBroadcastService.inProgress$.pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None))
      .subscribe(() => {
        this.account.set(this.authService.instance.getActiveAccount());
    });

    this.msalBroadcastService.msalSubject$.pipe(
      filter((message: EventMessage) => message.eventType === EventType.LOGIN_SUCCESS))
      .subscribe((message: EventMessage) => {
        this.authService.instance.setActiveAccount((message.payload as AuthenticationResult).account);
        this.account.set((message.payload as AuthenticationResult).account);
    });
  }

  login(): void {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  logout(): void {
    this.authService.logoutRedirect();
  }

  initProfile(): void {
    this.http.get<GraphProfile>('https://graph.microsoft.com/v1.0/me').subscribe((profile: GraphProfile) => {
      this.profile.set(profile);
    });
  }

}