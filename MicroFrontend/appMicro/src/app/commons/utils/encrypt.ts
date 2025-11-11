import { Capacitor } from '@capacitor/core';
import { DeviceInfo } from '@capacitor/device';
import { reverseString } from '@commons/helpers/text.helpers';
import * as CryptoJS from 'crypto-js';
import { JSEncrypt } from 'jsencrypt';

export const encryptRSA = (plainText: string, publicKey: string): string => {
  const encrypt = new JSEncrypt({});
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(plainText).toString();
};

export const decryptRSA = (plainText: string, privateKey: string): string => {
  const jsEncrypt = new JSEncrypt({});
  jsEncrypt.setPrivateKey(privateKey);
  return jsEncrypt.decrypt(plainText).toString();
};

export const base64Encrypt = (rawStr: string) => {
  const wordArray = CryptoJS.enc.Utf8.parse(rawStr);
  return CryptoJS.enc.Base64.stringify(wordArray);
};

export const base64Decrypt = (base64: string) => {
  const parsedWordArray = CryptoJS.enc.Base64.parse(base64);
  return parsedWordArray.toString(CryptoJS.enc.Utf8);
};

export const encryptAES = (plainText: string, key: string) => {
  const encrypted = CryptoJS.AES.encrypt(
    plainText,
    CryptoJS.enc.Utf8.parse(key),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }
  );
  return encrypted.toString();
};

export const decryptAES = (plainText: string, key: string) => {
  const decrypted = CryptoJS.AES.decrypt(
    plainText,
    CryptoJS.enc.Utf8.parse(key),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const buildKonyId = (
  { operatingSystem, model }: DeviceInfo,
  documentType: string,
  documentNumber: string,
  appVersion: string,
  appName: string
) => {
  const reverseDocumentNumber = reverseString(documentNumber);
  const txt =
    Capacitor.getPlatform().toUpperCase() === 'IOS'
      ? `${operatingSystem}:${appVersion}:${documentType}:${documentNumber}:${appName}:${reverseDocumentNumber}`
      : `${operatingSystem}:${appVersion}:${documentType}:${documentNumber}:${appName}:${model}:${model}:${reverseDocumentNumber}`;

  return CryptoJS.SHA512(txt.toLocaleLowerCase()).toString();
};
