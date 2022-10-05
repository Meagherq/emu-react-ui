import { Observable, of } from 'rxjs'
import {
  HttpRequestInit,
  HttpMethod,
  HttpBody,
  HttpResponse,
  HttpHandler,
  HttpInterceptor,
  HttpBackend,
  HttpInterceptingHandler,
  HttpRequest,
  HttpEvent,
} from '.'
import { concatMap, filter } from 'rxjs/operators'
import { getInterceptors } from './interceptors'

export abstract class HttpClient {
  protected readonly backend: HttpBackend
  protected readonly handler: HttpHandler

  constructor(backend: HttpBackend, interceptors?: HttpInterceptor[]) {
    this.backend = backend
    this.handler = new HttpInterceptingHandler(
      this.backend,
      interceptors || getInterceptors()
    )
  }

  send<T>(request: HttpRequest<any>): Promise<HttpResponse<T>> {
    const events$: Observable<HttpEvent<any>> = of(request).pipe(
      concatMap((req: HttpRequest<any>) => this.handler.handle(req))
    )

    const response$: Observable<HttpResponse<any>> = events$.pipe(
      filter((event: HttpEvent<any>) => event instanceof HttpResponse)) as Observable<HttpResponse<any>>

    return response$.toPromise()
  }

  request<T>(
    method: HttpMethod | string,
    url: string,
    optionsOrBody?: HttpRequestInit | HttpBody,
    options?: HttpRequestInit
  ): Promise<HttpResponse<T>>

  request<T>(
    method: HttpMethod | string,
    url: string,
    optionsOrBody?: HttpRequestInit | HttpBody,
    options?: HttpRequestInit
  ): Promise<HttpResponse<T>> {
    const request = new HttpRequest(url, method, optionsOrBody, options)

    return this.send<T>(request)
  }

  get<T>(url: string, options?: HttpRequestInit): Promise<HttpResponse<T>> {
    return this.request<T>(HttpMethod.Get, url, options || {})
  }
  post<T>(
    url: string,
    body: HttpBody,
    options?: HttpRequestInit
  ): Promise<HttpResponse<T>> {
    return this.request<T>(HttpMethod.Post, url, body, options)
  }
  patch<T>(
    url: string,
    body: HttpBody,
    options?: HttpRequestInit
  ): Promise<HttpResponse<T>> {
    return this.request<T>(HttpMethod.Patch, url, body, options)
  }
  put<T>(
    url: string,
    body: HttpBody,
    options?: HttpRequestInit
  ): Promise<HttpResponse<T>> {
    return this.request<T>(HttpMethod.Put, url, body, options)
  }
  delete<T>(url: string, options?: HttpRequestInit): Promise<HttpResponse<T>> {
    return this.request<T>(HttpMethod.Delete, url, options || {})
  }
}

