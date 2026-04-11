import { createSuccessResponse, createOptionsResponse, getLanguage } from '../utils.js';
import { getConfig } from '../../_shared/i18n-config.js';

export async function onRequestGet(context) {
  const lang = getLanguage(context);
  const data = getConfig('personality', lang);
  return createSuccessResponse({
    personality: data
  });
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
