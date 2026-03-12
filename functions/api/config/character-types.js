import { createSuccessResponse, createErrorResponse, createOptionsResponse } from '../utils.js';

const characterTypes = {
  adventure: ['探险家', '向导', '船长', '考古学家', '摄影师', '动物学家', '植物学家', '地质学家'],
  fantasy: ['魔法师', '骑士', '精灵', '矮人', '龙骑士', '巫师', '游侠', '吟游诗人'],
  romance: ['企业家', '医生', '律师', '艺术家', '作家', '设计师', '建筑师', '音乐家'],
  business: ['CEO', '经理', '创业者', '投资人', '顾问', '分析师', '工程师', '设计师']
};

export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const bookType = url.searchParams.get('book_type');

  if (bookType && characterTypes[bookType]) {
    return createSuccessResponse({
      book_type: bookType,
      character_types: characterTypes[bookType]
    });
  } else if (bookType) {
    return createErrorResponse('无效的书籍类型');
  }

  return createSuccessResponse({
    character_types: characterTypes
  });
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
