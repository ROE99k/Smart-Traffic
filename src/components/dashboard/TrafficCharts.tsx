
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, BarChart, Bar, Legend
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateHistoricalData, generateWeekComparisonData, junctionData } from "@/lib/mockData";

const TrafficCharts = () => {
  const [selectedJunction, setSelectedJunction] = useState("1");
  const [displayType, setDisplayType] = useState("daily");

  // Prepare data based on selected junction and display type
  const dailyData = generateHistoricalData(parseInt(selectedJunction)).slice(-24); // Last 24 hours
  
  // For weekly view, aggregate by day and hour
  const weeklyData = (() => {
    const data = generateHistoricalData(parseInt(selectedJunction));
    const aggregated = [];
    for (let day = 0; day < 7; day++) {
      let dayTotal = 0;
      let dayCount = 0;
      for (let hour = 0; hour < 24; hour++) {
        const idx = day * 24 + hour;
        if (idx < data.length) {
          dayTotal += data[idx].vehicleCount;
          dayCount++;
        }
      }
      aggregated.push({
        day: data[day * 24]?.day || `Day ${day+1}`,
        avgVehicles: Math.round(dayTotal / dayCount),
        totalVehicles: dayTotal
      });
    }
    return aggregated;
  })();
  
  // Prepare hourly comparison data
  const comparisonData = generateWeekComparisonData(parseInt(selectedJunction));
  
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle>Traffic Analysis</CardTitle>
            <CardDescription>Vehicle counts and patterns</CardDescription>
          </div>
          <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row gap-2">
            <Select
              value={selectedJunction}
              onValueChange={setSelectedJunction}
            >
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
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" onValueChange={setDisplayType}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Daily View</TabsTrigger>
            <TabsTrigger value="weekly">Weekly View</TabsTrigger>
            <TabsTrigger value="comparison">Week Comparison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dailyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorWait" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="hour" 
                    name="Hour" 
                    tick={{fontSize: 12}}
                    tickFormatter={(value, index) => `${index % 3 === 0 ? `${value}:00` : ''}`}
                  />
                  <YAxis yAxisId="left" name="Vehicles" />
                  <YAxis yAxisId="right" orientation="right" name="Wait Time (s)" />
                  <Tooltip 
                    formatter={(value, name) => [value, name === "vehicleCount" ? "Vehicles" : "Wait Time (s)"]}
                    labelFormatter={(label, data) => `Hour: ${data[0]?.payload.hour}:00`}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="vehicleCount" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#colorCount)" 
                    name="Vehicles"
                    yAxisId="left"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="waitTime" 
                    stroke="#82ca9d" 
                    fillOpacity={1} 
                    fill="url(#colorWait)" 
                    name="Wait Time"
                    yAxisId="right"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="weekly">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgVehicles" name="Avg Vehicles/Hour" fill="#8884d8" />
                  <Bar dataKey="totalVehicles" name="Total Vehicles" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={comparisonData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="current" 
                    stroke="#8884d8" 
                    name="Current Week" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="previous" 
                    stroke="#82ca9d" 
                    name="Previous Week" 
                    strokeDasharray="5 5" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TrafficCharts;
