
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { generateAlerts } from "@/lib/mockData";
import { Bell } from "lucide-react";

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState(generateAlerts());
  
  const markAsResolved = (alertId: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800 hover:bg-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "low": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "info": return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "congestion": return "🚦";
      case "anomaly": return "⚠️";
      case "system": return "🔧";
      case "maintenance": return "🔨";
      default: return "ℹ️";
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Alerts & Notifications</CardTitle>
            <CardDescription>System alerts and important messages</CardDescription>
          </div>
          <Bell className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[450px] pr-4">
          {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <Bell className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No alerts at this time</p>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg ${
                    alert.resolved ? "bg-gray-50" : getSeverityColor(alert.severity)
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <span className="mr-2 text-lg">{getTypeIcon(alert.type)}</span>
                      <div>
                        <h4 className="font-medium">{alert.junctionName}</h4>
                        <span className="text-xs">
                          {new Date(alert.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Badge variant={alert.resolved ? "outline" : "secondary"}>
                      {alert.resolved ? "Resolved" : alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm mb-3">{alert.message}</p>
                  {!alert.resolved && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => markAsResolved(alert.id)}
                    >
                      Mark as resolved
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
