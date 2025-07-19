// src/utils/captcha.ts

// 返回一个区间内的随机整数
export function random(N: number, M: number): number {
  return Math.floor(Math.random() * (M - N + 1)) + N
}
