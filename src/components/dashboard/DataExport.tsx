
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { junctionData, prepareExportData } from "@/lib/mockData";

const DataExport = () => {
  const [selectedJunction, setSelectedJunction] = useState("1");
  const [selectedDays, setSelectedDays] = useState("7");
  
  const exportToCSV = () => {
    // Get data
    const data = prepareExportData(parseInt(selectedJunction), parseInt(selectedDays));
    
    // Format to CSV
    const headers = "timestamp,junction_id,vehicle_count,wait_time,status\n";
    const csvContent = data.map(row => 
      `${row.timestamp},${row.junctionId},${row.vehicleCount},${row.waitTime},${row.status}`
    ).join("\n");
    
    // Download
    const blob = new Blob([headers + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `traffic_data_junction_${selectedJunction}_${selectedDays}days.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Export</CardTitle>
        <CardDescription>Download historical traffic data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Junction</label>
              <Select
                value={selectedJunction}
                onValueChange={setSelectedJunction}
              >
                <SelectTrigger>
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
            <div>
              <label className="text-sm font-medium mb-1 block">Time Range</label>
              <Select
                value={selectedDays}
                onValueChange={setSelectedDays}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Last 24 hours</SelectItem>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="14">Last 14 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="pt-2">
            <p className="text-sm text-muted-foreground mb-4">
              Download traffic data for analysis in CSV format. The file will contain timestamp, 
              vehicle counts, wait times, and status indicators.
            </p>
            <Button onClick={exportToCSV} className="w-full">
              Export to CSV
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataExport;
