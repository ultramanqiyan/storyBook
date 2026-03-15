import { createSuccessResponse, createErrorResponse, createOptionsResponse, getLanguage } from '../utils.js';
import { getConfig } from '../../_shared/i18n-config.js';

export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const bookType = url.searchParams.get('book_type');
  const subType = url.searchParams.get('sub_type');
  const lang = getLanguage(context);
  const plotOptions = getConfig('plotOptions', lang);

  if (bookType) {
    const options = plotOptions[bookType];
    if (!options) {
      return createErrorResponse('Invalid book type');
    }
    
    if (subType) {
      const subOptions = options[subType];
      if (!subOptions) {
        return createErrorResponse('Invalid plot sub type');
      }
      return createSuccessResponse({
        book_type: bookType,
        sub_type: subType,
        options: subOptions
      });
    }
    
    return createSuccessResponse({
      book_type: bookType,
      plot_options: options
    });
  }
  
  return createSuccessResponse(plotOptions);
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
