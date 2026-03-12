import { createSuccessResponse, createOptionsResponse } from '../utils.js';

const speechStyles = [
  '正式', '随意', '幽默', '严肃', '温柔', '强硬', '礼貌', '直接',
  '委婉', '热情', '冷淡', '亲切', '疏离', '活泼', '沉稳',
  '夸张', '低调', '文雅', '粗犷', '细腻', '简洁', '啰嗦',
  '深沉', '轻快', '神秘'
];

export async function onRequestGet(context) {
  return createSuccessResponse({
    speech_styles: speechStyles
  });
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
