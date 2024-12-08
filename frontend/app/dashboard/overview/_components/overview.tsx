'use client';

import { useState } from 'react';

import { BarGraph } from './bar-graph';
import { LineGraph } from './line-graph';

import PageContainer from '@/components/layout/page-container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTemperature } from '@/hooks/use-temperature';

const cities = ['Jakarta', 'Singapore', 'Sydney'];

export default function OverViewPage() {
  const [city, setCity] = useState(cities[0]);
  const temperatures = useTemperature(city);

  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <Tabs value={city} onValueChange={setCity} className="space-y-4">
          <TabsList>
            {cities.map((city) => (
              <TabsTrigger key={city} value={city}>
                {city}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent
            value={city}
            className="grid grid-cols-1 gap-4 space-y-4"
          >
            <BarGraph data={temperatures} />
            <LineGraph data={temperatures} />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
