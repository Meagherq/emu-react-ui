import { HttpHeaders, DataType, HeaderName, MediaType, HttpMethod } from '.'

/**
 * Safely assert whether the given value is an ArrayBuffer.
 *
 * In some execution environments ArrayBuffer is not defined.
 */
export function isArrayBuffer(value: any): value is ArrayBuffer {
  return typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer
}

/**
 * Safely assert whether the given value is a Blob.
 *
 * In some execution environments Blob is not defined.
 */
export function isBlob(value: any): value is Blob {
  return typeof Blob !== 'undefined' && value instanceof Blob
}

/**
 * Safely assert whether the given value is a FormData instance.
 *
 * In some execution environments FormData is not defined.
 */
export function isFormData(value: any): value is FormData {
  return typeof FormData !== 'undefined' && value instanceof FormData
}

/**
 * Determines whether the HttpMethod would likely have a body
 * @param method http method
 */
export function mightHaveBody(method: string | HttpMethod): boolean {
  const methodsWithBody = [HttpMethod.Post, HttpMethod.Put, HttpMethod.Patch]
  const typedMethod = method.toUpperCase() as HttpMethod

  return methodsWithBody.includes(typedMethod)
}

/**
 * return value if not `undefined`, otherwise return defaultValue
 * @param value 
 * @param defaultValue 
 */
export function valueIfDefined<T>(value: T, defaultValue: T): T {
  return value !== undefined ? value : defaultValue
}

/**
 * Get the dataType (reponseType) based on the given mediaType(Content-Type)
 * @param mediaType 
 */
export function getDataTypeFromMediaType(
  mediaType: MediaType | string
): DataType {
  switch (mediaType) {
    case MediaType.Json:
      return DataType.Json
    case MediaType.Text:
      return DataType.Text
    default:
      return DataType.Json
  }
}

/**
 * Get the dataType (reponseType) based on http headers
 * @param headers
 */
export function getDataTypeFromHeaders(headers: HttpHeaders): DataType {
  let dataType: DataType = DataType.Json
  const contentType = headers.get(HeaderName.ContentType)

  if (contentType && contentType.length) {
    const mediaType = contentType.split(';')[0].trim()
    dataType = getDataTypeFromMediaType(mediaType)
  }
  return dataType
}
