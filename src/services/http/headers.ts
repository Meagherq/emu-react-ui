export type HttpHeaderValue = string
export type HttpHeadersInit = HttpHeaders | Record<string, string>

export function formatHeaderValue(value: HttpHeaderValue): string {
  return value
}

export class HttpHeaders extends Headers {
  constructor(init: HttpHeadersInit = {}) {
    super(init)
  }
}