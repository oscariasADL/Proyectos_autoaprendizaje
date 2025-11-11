import { BarcodeScannerResultWithSize } from 'scanbot-web-sdk/@types';

export function barcodeScanningResultsMapper(
  results: BarcodeScannerResultWithSize
): string {
  if (!results && results?.isEmpty()) return null;
  if (results?.barcodes?.length === 0) return null;
  const [result] = results.barcodes;

  return result?.text || null;
}
