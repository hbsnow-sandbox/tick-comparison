/**
 * EChartsの目盛り生成アルゴリズムを使用
 * echarts/lib/scale/helper.js から関数を直接import
 */

import * as echarts from "echarts";
// @ts-ignore - 型定義がないが実行時には存在する
import { intervalScaleNiceTicks } from "echarts/lib/scale/helper.js";

// echarts.number から関数をimport
const { round } = echarts.number;

/**
 * echarts/lib/scale/Interval.js (256-275行目)
 */
export function calcNiceTicks(
  extent: [number, number],
  splitNumber?: number,
  minInterval?: number,
  maxInterval?: number
) {
  splitNumber = splitNumber || 5;
  let currentExtent = extent.slice() as [number, number];
  let span = currentExtent[1] - currentExtent[0];
  if (!isFinite(span)) {
    return { interval: 0, intervalPrecision: 2, niceTickExtent: currentExtent };
  }
  // User may set axis min 0 and data are all negative
  // FIXME If it needs to reverse ?
  if (span < 0) {
    span = -span;
    currentExtent.reverse();
    // this._innerSetExtent(extent[0], extent[1]);
    // extent = this._extent.slice() as [number, number];
  }

  const result = intervalScaleNiceTicks(
    currentExtent,
    span,
    splitNumber,
    minInterval,
    maxInterval
  );

  return {
    intervalPrecision: result.intervalPrecision,
    interval: result.interval,
    niceTickExtent: result.niceTickExtent,
  };
}

/**
 * EChartsの目盛り生成
 * echarts/src/scale/Interval.ts の getTicks メソッド (93-197行目) を参考に実装
 * calcNiceExtent メソッド (276-317行目) の extent 拡張処理を含む
 * ただし、breakTicks機能は省略
 */
export function generateEchartsTicks(
  min: number,
  max: number,
  desiredCount: number
) {
  let extent: [number, number] = [min, max];

  if (extent[1] - extent[0] === 0) {
    return [min];
  }

  // calcNiceTicks を実行
  const result = calcNiceTicks(extent, desiredCount);
  const interval = result.interval;
  const intervalPrecision = result.intervalPrecision;

  // calcNiceExtent の extent 拡張処理 (Interval.ts:310-314)
  // if (!opt.fixMin)
  extent[0] = round(
    Math.floor(extent[0] / interval) * interval,
    intervalPrecision
  ) as number;
  // if (!opt.fixMax)
  extent[1] = round(
    Math.ceil(extent[1] / interval) * interval,
    intervalPrecision
  ) as number;

  // getTicks の実装 (Interval.ts:93-197)
  const ticks: number[] = [];

  // If interval is 0, return [];
  if (!interval) {
    return ticks;
  }

  // Consider this case: using dataZoom toolbox, zoom and zoom.
  const safeLimit = 10000;

  // getTicks L117-125: extent[0] < niceTickExtent[0]の場合の処理は省略（opt.expandToNicedExtentがないため）

  // getTicks L135-161: メインループ
  // extent を使用（calcNiceExtent で拡張済み）
  let tick = extent[0];
  while (tick <= extent[1]) {
    ticks.push(tick);

    // Avoid rounding error (Interval.ts:147)
    tick = round(tick + interval, intervalPrecision) as number;

    if (ticks.length > 0 && tick === ticks[ticks.length - 1]) {
      // Consider out of safe float point, e.g.,
      // -3711126.9907707 + 2e-10 === -3711126.9907707
      break;
    }
    if (ticks.length > safeLimit) {
      return [];
    }
  }

  // getTicks L164-176: extent[1] > lastNiceTickの場合の処理は省略（opt.expandToNicedExtentがないため）

  return ticks;
}
