export enum HttpHeadersName {
  CONTENT_TYPE = 'Content-Type',
  AUTHORIZATION = 'Authorization',
  X_SESSION_ID = 'X-SESSION-ID',
  X_SESSION_HASH = 'X-SESSION-HASH',
  X_DEVICE_SERIAL = 'X-DEVICE-SERIAL',
  X_CUSTOMER_IP = 'X-CUSTOMER-IP',
  DEVICE_TOKEN_COOKIE = 'device_token'
}

export enum HttpHeadersData {
  CONTENT_TYPE = 'application/json; charset=UTF-8'
}

export enum HttpMethods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE'
}

export const NEEDS_ENCRYPTION: HttpMethods[] = [
  HttpMethods.post,
  HttpMethods.put
];

export const NEEDS_DECRYPTION: HttpMethods[] = [
  HttpMethods.get,
  HttpMethods.post,
  HttpMethods.put
];
