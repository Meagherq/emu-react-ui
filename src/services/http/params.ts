export type HttpParamValue = string | boolean | number | Date | string[]

export interface HttpParamsEncoder {
  encodeKey(key: string): string
  encodeValue(value: string): string

  decodeKey(key: string): string
  decodeValue(value: string): string
}

function paramParser(
  rawParams: string,
  encoder: HttpParamsEncoder
): Map<string, string[]> {
  const map = new Map<string, string[]>()
  if (rawParams.length > 0) {
    const params: string[] = rawParams.split('&')
    params.forEach((param: string) => {
      const eqIdx = param.indexOf('=')
      const [key, val]: string[] =
        eqIdx === -1
          ? [encoder.decodeKey(param), '']
          : [
              encoder.decodeKey(param.slice(0, eqIdx)),
              encoder.decodeValue(param.slice(eqIdx + 1)),
            ]
      const list = map.get(key) || []
      list.push(val)
      map.set(key, list)
    })
  }
  return map
}


export class HttpUrlEncoder implements HttpParamsEncoder {
  /**
   * Encodes a key name for a URL parameter or query-string.
   * @param key The key name.
   * @returns The encoded key name.
   */
  encodeKey = (key: string): string => this.encode(key)

  /**
   * Encodes the value of a URL parameter or query-string.
   * @param value The value.
   * @returns The encoded value.
   */
  encodeValue = (value: string): string => this.encode(value)

  /**
   * Decodes an encoded URL parameter or query-string key.
   * @param key The encoded key name.
   * @returns The decoded key name.
   */
  decodeKey = (key: string): string => this.decode(key)

  /**
   * Decodes an encoded URL parameter or query-string value.
   * @param value The encoded value.
   * @returns The decoded value.
   */
  decodeValue = (value: string): string => this.decode(value)

  private encode(value: string): string {
    return encodeURIComponent(value)
      .replace(/%40/gi, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/gi, '$')
      .replace(/%2C/gi, ',')
      .replace(/%3B/gi, ';')
      .replace(/%2B/gi, '+')
      .replace(/%3D/gi, '=')
      .replace(/%3F/gi, '?')
      .replace(/%2F/gi, '/')
  }

  private decode(value: string): string {
    return decodeURIComponent(value)
  }
}

export interface HttpParamsOptions {
  /**
   * String representation of the HTTP parameters in URL-query-string format.
   * Mutually exclusive with `fromObject`.
   */
  fromString?: string

  /** Object map of the HTTP parameters. Mutually exclusive with `fromString`. */
  fromObject?: { [param: string]: HttpParamValue | ReadonlyArray<string> }

  /** Encoding codec used to parse and serialize the parameters. */
  encoder?: HttpParamsEncoder
}

interface Update {
  param: string
  value?: string
  op: 'a' | 'd' | 's'
}

export function formatParamValue(value: HttpParamValue): string {
  return value.toString()
}

export class HttpParams {
  private map: Map<string, string[]> | null
  private encoder: HttpParamsEncoder
  private updates: Update[]|null = null
  private cloneFrom: HttpParams | null = null

  static from(init?: HttpParams | Record<string, HttpParamValue>): HttpParams {
    if (!init) {
      return new HttpParams()
    }

    if (init instanceof HttpParams) {
      return init as HttpParams
    } else {
      return new HttpParams({
        fromObject: init as Record<string, HttpParamValue>,
      })
    }
  }

  constructor(options: HttpParamsOptions = {}) {
    this.encoder = options.encoder || new HttpUrlEncoder()
    if (!!options.fromString) {
      if (!!options.fromObject) {
        throw new Error(`Cannot specify both fromString and fromObject.`)
      }
      this.map = paramParser(options.fromString, this.encoder)
    } else if (!!options.fromObject) {
      this.map = new Map<string, string[]>()
      Object.keys(options.fromObject).forEach(key => {
        const value = (options.fromObject as any)[key]
        this.map && this.map.set(key, Array.isArray(value) ? value : [value])
      })
    } else {
      this.map = null
    }
  }

  /**
   * Reports whether the body includes one or more values for a given parameter.
   * @param param The parameter name.
   * @returns True if the parameter has one or more values,
   * false if it has no value or is not present.
   */
  has(param: string): boolean {
    this.init()
    return !!this.map && this.map.has(param)
  }

  /**
   * Retrieves the first value for a parameter.
   * @param param The parameter name.
   * @returns The first value of the given parameter,
   * or `null` if the parameter is not present.
   */
  get(param: string): string|null {
    this.init()
    const res = this.map ? this.map.get(param) : undefined
    return !!res ? res[0] : null
  }

  /**
   * Retrieves all values for a  parameter.
   * @param param The parameter name.
   * @returns All values in a string array,
   * or `null` if the parameter not present.
   */
  getAll(param: string): string[]|null {
    this.init()
    return this.map ? this.map.get(param) || null : null
  }

  /**
   * Retrieves all the parameters for this body.
   * @returns The parameter names in a string array.
   */
  keys(): string[] {
    this.init()
    return Array.from(this.map ? this.map.keys() : [])
  }

  /**
   * Appends a new value to existing values for a parameter.
   * @param param The parameter name.
   * @param value The new value to add.
   * @return A new body with the appended value.
   */
  append(param: string, paramValue: HttpParamValue): HttpParams {
    const value = formatParamValue(paramValue)
    return this.clone({ param, value, op: 'a' })
  }

  /**
   * Replaces the value for a parameter.
   * @param param The parameter name.
   * @param value The new value.
   * @return A new body with the new value.
   */
  set(param: string, paramValue: HttpParamValue): HttpParams {
    const value = formatParamValue(paramValue)
    return this.clone({ param, value, op: 's' })
  }

  /**
   * Removes a given value or all values from a parameter.
   * @param param The parameter name.
   * @param value The value to remove, if provided.
   * @return A new body with the given value removed, or with all values
   * removed if no value is specified.
   */
  delete(param: string, value?: string): HttpParams {
    return this.clone({ param, value, op: 'd' })
  }

  /**
   * Serializes the body to an encoded string, where key-value pairs (separated by `=`) are
   * separated by `&`s.
   */
  toString(): string {
    this.init()
    return this.keys()
        .map((key) => {
          const eKey = this.encoder.encodeKey(key)
          // `a: ['1']` produces `'a=1'`
          // `b: []` produces `''`
          // `c: ['1', '2']` produces `'c=1&c=2'`
          return (this.getMapValue(key) || [])
            .map((value) => eKey + '=' + this.encoder.encodeValue(value))
            .join('&')
        })
        // filter out empty values because `b: []` produces `''`
        // which results in `a=1&&c=1&c=2` instead of `a=1&c=1&c=2` if we don't
        .filter((param) => param !== '')
        .join('&')
  }

  private clone(update: Update): HttpParams {
    const clone = new HttpParams({ encoder: this.encoder } as HttpParamsOptions)
    clone.cloneFrom = this.cloneFrom || this
    clone.updates = (this.updates || []).concat([update])
    return clone
  }

  private getCloneValue(key: string): string[] | undefined {
    return this.cloneFrom && this.cloneFrom.map
      ? this.getMapValue(key)
      : undefined
  }

  private getMapValue(key: string): string[] | undefined {
    return this.map ? this.map.get(key) : undefined
  }

  private init(): void {
    if (this.map === null) {
      this.map = new Map<string, string[]>()
    }
    if (this.cloneFrom !== null) {
      this.cloneFrom.init()
      this.cloneFrom
        .keys()
        .forEach(
          (key) => this.map && this.map.set(key, this.getCloneValue(key) || [])
        )
      this.updates &&
        this.updates.forEach((update) => {
          switch (update.op) {
            case 'a':
            case 's':
              const base =
                update.op === 'a' ? this.getMapValue(update.param) || [] : []
              if (update.value) {
                base.push(update.value)
                this.map && this.map.set(update.param, base)
              }
              break
            case 'd':
              if (update.value !== undefined) {
                const base = this.getMapValue(update.param) || []
                const idx = base.indexOf(update.value)
                if (idx !== -1) {
                  base.splice(idx, 1)
                }
                if (base.length > 0) {
                  this.map && this.map.set(update.param, base)
                } else {
                  this.map && this.map.delete(update.param)
                }
              } else {
                this.map && this.map.delete(update.param)
                break
              }
          }
        })
      this.cloneFrom = this.updates = null
    }
  }
}
