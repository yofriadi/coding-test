import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

export function LineGraph({
  data
}: {
  data: Array<{
    createdAt: string;
    value: number;
  }>;
}) {
  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Line Chart - Temperature Monitor</CardTitle>
          <CardDescription>
            Live temperature readings updated every 5 second
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={{
            temperature: {
              label: 'Temperature (°C)',
              color: 'hsl(var(--chart-1))'
            }
          }}
          className="aspect-auto h-[280px] w-full"
        >
          <LineChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="createdAt"
              label={{
                value: 'createdAt',
                position: 'insideBottom',
                offset: -10
              }}
            />
            <YAxis
              label={{
                value: 'Temperature (°C)',
                angle: -90,
                position: 'insideLeft'
              }}
              domain={[15, 35]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-temperature)"
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
