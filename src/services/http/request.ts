import {
  HttpParams,
  HttpHeaders,
  HttpMethod,
  MediaType,
  mightHaveBody,
  valueIfDefined,
  HttpHeaderValue,
  formatHeaderValue,
} from '.'

import { HttpParamValue } from './params'

export type HttpObserve = 'response' | 'body'

export interface HttpRequestInit {
  headers?: HttpHeaders | Record<string, HttpHeaderValue>
  params?: HttpParams | Record<string, HttpParamValue>
  responseType?: MediaType
}

export interface HttpRequestCloneOptions extends HttpRequestInit {
  body?: any | null
  url?: string
  method?: string
  setHeaders?: Record<string, HttpHeaderValue>
  setParams?: Record<string, HttpParamValue>
}

export class HttpRequest<T> {
  readonly method: string
  readonly params: HttpParams
  readonly url: string
  readonly urlWithParams: string
  readonly headers: HttpHeaders
  readonly responseType: MediaType

  private _body: T | null = null

  get hasBody(): boolean {
    return !!this._body
  }

  get body(): T | null {
    return this._body
  }

  constructor(
    url: string,
    method: string | HttpMethod = HttpMethod.Get,
    bodyOrOptions?: HttpRequestInit | T,
    options?: HttpRequestInit
  ) {
    this.method = method.toUpperCase()
    this.url = url
    let init: HttpRequestInit = {}

    if (mightHaveBody(this.method) || !!options) {
      this._body = bodyOrOptions !== undefined ? (bodyOrOptions as T) : null
      init = options || {}
    } else {
      init = (bodyOrOptions as HttpRequestInit) || options
    }

    this.headers = new HttpHeaders(init.headers || {})

    this.params = HttpParams.from(init.params)

    this.responseType = init.responseType || MediaType.Json

    const paramString = this.params.toString()
    if (paramString.length === 0) {
      this.urlWithParams = url
    } else {
      // Does the URL already have query parameters? Look for '?'.
      const qIdx = url.indexOf('?')
      // There are 3 cases to handle:
      // 1) No existing parameters -> append '?' followed by params.
      // 2) '?' exists and is followed by existing query string ->
      //    append '&' followed by params.
      // 3) '?' exists at the end of the url -> append params directly.
      // This basically amounts to determining the character, if any, with
      // which to join the URL and parameters.
      const sep: string = qIdx === -1 ? '?' : qIdx < url.length - 1 ? '&' : ''
      this.urlWithParams = url + sep + paramString
    }
  }

  addBody(body: T): HttpRequest<T> {
    this._body = body

    return this
  }

  setHeader(name: string, value: HttpHeaderValue): void {
    this.headers.set(name, formatHeaderValue(value))
  }

  setParam(name: string, value: HttpParamValue): void {
    this.params.set(name, value.toString())
  }

  clone(update: HttpRequestCloneOptions = {}): HttpRequest<any> {
    // For method, url, and responseType, take the current value unless
    // it is overridden in the update hash.
    const method = update.method || this.method
    const url = update.url || this.url
    const responseType = update.responseType || this.responseType

    // The body is somewhat special - a `null` value in update.body means
    // whatever current body is present is being overridden with an empty
    // body, whereas an `undefined` value in update.body implies no
    // override.
    const body = valueIfDefined(update.body, this.body)
    const headers = update.headers
      ? new HttpHeaders(update.headers)
      : this.headers
    let params = HttpParams.from(update.params || this.params)

    // Check whether the caller has asked to add headers.
    if (update.setHeaders) {
      // Set every requested header.
      Object.keys(update.setHeaders).forEach((name) => {
        headers.set(
          name,
          formatHeaderValue(update.setHeaders ? update.setHeaders[name] : '')
        )
      })
    }

    // Check whether the caller has asked to set params.
    if (update.setParams) {
      params = Object.keys(update.setParams).reduce(
        (params, param) =>
          params.set(
            param,
            (update.setParams && update.setParams[param]) || ''
          ),
        params
      )
    }

    // Finally, construct the new HttpRequest using the pieces from above.
    return new HttpRequest(url, method, body, {
      params,
      headers,
      responseType,
    })
  }
}