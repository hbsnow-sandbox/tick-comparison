import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ControlPanelProps {
  min: number;
  max: number;
  tickCount: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  onTickCountChange: (value: number) => void;
}

export function ControlPanel({
  min,
  max,
  tickCount,
  onMinChange,
  onMaxChange,
  onTickCountChange,
}: ControlPanelProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>パラメータ設定</CardTitle>
        <CardDescription>
          最小値、最大値、希望目盛り数を調整して、アルゴリズムの違いを確認できます
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="min-input">最小値</Label>
            <Input
              id="min-input"
              type="number"
              value={min}
              onChange={(e) => onMinChange(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-input">最大値</Label>
            <Input
              id="max-input"
              type="number"
              value={max}
              onChange={(e) => onMaxChange(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tick-count-input">希望目盛り数</Label>
            <Input
              id="tick-count-input"
              type="number"
              min="2"
              value={tickCount}
              onChange={(e) => onTickCountChange(Number(e.target.value))}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
