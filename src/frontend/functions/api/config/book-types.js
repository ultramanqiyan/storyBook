import { createSuccessResponse, createOptionsResponse, getLanguage } from '../utils.js';
import { getConfig } from '../../_shared/i18n-config.js';

export async function onRequestGet(context) {
  const lang = getLanguage(context);
  const data = getConfig('bookTypes', lang);
  return createSuccessResponse(data);
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
