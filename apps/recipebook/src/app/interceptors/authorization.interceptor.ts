/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError, throwError, finalize } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.setAuthorizationHeader(request);

    return next.handle(request).pipe(map((response: any) => {
        if (response instanceof HttpResponse) {
          this.handleResponse(response);
        }
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      }),
      finalize(() => {})
    );
  }

  private handleResponse(response: HttpResponse<any>): void {
    if (response?.body?.data) {
      console.log(response.body.data);
    }
  }

  private setAuthorizationHeader(request: HttpRequest<any>): HttpRequest<any> {
    const jwt = localStorage.getItem('1a3b16f2-3c52-4fd6-8423-6e84c4553b1d.cf36141c-ddd7-45a7-b073-111f66d0b30c-login.windows.net-accesstoken-f6b112f2-375a-41c0-b27f-aae04c58a072-f66b9a1c-1fb5-4639-822e-f61383bf4e2b-user.read profile openid email--')
    if (!jwt) {
      return request;
    }
    const json = JSON.parse(jwt);
    request =  request.clone({
      setHeaders: {
        'Authorization': `Bearer ${json.secret}`
      },
    });
    return request;
  }
}
