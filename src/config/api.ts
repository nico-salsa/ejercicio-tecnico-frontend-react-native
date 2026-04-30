import {Platform} from 'react-native';

const ANDROID_EMULATOR_HOST = 'http://10.0.2.2:3002';
const LOCAL_HOST = 'http://localhost:3002';

function resolveBaseUrl(): string {
  if (Platform.OS === 'android') {
    return ANDROID_EMULATOR_HOST;
  }

  return LOCAL_HOST;
}

export const API_CONFIG = {
  baseUrl: resolveBaseUrl(),
  productsPath: '/bp/products',
} as const;
