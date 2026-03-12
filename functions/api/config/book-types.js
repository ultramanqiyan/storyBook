import { createSuccessResponse, createOptionsResponse } from '../utils.js';

const bookTypes = {
  types: [
    { type: 'adventure', name: '儿童冒险', theme: 'adventure' },
    { type: 'fantasy', name: '魔幻传说', theme: 'fantasy' },
    { type: 'romance', name: '都市言情', theme: 'romance' },
    { type: 'business', name: '职场风云', theme: 'business' }
  ]
};

export async function onRequestGet(context) {
  return createSuccessResponse(bookTypes);
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
