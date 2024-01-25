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

  readonly profile$ = signal<GraphProfile>({});
  private get profile(): GraphProfile { return this.profile$(); }

  readonly account$ = signal<AccountInfo | null>(null);
  private get account(): AccountInfo | null { return this.account$(); }

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration) {
    this.msalBroadcastService.inProgress$.pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None))
      .subscribe(() => {
        this.account$.set(this.authService.instance.getActiveAccount());
    });

    this.msalBroadcastService.msalSubject$.pipe(
      filter((message: EventMessage) => message.eventType === EventType.ACQUIRE_TOKEN_SUCCESS || message.eventType === EventType.LOGIN_SUCCESS))
      .subscribe((message: EventMessage) => {
        if (!this.account)
        this.authService.instance.setActiveAccount((message.payload as AuthenticationResult).account);
        this.account$.set((message.payload as AuthenticationResult).account);
        console.log(this.account);
        console.log(this.authService.instance.getActiveAccount())
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
    if (!this.profile.id) {
      this.http.get<GraphProfile>('https://graph.microsoft.com/v1.0/me').subscribe((profile: GraphProfile) => {
        this.profile$.set(profile);
      });
    }
  }

}