import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as d3 from "d3";

interface TickVisualizationProps {
  title: string;
  ticks: number[];
  color: string;
  min: number;
  max: number;
  desiredTickCount: number;
  ignoreDesiredCount?: boolean;
}

export function TickVisualization({
  title,
  ticks,
  color,
  min,
  max,
  desiredTickCount,
  ignoreDesiredCount = false,
}: TickVisualizationProps) {
  // スケール計算（SVG上での位置）
  const tickMin = Math.min(...ticks);
  const tickMax = Math.max(...ticks);
  const width = 800;
  const height = 120;
  const padding = { left: 50, right: 50, top: 40, bottom: 40 };

  // 指定された範囲を完全にカバーできているかチェック
  const isCoveringRange = tickMin <= min && tickMax >= max;

  const actualCount = ticks.length;

  // D3のスケールを使用して位置を計算
  // domainは実際に生成された目盛りの範囲を含むように拡張
  const scaleDomain: [number, number] = [
    Math.min(min, tickMin),
    Math.max(max, tickMax),
  ];
  const xScale = d3
    .scaleLinear()
    .domain(scaleDomain)
    .range([padding.left, width - padding.right]);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <div className="flex items-center gap-2">
            {!isCoveringRange && (
              <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                ⚠ 範囲カバー不足
              </span>
            )}
            {!ignoreDesiredCount && actualCount !== desiredTickCount && (
              <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                ⚠ 目盛り数エラー
              </span>
            )}
            <div className="text-sm text-muted-foreground">
              {ignoreDesiredCount ? (
                <>
                  生成: <span className="font-semibold">{actualCount}</span>
                  <span className="ml-2 text-xs">(希望数を無視)</span>
                </>
              ) : (
                <>
                  希望:{" "}
                  <span className="font-semibold">{desiredTickCount}</span> →
                  生成:{" "}
                  <span
                    className={`font-semibold ${
                      actualCount !== desiredTickCount ? "text-red-600" : ""
                    }`}
                  >
                    {actualCount}
                  </span>
                  {actualCount !== desiredTickCount && (
                    <span className="ml-1 text-red-600">
                      ({actualCount > desiredTickCount ? "+" : ""}
                      {actualCount - desiredTickCount})
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          {/* 軸線 */}
          <line
            x1={padding.left}
            y1={height / 2}
            x2={width - padding.right}
            y2={height / 2}
            className="stroke-foreground"
            strokeWidth="2"
          />

          {/* 数直線の端点マーカー */}
          <line
            x1={padding.left}
            y1={height / 2 - 10}
            x2={padding.left}
            y2={height / 2 + 10}
            className="stroke-foreground"
            strokeWidth="2"
          />
          <line
            x1={width - padding.right}
            y1={height / 2 - 10}
            x2={width - padding.right}
            y2={height / 2 + 10}
            className="stroke-foreground"
            strokeWidth="2"
          />
          <text
            x={padding.left}
            y={height / 2 - 20}
            textAnchor="middle"
            className={`text-xs ${
              !isCoveringRange && tickMin > min
                ? "fill-red-500 font-bold"
                : "fill-gray-500"
            }`}
          >
            min: {min}
          </text>
          <text
            x={width - padding.right}
            y={height / 2 - 20}
            textAnchor="middle"
            className={`text-xs ${
              !isCoveringRange && tickMax < max
                ? "fill-red-500 font-bold"
                : "fill-gray-500"
            }`}
          >
            max: {max}
          </text>

          {/* 目盛り */}
          {ticks.map((tick, i) => {
            const x = xScale(tick);

            return (
              <g key={`${tick}-${i}`}>
                {/* 目盛りマーク（数直線と同じ色、半分の長さ） */}
                <line
                  x1={x}
                  y1={height / 2 - 5}
                  x2={x}
                  y2={height / 2 + 5}
                  className="stroke-foreground"
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y={height / 2 + 25}
                  textAnchor="middle"
                  className="text-sm font-medium"
                  style={{ fill: color }}
                >
                  {tick}
                </text>
              </g>
            );
          })}
        </svg>

        {/* 目盛り値のリスト */}
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="text-sm font-medium mb-2">生成された目盛り値:</div>
          <div className="text-sm font-mono text-muted-foreground">
            [{ticks.join(", ")}]
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
