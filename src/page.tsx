import { useState, useMemo } from "react";
import { ControlPanel } from "./components/control-panel";
import { TickVisualization } from "./components/tick-visualization";
import { generateD3Ticks } from "./lib/ticks/d3-ticks";
import { generateRechartsTicks } from "./lib/ticks/recharts-ticks";

export function Page() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [tickCount, setTickCount] = useState(5);

  const d3Result = useMemo(() => {
    return generateD3Ticks(min, max, tickCount);
  }, [min, max, tickCount]);

  const rechartsResult = useMemo(() => {
    return generateRechartsTicks(min, max, tickCount);
  }, [min, max, tickCount]);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            グラフ目盛りアルゴリズム比較
          </h1>
          <p className="text-lg text-muted-foreground">
            D3とRechartsの目盛り生成アルゴリズムを視覚的に比較
          </p>
        </header>

        <ControlPanel
          min={min}
          max={max}
          tickCount={tickCount}
          onMinChange={setMin}
          onMaxChange={setMax}
          onTickCountChange={setTickCount}
        />

        <div className="space-y-6">
          <TickVisualization
            title="D3 (scale.ticks)"
            min={min}
            max={max}
            ticks={d3Result}
            color="hsl(var(--chart-1))"
            desiredTickCount={tickCount}
          />

          <TickVisualization
            title="Recharts (getNiceTickValues)"
            min={min}
            max={max}
            ticks={rechartsResult}
            color="hsl(var(--chart-2))"
            desiredTickCount={tickCount}
          />
        </div>
      </div>
    </div>
  );
}
