import { Observable, throwError } from 'rxjs'
import Auth, { getAuth } from '../../auth/auth'
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorHandler } from '.'
import { catchError } from 'rxjs/operators'
import { HttpErrorResponse } from './response'

export type HttpInterceptorCondition = (request: HttpRequest<any>) => boolean
export interface HttpInterceptor {
  appliesTo?: HttpInterceptorCondition
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>>
}

export abstract class HttpRequestTransformer implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const transformedRequest = this.transform(request)

    return next.handle(transformedRequest)
  }
  abstract transform(request: HttpRequest<any>): HttpRequest<any>
}

export class AuthorizeRequestTransformer extends HttpRequestTransformer {
  auth: Auth
  constructor() {
    super()
    this.auth = getAuth()
  }

  appliesTo(request: HttpRequest<any>): boolean {
    return this.auth.isLoggedIn()
  }

  transform(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`,
      },
    })
  }
}

export class HandleHttpErrorsInterceptor implements HttpInterceptor {
  private readonly errorHandler: HttpErrorHandler
  constructor() {
    this.errorHandler = new HttpErrorHandler()
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          const errorResponse = error as HttpErrorResponse
          this.errorHandler.handle(errorResponse)
        }

        return throwError(error)
      })
    )
  }
}

export const getInterceptors = (): HttpInterceptor[] => [
  new AuthorizeRequestTransformer(),
  new HandleHttpErrorsInterceptor(),
]
