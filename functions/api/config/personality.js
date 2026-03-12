import { createSuccessResponse, createOptionsResponse } from '../utils.js';

const personality = [
  '勇敢', '善良', '聪明', '幽默', '冷静', '热情', '内向', '外向',
  '细心', '果断', '温柔', '坚强', '机智', '诚实', '忠诚',
  '乐观', '悲观', '独立', '依赖', '好奇', '谨慎', '大胆',
  '害羞', '自信', '谦虚'
];

export async function onRequestGet(context) {
  return createSuccessResponse({
    personality: personality
  });
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
