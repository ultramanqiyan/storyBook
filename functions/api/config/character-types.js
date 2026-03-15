import { createSuccessResponse, createErrorResponse, createOptionsResponse, getLanguage } from '../utils.js';
import { getConfig } from '../../_shared/i18n-config.js';

export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const bookType = url.searchParams.get('book_type');
  const lang = getLanguage(context);
  const characterTypes = getConfig('characterTypes', lang);

  if (bookType && characterTypes[bookType]) {
    return createSuccessResponse({
      book_type: bookType,
      character_types: characterTypes[bookType]
    });
  } else if (bookType) {
    return createErrorResponse('Invalid book type');
  }

  return createSuccessResponse({
    character_types: characterTypes
  });
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
