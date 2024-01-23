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
    if (request.url.indexOf('pkc-6vz38.westus2.azure.confluent.cloud') > -1) {
      const username = 'OS3YBHNI4QT2MLWK';
      const password = 'fUtJIDBpF71udsVIE9fQlNu4XT89Oj0NLesddXDNFL2mEfOszwpKhQrCsfYeEACG';
      // const credentials = Buffer.from(`${username}:${password}`, 'base64');
      // const credentials = btoa(`${username}:${password}`);
      const credentials = `${username}:${password}`;
      request =  request.clone({
        setHeaders: {
          'Authorization': `Basic ${credentials}`
        },
      });
    }
    return request;
  }
}
