import { deviceModels } from '../constants/ios-models.constants';

export function findIOSModel(deviceModel: string): string {
  const defaultModel = 'iPhone';
  for (const [model, identifiers] of Object.entries(deviceModels)) {
    if (identifiers.includes(deviceModel)) {
      return model;
    }
  }
  return defaultModel;
}
