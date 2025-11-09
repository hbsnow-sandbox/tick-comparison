// @ts-ignore - Recharts内部モジュールのため型定義がない
import { getNiceTickValues } from "recharts/es6/util/scale/getNiceTickValues";

/**
 * Rechartsの目盛り生成アルゴリズムを使用
 * Rechartsは独自のアルゴリズムを使用し、きりの良い数値を優先する
 * 実際のRecharts内部で使われているgetNiceTickValues関数を使用
 */
export function generateRechartsTicks(
  min: number,
  max: number,
  desiredCount: number,
  allowDecimals = true
) {
  // RechartsのgetNiceTickValues関数を使用
  const generatedTicks = getNiceTickValues(
    [min, max],
    desiredCount,
    allowDecimals
  ) as number[];

  return generatedTicks;
}
