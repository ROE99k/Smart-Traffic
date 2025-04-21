
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateHistoricalData, junctionData } from "@/lib/mockData";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const TrafficAnalysis = () => {
  const [selectedJunction, setSelectedJunction] = useState("1");

  // Get last 24 hours data
  const trafficData = generateHistoricalData(parseInt(selectedJunction)).slice(-24);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Traffic Analysis</CardTitle>
            <CardDescription>24-hour traffic pattern</CardDescription>
          </div>
          <Select value={selectedJunction} onValueChange={setSelectedJunction}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select junction" />
            </SelectTrigger>
            <SelectContent>
              {junctionData.map((junction) => (
                <SelectItem key={junction.id} value={junction.id.toString()}>
                  {junction.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trafficData}
              margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="hour"
                tickFormatter={(hour) => `${hour}:00`}
                label={{ value: 'Time (24-hour format)', position: 'bottom', offset: 0 }}
              />
              <YAxis
                label={{ 
                  value: 'Vehicle Count', 
                  angle: -90, 
                  position: 'insideLeft',
                  offset: 10
                }}
              />
              <Tooltip
                formatter={(value: number) => [`${value} vehicles`, 'Traffic']}
                labelFormatter={(hour) => `Time: ${hour}:00`}
              />
              <Line
                type="monotone"
                dataKey="vehicleCount"
                stroke="#9b87f5"
                strokeWidth={2}
                dot={{ fill: '#9b87f5' }}
                name="Traffic"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold">Traffic Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="font-medium">Peak Traffic Hours</p>
              <p className="text-sm text-muted-foreground">Morning: 8:00 - 10:00</p>
              <p className="text-sm text-muted-foreground">Evening: 17:00 - 19:00</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="font-medium">Average Vehicle Count</p>
              <p className="text-sm text-muted-foreground">
                {Math.round(trafficData.reduce((acc, curr) => acc + curr.vehicleCount, 0) / trafficData.length)} vehicles per hour
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficAnalysis;
