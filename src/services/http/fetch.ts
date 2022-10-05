import { from, Observable, Observer } from 'rxjs'
import {
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpEvent,
  HttpEventType,
  HttpErrorResponse,
  HttpHeaderResponse,
  HeaderName,
  MediaType,
  HttpBackend,
  HttpClient,
  HttpInterceptor,
} from '.'

interface FetchHttpContext {
  request: Request
  response?: Response
  ok: boolean
  body?: any
  bodyText?: string
  headers?: HttpHeaders
  status?: number
  statusText?: string
  url?: string
  error?: any
}

function ensureRequestHeader(
  request: HttpRequest<any>,
  name: string,
  value: string
): void {
  if (!request.headers.has(name)) {
    request.headers.set(name, value)
  }
}

function fromHttpRequestToFetch(
  request: HttpRequest<any>,
  update: RequestInit = {}
): Request {
  const req = new Request(request.urlWithParams || request.url, {
    ...update,
    body: getBodyFromRequest(request),
    method: request.method,
    headers: request.headers,
  })

  return req
}

function getBodyFromRequest(request: HttpRequest<any>) {
  if (!request.hasBody) {
    return null
  }

  if (request.body instanceof FormData) {
    request.headers.delete('content-type')
    return request.body
  }

  return JSON.stringify(request.body)
}

export function fromFetchToHttpResponse(
  response: Response,
  body?: any
): HttpResponse<any> {
  return new HttpResponse({
    body: body,
    status: response.status,
    statusText: response.statusText,
    url: response.url,
    headers: new HttpHeaders(response.headers),
  })
}

export class FetchBackend implements HttpBackend {
  handleWithoutEvents(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    const fetchRequest = fromHttpRequestToFetch(request)
    const promise = fetch(fetchRequest).then((fetchResponse: Response) =>
      fromFetchToHttpResponse(fetchResponse)
    )

    return from(promise) as Observable<HttpResponse<any>>
  }

  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    const controller = new AbortController()

    ensureRequestHeader(request, HeaderName.Accept, MediaType.Json)
    ensureRequestHeader(request, 'X-Requested-With', 'XMLHttpRequest')
    if (request.hasBody) {
      ensureRequestHeader(request, HeaderName.ContentType, MediaType.Json)
    }

    const fetchRequest = fromHttpRequestToFetch(request, {
      signal: controller.signal,
    })

    // Everything happens on Observable subscription.
    return new Observable((observer: Observer<HttpEvent<any>>) => {
      let context: FetchHttpContext = {
        request: fetchRequest,
        ok: true,
      }
      const promise = fetch(fetchRequest)
      observer.next({ type: HttpEventType.RequestSent })

      const parseResponse = (response: Response): Response => {
        context = {
          ...context,
          ok: response.ok,
          response: response,
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          headers: new HttpHeaders(response.headers),
        }

        return response
      }

      const handleHeaderResponse = (
        response: Response,
        observer: Observer<HttpEvent<any>>
      ): Response => {
        const headerResponse = new HttpHeaderResponse({
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          headers: new HttpHeaders(response.headers),
        })
        observer.next(headerResponse)

        return response
      }

      const parseResponseBody = (
        response: Response,
        observer: Observer<HttpEvent<any>>
      ): Promise<Response> => {
        return response.text().then((text: string) => {
          const contentType = response.headers.get(HeaderName.ContentType)
          context.bodyText = text

          if (contentType?.includes('application/json')) {
            try {
              context.body = text !== '' ? JSON.parse(text) : null
            } catch (error) {
              context.ok = false
              context.body = { error, body: text }
            }
          } else {
            context.body = text
          }

          return response
        })
      }

      const handleResponseBody = (
        response: Response,
        observer: Observer<HttpEvent<any>>
      ): Response => {
        if (context.ok) {
          const bodyResponse = new HttpResponse<any>(context)
          observer.next(bodyResponse)
          observer.complete()
        } else {
          const errorResponse = new HttpErrorResponse({
            ...context,
            error: context.body,
          })
          observer.error(errorResponse)
        }
        return response
      }

      promise
        .then((response: Response) => parseResponse(response))
        .then((response: Response) => handleHeaderResponse(response, observer))
        .then((response: Response) => parseResponseBody(response, observer))
        .then((response: Response) => handleResponseBody(response, observer))
        .catch((reason: any) => {
          context.ok = false
          const errorResponse = new HttpErrorResponse({
            ...context,
            error: reason,
          })
          observer.error(errorResponse)
        })

      return (): void => {
        controller.abort()
      }
    })
  }
}

export class FetchClient extends HttpClient {
  constructor(interceptors?: HttpInterceptor[]) {
    super(new FetchBackend(), interceptors)
  }
}
