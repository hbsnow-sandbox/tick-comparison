import * as d3 from "d3";

/**
 * D3の目盛り生成アルゴリズムを使用（スケール経由）
 */
export function generateD3Ticks(
  min: number,
  max: number,
  desiredCount: number
) {
  // D3のスケールを作成し、.ticks()で目盛りを生成
  const scale = d3.scaleLinear().domain([min, max]);
  const generatedTicks = scale.ticks(desiredCount);

  return generatedTicks;
}

/**
 * D3の目盛り生成アルゴリズムを使用（nice()で範囲を拡張）
 * nice()を使うと、範囲をきれいな値に拡張してから目盛りを生成する
 */
export function generateD3TicksWithNice(
  min: number,
  max: number,
  desiredCount: number
) {
  // D3のスケールを作成し、nice()で範囲を拡張してから.ticks()で目盛りを生成
  const scale = d3.scaleLinear().domain([min, max]).nice(desiredCount);
  const generatedTicks = scale.ticks(desiredCount);

  return generatedTicks;
}
