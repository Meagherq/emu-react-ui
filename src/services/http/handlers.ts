import { HttpRequest, HttpBackend, HttpEvent, HttpInterceptor } from '.'
import { Observable } from 'rxjs'


export abstract class HttpHandler {
  abstract handle(request: HttpRequest<any>): Observable<HttpEvent<any>>
}

export class HttpInterceptorHandler implements HttpHandler {
  constructor(
    private next: HttpHandler,
    private interceptor: HttpInterceptor
  ) {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (this.interceptor.appliesTo && !this.interceptor.appliesTo(req)) {
      return this.next.handle(req)
    } else {
      return this.interceptor.intercept(req, this.next)
    }
  }
}

/**
 * Http handler that executes interceptors before making the request via the HttpBackend
 */
export class HttpInterceptingHandler implements HttpHandler {
  private chain: HttpHandler | null = null

  constructor(
    private backend: HttpBackend,
    private interceptors: HttpInterceptor[] = []
  ) {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (this.chain === null) {
      this.chain = this.interceptors.reduceRight<HttpHandler>(
        (next, interceptor) => new HttpInterceptorHandler(next, interceptor),
        this.backend
      )
    }
    return this.chain.handle(req)
  }
}